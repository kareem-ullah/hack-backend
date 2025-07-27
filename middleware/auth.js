// const jwt = require('jsonwebtoken')

// const auth = (req, res, next) => {
//   const authHeader = req.headers.authorization
//   if (!authHeader) {
//     return res.status(401).json({ message:'Not authorized'})
//   }
  
//   const token = authHeader.split(' ')[1] // "Bearer <token>"
//   if (!token) {
//     return res.status(401).json({ message:'Not authorized'})
//   }
  
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({ message:'Forbidden'})
//     }
//     req.user = user
//     next()
//   })
// }

// module.exports = auth




const jwt = require('jsonwebtoken')
const auth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message:'Not authorized'})
  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message:'Not authorized'})
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message:'Forbidden'})
    req.user = decoded
    next()
  })
}
module.exports = auth