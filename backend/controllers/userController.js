const asyncHnadler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require('../utils/generateToken');


// @desc Auth user & get a token 
// @route POST /api/users/login
// @access  Public
module.exports.authUser = asyncHnadler( async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email: email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error('Invalid email/password');
    }
});


// @desc GET user profile 
// @route GET /api/users/profike
// @access Private
module.exports.getUserProfile = asyncHnadler( async(req, res) => {

    const user = await User.findById(req.user._id);
    // console.log(user)
    // console.log(user);

    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }else{
        res.status(404);
        throw new Error('User not found')
    }
});


// @desc updtate user profile 
// @route PUT /api/users/profile
// @access Private
module.exports.updateUserProfile = asyncHnadler( async(req, res) => {

    const user = await User.findById(req.user._id);
    
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: jwt.generateToken(updatedUser._id)
        })

    }else{
        res.status(404);
        throw new Error('User not found')
    }
});


// @desc Regd a new user
// @route POST /api/users
// @access  Public
module.exports.registerUser = asyncHnadler( async(req, res) => {
    const {email, password,name} = req.body;

    const userExists = await User.findOne({email: email});

    if(userExists){
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: jwt.generateToken(user._id)
        })
    }else{
        res.status(400);
        throw new Error('Invalid User data');
    }
});


// @desc GET all user
// @route GET /api/users
// @access Private/Admin
module.exports.getUsers = asyncHnadler( async(req, res) => {

    const users = await User.find({});
    res.json(users)
});


// @desc Delete a user
// @route DELETE /api/users/:id
// @access Private/Admin
module.exports.deleteUser = asyncHnadler( async(req, res) => {

    const user = await User.findById(req.params.id);

    if(user){
        await user.remove();
        res.json({messgae: "User removed"});
    }else{
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc GET user by id
// @route GET /api/users/:id
// @access Private/Admin
module.exports.getUsersById = asyncHnadler( async(req, res) => {

    const user = await User.findById(req.params.id).select('-password');
    if(user){
        res.json(user);
    }else{
        res.status(404);
        throw new Error('User not found');
        
    }
});


// @desc updtate user  
// @route PUT /api/users/:id
// @access Private/admin
module.exports.updateUser = asyncHnadler( async(req, res) => {
    const user = await User.findById(req.params.id);
    
    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = req.body.isAdmin

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })

    }else{
        res.status(404);
        throw new Error('User not found')
    }
});
