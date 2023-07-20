const nodemailer = require("nodemailer")
const configServer = require("../config/configServer")

const transport = nodemailer.createTransport({
    service: "gmail",
    port:587,
    auth:{
        user: configServer.gmail_user_app,
        pass: configServer.gmail_pass_app
    }
})

exports.sendMail = async (body)=>{
    return await transport.sendMail({
        from: "COMPRA REALIZADA<fede.geretto96@gmail.com>",
        to: "fede.geretto96@gmail.com", //${body.purchaser}
        subject: "Gracias por realizar la compra",
        html:`<div>
        <h1>Tu compra ha sido completada con exito</h1>
        <p>Codigo: ${body.code} </p>
        <p>Total: ${body.amount}$ </p>
        </div>`
    })
}
