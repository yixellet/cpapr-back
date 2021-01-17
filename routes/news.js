const router = require('express').Router();
const auth = require('../middlewares/auth');
const { getNews, getNewItemById, createNewItem, editNewItem, deleteNewItem } = require('../controllers/news');

router.get('/', getNews);
router.get('/:newItemId', getNewItemById);
router.use(auth);
router.post('/', createNewItem);
router.patch('/:newItemId', editNewItem);
router.delete('/:newItemId', deleteNewItem);

module.exports = router;
