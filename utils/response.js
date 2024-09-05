const ReturnWithData = (data, message = '') => {
    return {
        status: true,
        data: data,
        message: message,
    }
}

const ReturnWithoutData = (message) => {
    return {
        status: true,
        message: message,
    }
}
const ReturnfalseMessage = (message) => {
    return {
        status: false,
        message: message,
    }
}

const ReturnServerError = () => {
    return {
        status: false,
        message: 'Internal Server Error'
    }
}

module.exports = { ReturnWithData, ReturnWithoutData, ReturnServerError, ReturnfalseMessage };