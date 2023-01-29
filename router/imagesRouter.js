const { deleteImages, imagekitAuth, deleteOne } = require('../controller/imagesController')
const imagesRouter = require('express').Router()


imagesRouter.post('/delete-images',deleteImages)
imagesRouter.delete('/:id',deleteOne)
imagesRouter.get('/auth',imagekitAuth)

module.exports = {imagesRouter}