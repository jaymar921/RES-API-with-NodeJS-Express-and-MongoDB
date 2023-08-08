const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Getting all
router.get('/', async (request, response) => {
    try{
        const users = await User.find();
        response.json({users});
    }catch(err){
        response.status(500).json({message: err.message});
    }
})
// Getting one
router.get('/:id', getUserMiddleware, (request, response) => {
    response.send(response.user);
})
// Creating one
router.post('/', async (request, response) => {
    const user = new User({
        name: request.body.name,
        age: request.body.age,
        favoriteColor: request.body.favoriteColor
    })

    try{
        const newUser = await user.save();
        response.status(201).json({newUser, message:'User Created'});
    }catch(err){
        response.status(400).json({message: err.message});
    }
})
// Updating one
router.patch('/:id', getUserMiddleware, async (request, response) => {

    if(request.body.name != null){
        response.user.name = request.body.name;
    }

    if(request.body.age != null){
        response.user.age = request.body.age;
    }

    if(request.body.favoriteColor != null){
        response.user.favoriteColor = request.body.favoriteColor;
    }

    try{
        const updatedUser = await response.user.save();
        response.json({updatedUser, message:"User Updated"})
    }catch(error){
        response.status(400).json({message: error.message});
    }
})
// Deleting one
router.delete('/:id', getUserMiddleware, async (request, response) => {
    try{
        await response.user.deleteOne();
        response.json({message: 'Deleted user'})
    }catch(error){
        response.status(500).json({message: error.message})
    }
})


async function getUserMiddleware(request,response, next){
    let user;
    try{
        user = await User.findById(request.params.id);
        if(user == null)
            return response.status(404).json({message: "Cannot find user"});
    }catch(error){
        return response.status(500).json({message: error.message});
    }

    response.user = user;
    next(); // proceed to the next piece of middleware
}

module.exports = router;