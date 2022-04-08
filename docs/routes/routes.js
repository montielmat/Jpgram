const {Router} = require("express");

const path = require('path');

const multer = require("multer");

const fs = require('fs-extra')

const Image = require('../models/imageSchema')

const storage = multer.diskStorage({
    destination: path.join(__dirname,'../public/uploads'),
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})

const router = Router();

router.get('/',async(req,res)=>{
    try {
         const images = await Image.find()
         res.status(200)  
        res.render('index',{images});
    } catch (error) {
       res.status(404).send({error}) 
    }
})

router.get('/upload',(req,res)=>{
res.render('upload')
})

router.post('/upload',multer({
    storage,
    limits: {fileSize: 300000},
    dest : path.join(__dirname,'public/uploads')
    }).single('image'),
async(req,res)=>{ 
    try {
        console.log(req.file)
        const image = new Image();
        image.title = req.body.title;
        image.description = req.body.description;
        image.filename = req.file.filename;
        image.size =req.file.size;
        image.path = '/uploads/'+ req.file.filename;
        image.mimetype = req.file.mimetype;
        // image.date = new Date.now()
        await image.save();
        res.status(200);     
        res.redirect('/')
    } catch (error) {
    res.status(404).send({error})
    }
}); 

router.get('/delete/:id',async(req,res)=>{
    try {
const {id} = req.params;
const image = await Image.findByIdAndRemove(id);
 await fs.unlink(path.resolve('./src/public/'+ image.path));
    res.status(200)
    res.redirect('/')
} catch (error) {
    res.status(404).send({error})
}

})

module.exports = router;