const express = require('express');
const Model = require('../model/model');
const path = require('path')
const { VIDEO_DIR } = require('../video');
const fs = require("fs");

const router = express.Router()

//Get all Movies
router.get('/getAll', async (req, res) => {
    try {
        const data = await Model.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
//Get Movies based on ID
router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.get('/getVideo/:id', async (req, res) =>{
{
    
    let range = req.headers.range;
    console.log(range);
    if(!range) range = 'bytes=0-'

    const show = await Model.findOne({_id: req.params.id});
    const videoPath = path.join(VIDEO_DIR, show.path);
    console.log(videoPath);
    const videoSize = fs.statSync(videoPath).size;
   const chunkSize = 1 * 1e6;
   const start = Number(range.replace(/\D/g, ""));
   const end = Math.min(start + chunkSize, videoSize - 1);
  
   const contentLength = end - start + 1;
  
   const headers = {
     "Content-Range": `bytes ${start}-${end}/${videoSize}`,
     "Accept-Ranges": "bytes",
     "Content-Length": contentLength,
     "Content-Type": "video/mkv",
   };
   res.writeHead(206, headers);
  
   const stream = fs.createReadStream(videoPath, { start, end });
   stream.pipe(res);
  

   
    // res.writeHead(206);
    // const videoStream = fs.createReadStream(videPath); //Open the file and read the data present in it
    // videoStream.pipe(res);
  
    
}
})


module.exports = router;