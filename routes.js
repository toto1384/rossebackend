const router = require('express').Router();
const jwt = require('jsonwebtoken');

const schemas = require('./models/Schemas');

//models
const User = schemas.userSchema;
//

//joi
const Joi = require('joi');
const {userValidation,actionValidation} = require('./joiValidation');
//

const verify = require('./verifyToken');



router.post('/login',async function(req,res){
    //login or register user with id and email, then give token back

    const validation = Joi.validate(req.body,userValidation);
    if(validation.error) return res.status(400).send(validation.error.toString());

    const user = await User.findOne({email: req.body.email});

    if(user){
        //login user
        if(user.id == req.body.id){
            //login and give token
            const token = jwt.sign({email: user.email},"jfbdjf12");
            res.status(200).header('token',token).send(token);
        }else{
            res.status(401).send('User registration failed. The id does not match with the email');
        }
    }else{
        //register user
        const newUser = new User({
            id: req.body.id,
            email : req.body.email,
        });

        try{
            const savedUser =await newUser.save();
            const token = jwt.sign({email: savedUser.email},"jfbdjf12");
            res.status(200).header('token',token).send(token);
        }catch(err){
            res.send(err);
        }
    }
});


//hide
router.post('/user/hide',verify,async function(req,res){
    try{
        //save to user
        const user =await User.findOne({email:req.user.email});
        if(!user)return res.status(401).send('No user found with this token. Try to login again');

        user.hide.push(req.body.id);
        User.updateOne({email: req.user.email},{hide: user.hide},function(err,doc){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send('Success');
            }
        });
        
    }catch(err){
        res.send(err);
    }
});

router.delete('/user/hide',verify,async function(req,res){
    const user =await User.findOne({email: req.user.email});
    if(!user)return res.status(401).send('No user found with this token. Try to login again');

    var index = user.hide.indexOf(req.body.id);
    if (index > -1) {
        user.hide.splice(index, 1);
    }

    User.updateOne({email: req.user.email},user,function(err,doc){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send('Success');
        }
    });
});
//



//remind
router.post('/user/remind',verify,async function(req,res){
    try{
        //save to user
        const user =await User.findOne({email:req.user.email});
        if(!user)return res.status(401).send('No user found with this token. Try to login again');

        user.remind.push(req.body.id);
        User.updateOne({email: req.user.email},{remind: user.remind},function(err,doc){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send('Success');
            }
        });
        
    }catch(err){
        res.send(err);
    }
});

router.delete('/user/remind',verify,async function(req,res){
    const user =await User.findOne({email: req.user.email});
    if(!user)return res.status(401).send('No user found with this token. Try to login again');

    var index = user.remind.indexOf(req.body.id);
    if (index > -1) {
        user.remind.splice(index, 1);
    }

    User.updateOne({email: req.user.email},user,function(err,doc){
        if(err){
            res.status(400).send(err);
        }else{
            res.status(200).send('Success');
        }
    });
});
//



//last checked
router.post('/user/:id/lc',verify,async function(req,res){
    try{
        //save to user
        const user =await User.findOne({email:req.user.email});
        if(!user)return res.status(401).send('No user found with this token. Try to login again');

        user.actions.push({
            id: req.params.id,
            lc: req.body.lc
        });

        User.updateOne({email: req.user.email},{actions: user.actions},function(err,doc){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send('Success');
            }
        });
        
    }catch(err){
        res.send(err);
    }
});

router.delete('/user/:id/lc',verify,async function(req,res){
    //delete id
    try{
        console.log(0);
        const user =await User.findOne({email: req.user.email});
        if(!user)return res.status(401).send('No user found with this token. Try to login again');

        console.log(1);
        for(var i = 0 ; i<user.lc.length ; i++){
            if(req.params.id== user.lc[i].id){
                if (index > -1) {
                    user.hide.splice(index, 1);
                }
            }
        }

        console.log("got here");

        User.updateOne({email: req.user.email},user,function(err,doc){
            console.log('here as well');
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send('Success');
            }
        });
        
    }catch(err){
        res.send(err);
    }
});
//


//interests
router.post('/user/interests',verify,async function(req,res){
    try{
        //save to user
        const user =await User.findOne({email:req.user.email});
        if(!user)return res.status(401).send('No user found with this token. Try to login again');

        User.updateOne({email: req.user.email},{interests: req.body.interests},function(err,doc){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send('Success');
            }
        });
        
    }catch(err){
        res.send(err);
    }
});
//


//difficulty
router.post('/user/difficulty',verify,async function(req,res){
    try{
        //save to user
        const user =await User.findOne({email:req.user.email});
        if(!user)return res.status(401).send('No user found with this token. Try to login again');

        User.updateOne({email: req.user.email},{difficulty: req.body.difficulty},function(err,doc){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send('Success');
            }
        });
        
    }catch(err){
        res.send(err);
    }
});
//


//effort
router.post('/user/effort',verify,async function(req,res){
    try{
        //save to user
        const user =await User.findOne({email:req.user.email});
        if(!user)return res.status(401).send('No user found with this token. Try to login again');

        User.updateOne({email: req.user.email},{effort: req.body.effort},function(err,doc){
            if(err){
                res.status(400).send(err);
            }else{
                res.status(200).send('Success');
            }
        });
        
    }catch(err){
        res.send(err);
    }
});
//


router.get('/user',verify,async function(req,res){
    //get all todos from the token's user

    const user =await User.findOne({email: req.user.email});
    if(!user)return res.status(401).send('No user found with this token. Try to login again');

    res.status(200).json(user);
});





module.exports = router;
