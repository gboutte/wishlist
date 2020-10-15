const Response = require('../utils/Response');
const authenticator = require('../lib/authenticator');
async function auth(req,res,next) {
    const token = req.header('Authorization');
    if (token && process.env.TOKEN_SECRET) {
        if (token.indexOf("Bearer ") !== -1) {
            let user = authenticator.validateToken(token.replace("Bearer ", ""));
            if(user){
                req.user = user;
                next();
            }else{
                Response.unauthorized(res);
            }

        }else{
            Response.unauthorized(res);
        }
    }else{
        Response.unauthorized(res);
    }
}

module.exports = auth;