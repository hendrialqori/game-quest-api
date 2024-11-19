export class ResponseError extends Error {

    /**
     * @param {number} status 
     * @param {string} message 
     */

    constructor(status, message) {
        super(message)
        this.status = status
    }
}