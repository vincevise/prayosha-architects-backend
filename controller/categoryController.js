const fs = require('fs').promises
const fileName = '../tmp/category.json';
const categoryData = require(fileName);
const categoryPath = './tmp/category.json'

// READ
const getCategory = async(req,res) =>{
    try{
        const data = await fs.readFile(categoryPath)
        const jsonData = await JSON.parse(data)
        res.status(200).json(jsonData)
    }catch(error){
        console.error(error)
        res.status(400).json({error:error.message})
    }    
}

// CREATE
const createCategory = async(req,res) =>{
    const addData = req.body
    try{
        if(categoryData.category.find((x)=>x.name===addData.name)) return res.status(400).json({error:'data already exsist'})

        // push
        categoryData.category.push(addData)
 
        await fs.writeFile(categoryPath,JSON.stringify(categoryData))

        res.status(200).json(categoryData)
    }catch(error){
        console.error(error)
        res.status(400).json({error:error.message})
    }
}

// PATCH
const updateCategory = async(req,res) =>{
    const {id} = req.params
    const {name} = req.body
    const {category} = categoryData
    
    try{

        if(!category.find((x)=>x.name===name)) return res.status(400).json({error:'Project with this name does not exist'})

        const updateData = {
            id:Number(id),
            name:name
        }
        let newData = {category:[...category.filter((x)=>x.id != id),updateData]}

        await fs.writeFile(categoryPath,JSON.stringify(newData))

        res.status(200).json(newData)

    }catch(error){
        console.error(error.message,'update category')
        res.status(400).json({error:error.message})
    }
}

// DELETE 

const deleteCategory = async(req,res) =>{
    const {id} = req.params
    const {category} = categoryData
    
    try{
        let newData = {category:[...category.filter((x)=>x.id != id)]}

        await fs.writeFile(categoryPath,JSON.stringify(newData))

        res.status(200).json(newData)

    }catch(error){
        console.error(error.message,'delete category')
        res.status(400).json({error:error.message})
    }
}


module.exports = {getCategory,createCategory,updateCategory,deleteCategory}