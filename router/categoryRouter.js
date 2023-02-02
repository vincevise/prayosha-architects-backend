const { getCategory, createCategory, updateCategory, deleteCategory } = require('../controller/categoryController')

const categoryRouter = require('express').Router()


categoryRouter.get('/',getCategory)
// categoryRouter.post('/create',createCategory)
// categoryRouter.patch('/:id',updateCategory)
// categoryRouter.delete('/:id',deleteCategory)

module.exports = {categoryRouter}