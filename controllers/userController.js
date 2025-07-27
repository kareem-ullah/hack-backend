// const getUsers = (req, res) => {
//   res.json([
//     { id: 1, name: "Kareem" },
//     { id: 2, name: "Ullah" },
//   ]);
// };

// module.exports = { getUsers };



exports.getUsers = async (req, res) => {
  try {
    const users = await require('../models/user').find({}, 'name email role')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err })
  }
}