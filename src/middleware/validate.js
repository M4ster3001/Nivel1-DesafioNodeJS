const { validate: validate } = require('uuid');

module.exports =  function Validate(request, response, next) {
    const {id} = request.params

    if(validate(id)) {
        console.log("ID válido")

        return next()
    }

    return response.status(400).json({ error: "ID inválido" })
}