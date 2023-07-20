function auth(req,res,next){
    if(req.session?.user?.email !== "adminCoder@coder.com" || !req.session?.user?.admin === "admin"){
        return res.status(401).send("Error de autenticacion")
    }
    next()
}

module.exports= {auth}