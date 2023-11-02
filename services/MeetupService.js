const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const MeetupDto = require('../dto/meetup.dto');

module.exports = class MeetupService{
    async getAllMeetups(){        
        let meetups = await prisma.meetups.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                time: true,
                address: true,
                keywords: {
                    select: {
                        word: true
                    }
                }
            }
        });
        if(!meetups.length) return 'Meetups not found';
        let meetupsDto = meetups.map((meetup)=> new MeetupDto(meetup));        
        return meetupsDto;
    }

    async getMeetupById(name){
        let meetup = await prisma.meetups.findFirst({
            where: { name },
            select: {
                id: true,
                name: true,
                description: true,
                time: true,
                address: true,
                keywords: {
                    select: {
                        word: true
                    }
                }
            }
        });
        if(!meetup) return `Meetup with id ${name} not found`;
        let meetupDto = new MeetupDto(meetup);
        return meetupDto;
    }

    async addMeetup(data){
        await prisma.meetups.create({
            data: {
                name: data.name,
                description: data.description,
                time: data.time,
                address: data.address,
                keywords: {
                    createMany: {
                        data: data.keywords
                    }
                }
            }
        });
    }

    async updateMeetup(name, data){
        let updMeetup = await prisma.meetups.update({
            where: {
                name
            },
            data: {
                name: data.name,
                description: data.description,
                time: data.time,
                address: data.address,
            }
        });
        if(data.keywords){
            await prisma.keywords.deleteMany({where:{meetupid: updMeetup.id}});
            for(let item in data.keywords){
                await prisma.keywords.create({
                    data:{
                        meetupid: updMeetup.id,
                        word: data.keywords[item].word
                    }
                })
            }
        }
    }

    async deleteMeetup(name){
        await prisma.meetups.delete({
            where:{ name }
        })
    }
}