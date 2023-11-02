const MeetupService = require('../services/MeetupService');
const service = new MeetupService();

module.exports = class MeetupController {
    async getAllMeetups(request, response){
        try{
            let result = await service.getAllMeetups();
            response.end(JSON.stringify(result));
        } catch(error){
            next(error, request, response)
        }
    }

    async getMeetup(request, response){
        try{
            let result = await service.getMeetupById(request.params['name']);
            response.end(JSON.stringify(result));
        } catch(error){
            next(error, request, response)
        }
    }

    async addMeetup(request, response, next){
        try{
            await service.addMeetup(request.body);
            response.status(200).end();
        } catch(error){
            next(error, request, response)
        }
    }

    async updateMeetup(request, response){
        try{
            service.updateMeetup(request.params['name'], request.body);
            response.status(200).end();
        } catch(error){
            next(error, request, response)
        }
    }

    async deleteMeetup(request, response){
        try{
            await service.deleteMeetup(request.params['name'])
            response.status(200).end();
        } catch(error){
            next(error, request, response)
        }
    }
}