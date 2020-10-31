function ReqLogs( request, responde, next ) {
    const {method, url} = request

    console.log(`[${method}] ${url}`)

    return next()
}

module.exports = ReqLogs