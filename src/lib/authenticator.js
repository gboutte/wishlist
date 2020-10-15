const jwt = require('jsonwebtoken');
const db = require('../models');

class Authenticator {

    static getToken(user) {
      let secret;
      let token;
      if (process.env.TOKEN_SECRET) {
        secret = process.env.TOKEN_SECRET;
  
        token = jwt.sign(
            {
              id: user.id,
            },
             secret
          );
      } else {
        token = "";
      }
      return token;
    }
  
    static async validateToken(token) {
      let user;
      user = null;
      if (process.env.TOKEN_SECRET) {
        try {
          const verified = jwt.verify(token, process.env.TOKEN_SECRET);
  
          let users = await db.User.findAll({
            where:{
              id:verified.id
            }
        });
          if(users.length > 0){
              user = users[0];
          }
          
        } catch (err) {
        }
      }
      return user;
  
    }
  }
  
module.exports = Authenticator;