const express = require('express');

const router = express.Router();

const Location = require('../models/Location');


const uploader = require('../configs/cloudinary-setup');
router.post("/api/locations",uploader.array('imageUrl',6), (req,res,next)=>{

let imagesArray=[];
  req.files.forEach(image=>{
    imagesArray.push(image.secure_url)
  })


  const newLocation ={
    title: req.body.title,
    description: req.body.description,
    lat:req.body.lat,
    lng:req.body.lng,
    imageUrl:imagesArray,
  }

  Location
          .create(newLocation)
          .then(response=>{
            res.status(200).json(response);
          })
          .catch(err=>{
            next(err)
          })

});

router.get('/api/locations', (req,res,next)=>{

  Location
          .find({})
          .then(response=>{
            res.status(200).json(response);
          })
          .catch(err=>{
            next(err)
          })

});

router.delete('/api/locations/:id', (req,res,next)=>{
  Location
          .findByIdAndRemove(req.params.id)
          .then(response=>{
            res.status(200).json(response);
          })
          .catch(err=>{
            next(err)
          })

});


router.put('/api/locations/:id', uploader.array('imageUrl',6),(req,res,next)=>{
  
  let imagesArray=[];
  req.files.forEach(image=>{
    imagesArray.push(image.secure_url)
  })

  const updatedLocation ={
    title: req.body.title,
    description: req.body.description,
    lat:req.body.lat,
    lng:req.body.lng,
    imageUrl:imagesArray,
  }
 
  Location
          .findByIdAndUpdate(req.params.id,updatedLocation)
          .then(response=>{
            res.status(200).json(response);
          })
          .catch(err=>{
            next(err)
          })

});



module.exports = router;