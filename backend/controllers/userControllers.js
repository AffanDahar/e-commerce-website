const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const genrateTokens = require("../utils/generateTokens");

// @des Auth user and get token
// @routes POST /api/users/login
// acces :  public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genrateTokens(user._id)
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @des Register user
// @routes POST /api/users
// acces :  public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password , confirmPassword } = req.body
  
    const userExists = await User.findOne({ email })
  
    if (userExists) {
      res.status(400)
      throw new Error('User already exists')
    }
  
    const user = await User.create({
      name,
      email,
      password,
      confirmPassword
    })
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: genrateTokens(user._id)
      })
    } else {
      res.status(400)
      throw new Error('Invalid user data')
    }
  })

// @des Get user profile
// @routes GET /api/users/profile
// acces :  private 
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  console.log(user);
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: genrateTokens(updatedUser._id)
    });

    
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Get user 
// @routes GET /api/users/
// @access :  private/admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users)
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// @desc    Get user by id
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})








const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  
  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });

    
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});
module.exports = { authUser, getUserProfile, registerUser , updateUserProfile , getUsers, deleteUser,  getUserById, updateUser }