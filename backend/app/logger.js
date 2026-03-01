/**
    Custom AWS Logger for Cloudwatch 
    Ensures all data are formatted as structured JSON for easy querying, prevents leaking of data
**/

const logger = {
    info: (message, context = {}) => {
        // expects message explaining what happend + extra optional data, otherwise defaults to empty object
        if (context.uuid) delete context.uuid;
        console.log(JSON.stringify({
            level: "INFO",
            timestamp: new Date().toISOString(),
            message: message,
            ...context // whatever is left just put it into the console
        })
    )
    },
    error: (message, context ={}) => {
        console.error(JSON.stringify({
            level: 'ERROR',
            timestamp: new Date().toISOString(),
            message: message,
            error_detail: error.message || error // this is your error message that was passed if no message was found
        }));
    }
}
module.exports = logger;