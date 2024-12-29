const User = require('../models/userSchema')
const { generateToken } = require('../helper/jwt')

const createUser = async (req, res) => {
    try {
        const body = req.body
        const user = new User(body)
        user.save()
        res.status(200).json({ message: "User is created", user: user })
    }
    catch (err) {
        res.status(404).json(err)
    }
}
const getUser = async (req, res) => {
    try {
        const userData = await User.find()
        res.status(200).json({ message: "User is fetch", user: userData })
    }
    catch (err) {
        res.status(404).json(err)
    }
}

const getUserByStudent = async (req, res) => {
    try {
        const userData = await User.find({userType : 'student'})
        res.status(200).json({ message: "User is fetch", user: userData })
    }
    catch (err) {
        res.status(404).json(err)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndDelete(id)
        res.status(200).json({ message: "User is deleted" })
    }
    catch (err) {
        res.status(404).json(err)
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await User.findByIdAndUpdate(id, req.body)
        user.save()
        res.status(200).json({ message: "User is Updated" })
    }
    catch (err) {
        res.status(404).json(err)
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log('Request Body:', req.body);
  
      // Find user in database
      const UserData = await User.findOne({ email, password });
      console.log('User Data:', UserData);
  
      if (!UserData) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate JWT token
      const token = await generateToken({
        id: UserData._id,
        name: UserData.name,
        email: UserData.email,
        userType: UserData.userType,
      });
      console.log('Generated Token:', token);
  
      return res.status(200).json({
        message: 'Login successful',
        data: UserData,
        token: token,
      });
    } catch (err) {
      console.error('Error in loginUser:', err);
      return res.status(500).json({ message: 'Internal server error', error: err.message });
    }
  };
  


module.exports = { createUser, getUser, deleteUser, updateUser, loginUser , getUserByStudent }



// multer This is use for image upload 