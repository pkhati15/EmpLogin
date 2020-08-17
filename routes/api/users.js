const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/User');
//@route POST api/users
//@desc register user
//@access Public
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // see  if user exists
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ errors: [{ msg: 'User already exists ' }] });
    }

    //encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //return jsonwebtoken
    res.send('User Registered');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
  }
});
module.exports = router;
