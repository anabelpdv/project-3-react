const express = require('express');

const authRouter = express.Router();

const User = require('../models/User');

const bcrypt = require('bcryptjs');

const passport = require('passport');


authRouter.post("/api/signup", (req,res,next)=>{
  const { fullName, email, password } = req.body;

  if(fullName == '' || email == "" || password.match === null){
    res.status(401).json({ message: 'All fields need to be completed and password must container at least one number' });
    return;
  }

  User
      .findOne({ email })
      .then(foundUser=>{
        if(foundUser !== null){
          res.status(401).json({ message: 'Email already in use' });
          return
        }

        const bcryptSalt = 10;
        const salt = bcrypt.genSaltSync(bcryptSalt);
        const encryptedPassword = bcrypt.hashSync(password,salt);

        User
            .create({ fullName, email, encryptedPassword})
            .then(userDoc=>{
              req.login(userDoc,(err)=>{
                if(err){
                  res.status(401).json({ message: 'Something happend when logging in after signing up' });
                  return;
                }
                userDoc.encryptedPassword = undefined;
                res.status(200).json({ userDoc });
              })
            })
            .catch(err=>next(err))
      })
      .catch(err=>next(err))
});


authRouter.post('/api/login', (req,res,next)=>{
  passport.authenticate('local', (err, userDoc, failureDetails) => {
    if(err){
      res.status(500).json({ message:'Something went wrong with log in.' });
    }
    if(!userDoc){
      res.status(401).json(failureDetails);
    }

    req.login(userDoc,(err)=>{
      if(err){
        res.status(500).json({ message:'Something went wrong while gettin user object from DB' });
        return;
      }
      userDoc.encryptedPassword = undefined;
      res.status(200).json({ userDoc });
    })
  })(req,res,next);
});

authRouter.delete('/api/logout', (req,res,next)=>{
  req.logout();
  res.json({ userDoc: null });
})

authRouter.get('/api/checkuser', (req,res,next)=>{
  if(req.user){
    req.user.encryptedPassword = undefined;
    res.status(200).json({ userDoc: req.user })
  }else{
    res.status(401).json({ userDoc: null })
  }
});

module.exports = authRouter;