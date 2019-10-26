const express = require('express');

const router = express.Router();

const Location = require('../models/Location');


const uploader = require('../configs/cloudinary-setup');
router.post("/api/locations",uploader.single('imageUrl'), (req,res,next)=>{
  console.log('#########################################This is my body: ',req.body)

  Location
          .create(req.body)
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


module.exports = router;