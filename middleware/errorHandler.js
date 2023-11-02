const errorHandler = (error, request, response, next)=>{
    switch(error.code){
        case 'P2002': response.status(400).json('Meetup with this name already exist'); break;
        case 'P2025': response.status(400).json('Can`t delete this meetup'); break;
        default: response.status(500).json('Unexpected error'); break;
    }
}

module.exports = {errorHandler}