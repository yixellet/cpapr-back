const router = require('express').Router();
const { login, createUser } = require('../controllers/users');
const newsRouter = require('./news');

router.post('/signin', login);
router.post('/signup', createUser);
router.use('/news', newsRouter);
router.use((err, res) => {
  res.status(404).send({ message: 'Ой, не найдено(('})
})

module.exports = router;
