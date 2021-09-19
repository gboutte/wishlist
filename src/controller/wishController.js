
const Response = require('../utils/Response');
const db = require('../models');

async function create(req, res) {
  db.Wish.create({
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
    price: req.body.price,
    disabled: req.body.disabled,
    order: req.body.order,
    picture: req.body.picture
  }).then((wish) => {
    Response.successData(res, wish);
  }).catch((error) => {

    Response.errorMessage(res, error);
  });
}

async function list(req, res) {

  let wishes = await db.Wish.findAll({
    order: [
      ['createdAt', 'DESC'],
      ['title', 'ASC'],
    ]
  });

  Response.successData(res, wishes);
}
async function update(req, res) {


  var updated = await db.Wish.update({
    title: req.body.title,
    link: req.body.link,
    description: req.body.description,
    price: req.body.price,
    disabled: req.body.disabled,
    order: req.body.order,
    picture: req.body.picture
  }, {
    where: {
      id: req.body.id
    }
  });
  if (updated) {

    Response.success(res, { message: 'Done !' });
  } else {
    Response.errorMessage(res);

  }
}

async function remove(req, res) {

  var deleted = await db.Wish.destroy({
    where: {
      id: req.params.id
    }
  }).catch((error) => {
    console.error(error);
  });
  if (deleted) {

    Response.success(res, { message: 'Done !' });
  } else {
    Response.errorMessage(res);

  }
}
async function listOne(req, res) {

  let wishes = await db.Wish.findByPk(req.params.id);

  Response.successData(res, wishes);
}
module.exports.create = create;
module.exports.listOne = listOne;
module.exports.list = list;
module.exports.update = update;
module.exports.remove = remove;
