// const User = require('../models/User')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')

// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body
//   if (!name || !email || !password) {
//     return res.status(400).json({ message:'All fields are required'})
//   }
//   try {
//     const hashed = await bcrypt.hash(password, 10)
//     const user = await User.create({ name, email, password: hashed })
//     res.json({ message:'Signup successful!', user })
//   } catch (err) {
//      console.error("Signup Error:", error); // 👈 Yahan error terminal me show hoga
//     res.status(500).json({ message:'Server Error', error: err })
//   }
// }

// exports.login = async (req, res) => {
//   const { email, password } = req.body
//   if (!email || !password) {
//     return res.status(400).json({ message:'All fields are required'})
//   }
//   try {
//     const user = await User.findOne({ email })
//     if (!user) return res.status(400).json({ message:'Invalid credentials'})
  
//     const match = await bcrypt.compare(password, user.password)
//     if (!match) return res.status(400).json({ message:'Invalid credentials'})
  
//     const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET,{ expiresIn:'1d'})
//     res.json({ message:'Login successful!', token })
//   } catch (err) {
//     res.status(500).json({ message:'Server Error', error: err })
//   }
// }




const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { name, email, password, role } = req.body
  if (!name || !email || !password) {
    return res.status(400).json({ message:'All fields are required'})
  }
  try {
    const hashed = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, password: hashed, role: role || 'user' })
    res.json({ message:'Signup successful!', user })
  } catch (err) {
    console.error("Signup Error:", err)
    res.status(500).json({ message:'Server Error', error: err })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ message:'All fields are required'})
  }
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message:'Invalid credentials'})
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(400).json({ message:'Invalid credentials'})

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.json({
      message:'Login successful!',
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      }
    })
  } catch (err) {
    res.status(500).json({ message:'Server Error', error: err })
  }
}