const NewItem = require('../models/newItem');

function getNews(req, res) {
  let totalCount = 0;
  NewItem.countDocuments({}, (error, count) => totalCount = count);
  NewItem.find({}).sort({date: 'desc'}).limit(parseInt(req.query.count)).skip((parseInt(req.query.page)*parseInt(req.query.count))-parseInt(req.query.count))
    .then((news) => {
      res.status(200).send({ totalCount: totalCount, results: news })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    });
}

function getNewItemById(req, res) {
  NewItem.findById(req.params.id)
    .then((newItem) => {
      res.status(200).send({ data: newItem })
    })
    .catch((error) => {
      res.status(404).send({ message: 'Новости с таким ID не существует' });
    })
}

function createNewItem(req, res) {
  const { title, content, image } = req.body;
  const date = Date.now();
  NewItem.create({ title, content, date, image})
    .then((newItem) => {
      res.status(201).send({ data: newItem })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    });
}

function editNewItem(req, res) {
  const { title, content, image} = req.body;
  NewItem.findByIdAndUpdate(req.query.id,
    { title: title, content: content, image: image },
    { new: true, runValidators: true, upset: false })
    .then((newItem) => {
      res.status(200).send({ data: newItem })
    })
    .catch(() => {
      res.status(404).send({ message: 'Новости с таким ID не существует' });
    });
}

function deleteNewItem(req, res) {
  NewItem.findByIdAndDelete(req.query.id)
    .then((newItem) => {
      res.status(200).send({ data: newItem });
    })
    .catch((error) => {
      res.send({ message: error.message });
    })
}

module.exports = { getNews, getNewItemById, createNewItem, editNewItem, deleteNewItem };
