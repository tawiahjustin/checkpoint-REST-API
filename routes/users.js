const express = require('express')
const router = express.Router()
const User = require('../models/User')
// GET :  RETURN ALL USERS
router.get('/', (req, res) => {
  User.find({})
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err)
      res.status(500).json({ error: 'Internal server error' })
    })
})

//POST :  ADD A NEW USER TO THE DATABASE
router.post('/', (req, res) => {
  const user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  })
  user.save()
})
//PUT : EDIT A USER BY ID

router.put('/:id', async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      update,
      { new: true }
    )

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' })
    }

    return res.json(updatedUser)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ error: 'Internal server error' })
  }
})
//DELETE : REMOVE A USER BY ID
router.delete('/:id', async (req, res) => {
  await User.findByIdAndRemove(req.params.id)
})

module.exports = router
