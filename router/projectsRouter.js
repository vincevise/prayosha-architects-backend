const { creatProject, getProjects, updateProject, deleteProject, getProject, getCategoryProject } = require('../controller/projectController')

const projectRouter = require('express').Router()

projectRouter.post('/',creatProject)
projectRouter.get('/',getProjects)
projectRouter.get('/type/:id',getCategoryProject)
projectRouter.get('/:id',getProject)
projectRouter.put('/:id',updateProject)
projectRouter.delete('/:id',deleteProject)


module.exports = {projectRouter}