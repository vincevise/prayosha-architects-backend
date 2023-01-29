const ImageKit = require('imagekit')

var imagekit = new ImageKit({
    publicKey:'public_M9Jko+Xn7SVU3T6WKNxFvoc2iUk=',
    privateKey:'private_foW3ju0wy65HUb5hUoL0XDWS9hc=',
    urlEndpoint:'https://ik.imagekit.io/nycs0udgn/'
})

const deleteImages = async(req,res)=>{
    console.log(req.body)
    try {
        const response = await Promise.all(req.body.map(async(x)=>{
             return await imagekit.deleteFile(x.fileId, function(error, result) {
                if(error)  console.log(error)
                else {
                    console.log(result,'result')
                    return result
                }
            });
        }))

        console.log(response,'response')
        res.status(200).json({message:'images deleted sucessfully'})

    } catch (error) {
        console.error(error.message,'error')
        res.status(400).json({error:error.message})
    }
}

const deleteOne = async(req,res)=>{
    const {id} = req.params
    try {

        await imagekit.deleteFile(id, function(error, result) {
            if(error) return res.status(400).json(error)
            else return res.status(200).json(result)

        });

    } catch (error) {
        console.error(error.message)
        res.status(400).json({error:error.message})
    }
}

const imagekitAuth = async(req,res)=>{
    var authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).send(authenticationParameters)
}

module.exports = {
    deleteImages,imagekitAuth, deleteOne
}