const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')


// user model
const User = require('../models/User')

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})




router.post('/', 
    [
        check('email', 'Please provide a valid email').isEmail(),
        check('password', 'Please provide 6 characters long password').exists()

    ], 
    async (req,res) => {
    //test is working
    //res.send('user registered')
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    //res.send('success')
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(400).json({msg: 'Invalid Credentials'})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 36000
        } , (err, token) => {
            if(err) throw err
            res.send({token})
        })

    } catch (err) {
        console.err(err.message)
        res.status(500).send('Server Error')
    }
})

module.exports = router