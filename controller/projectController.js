const { categoryRouter } = require('../router/categoryRouter')
const ImageKit = require('imagekit')
const fs = require('fs').promises
// const fileName = '../tmp/projects.json'
// const projectData = require(fileName)
// const categoryData = require("../tmp/category.json");
const {category,project} = require('../db.json')

// below is the path for fs module to read
const projectPath = './tmp/projects.json'

var imagekit = new ImageKit({
    publicKey:'public_cQ7EALxI9tspHEMjb9/2ZyI+WN0=',
    privateKey:'private_ZIb5woBXbinUy+8WjWsxxT2NG1Q=',
    urlEndpoint:'https://ik.imagekit.io/vincevise/'
})


// CREATE
// const creatProject = async(req,res) => {
//     const newProject = req.body
//     try {
//         // if(projectData.project.find((x)=>x.name==newProject.name))return res.status(400).json({error:'project with this name already exists'})

//         projectData.project.push(newProject)

//         await fs.writeFile(projectPath,JSON.stringify(projectData))

//         res.status(200).json(projectData)
//     } catch (error) {
//         console.error(error.message)
//         res.status(400).json({error:error.message})
//     }
// }

// READ
const getProjects = async(req,res) =>{
    try{
        res.status(200).json(project)
    }catch(error){
        console.error(error.message,'get projects')
        res.status(400).json({error:error.message})
    }
}

const getCategoryProject = async(req,res) =>{
    const {id} = req.params
    
    try {
        if(id==='all') return res.status(200).json(project)
        const categoryProjects = category.find((x)=>x.name === id)
        if(!categoryProjects) return res.status(400).json({error:'no such category exist'})

        const data = project?.filter((x)=>x.type===id)
        res.status(200).json(data)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error:error.message})
    }
}

// GET ONE
const getProject = async(req,res) =>{
    const {id} = req.params
    try {
         const data = project.find((x)=>x.id==id)
         if(!data) return res.status(400).json({error:'no such project'})
        res.status(200).json(data)
    } catch (error) {
        console.error(error.message)
        res.status(400).json({error:error.message})
    }
}



// PUT
// const updateProject = async(req,res) =>{
//     const { id } = req.params
//     const {project} = projectData
//     const changedData = req.body
//     try {
//         if(!project.find((x)=>x.id == id ))return res.status(400).json({error:'project eith this id does not exist'})
        
//         const newData = {project:[...project.filter((x)=>x.id!=id),changedData ]}

//         await fs.writeFile(projectPath,JSON.stringify(newData))
        
//         res.status(200).json(newData)

//     } catch (error) {
//         console.error(error.message)
//         res.status(400).json({error:error.message})
//     }
// }

// DELETE
// const deleteProject = async(req,res) =>{
//     const {id} = req.params
//     const {project} = projectData
//     try {
//         if(!project.find((x)=>x.id == id ))return res.status(400).json({error:'project eith this id does not exist'})

//         const newData = {project:[...project.filter((x)=>x.id!=id)]}

//         await fs.writeFile(projectPath,JSON.stringify(newData))
        
//         res.status(200).json(newData)

//     } catch (error) {
//         console.error(error.message)
//         res.status(400).json({error:error.message})
//     }
// }

module.exports = {
    // creatProject,
    getProjects,
    // updateProject,
    // deleteProject,
    getProject,
    getCategoryProject
}