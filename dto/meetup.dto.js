module.exports = class MeetupDto{
    constructor(data){
        this.name = data.name;
        this.description = data.description;
        this.time = data.time;
        this.address = data.address;
        this.keywords = data.keywords.map(keyword => keyword.word)
    }
}