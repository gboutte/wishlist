
const Response = require('../utils/Response');
const db = require('../models');
const { getMetadata } = require('page-metadata-parser');
const domino = require('domino');
var request = require('request');
fs = require('fs');


async function list(req, res) {

  let wishes = await db.Wish.findAll({
    where: {
      disabled: false
    }

  });
  // for(var i = 0;i < wishes.length;i++){
  //   try{
  //
  //       var img = await getImage(wishes[i]);
  //
  //       wishes[i].dataValues.img = img;
  //   }catch(error){
  //   }
  // }

  Response.successData(res, wishes);
}

async function image(req, res) {

  let wish = await db.Wish.findOne({
    where: {
      disabled: false,
      id: req.params.id
    }

  });

  try {

    var img = await getImage(wish);

    wish.dataValues.img = img;
  } catch (error) {
    console.error(error);
  }


  Response.successData(res, wish);
}



async function getImage(wish) {
  if (typeof wish.picture === 'undefined' || wish.picture === null) {

    var customRules = {};
    customRules.img = {};
    customRules.img.rules = [];
    customRules.img.rules.push(['meta[property="og:image"]', element => element.getAttribute('content')]);
    customRules.img.rules.push(['meta[property="og:image:secure_url"]', element => element.getAttribute('content')]);
    customRules.img.rules.push(['meta[property="twitter:image"]', element => element.getAttribute('content')]);

    var url = wish.link;

    var headers = {
      'accept-language': 'en-US,en;q=0.9,pt;q=0.8',
      'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'accept': '*/*',
      'x-requested-with': 'XMLHttpRequest'
    };


    var options = {
      url: url,
      method: 'GET',
      headers: headers,
    };


    return new Promise((resolve, reject) => {
      request(options, async (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const html = body;
          const doc = domino.createWindow(html).document;

          const metadata = getMetadata(doc, url, customRules);

          resolve(metadata.img);
        } else {
          reject('error');
        }
        // console.log(url);
      });
    });



    // fetch(url,{ mode : 'no-cors'}).then(async (response)=>{
    //   const html = await response.text();
    //   console.log(response)
    //   const doc = domino.createWindow(html).document;
    //
    //   var test = doc.querySelector('meta[property="og:image"]');
    //   console.log(test)
    //   const metadata = getMetadata(doc, url);
    //       console.log(metadata);
    // });


  }
}
module.exports.list = list;
module.exports.image = image;
