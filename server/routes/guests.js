const router = require('express').Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

// Guest Model
const Guest = require('../models/Guest')

// GET ALL GUESTS
router.get('/', auth, async (req,res) => {
    try {
        const guests = await Guest.find({user: req.user.id})
        res.json(guests)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// GET GUEST BY ID
router.get('/:id', auth, async (req,res) => {
    try {
        const guests = await Guest.findById(req.params.id)
        res.json(guests)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// CREATE GUEST
router.post('/', auth, 
    [
        check('name', 'Please provide a name.').not().isEmpty(),
        check('phone', 'Please provide a phone number.').not().isEmpty()
    ], async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({error: errors.array()})
        }
        const { name, phone, dietary, isconfirmed } = req.body
        try {
            let guest = new Guest({
                user: req.user.id,
                name,
                phone,
                dietary,
                isconfirmed
            })
            guest = await guest.save()
            res.json(guest)

        } catch (err) {
            console.error(err.message)
            res.status(500).send('Server Error')
        }
})

// DELETE GUEST
router.delete('/:id', auth, async (req, res) => {
    try {
        let guest = await Guest.findById(req.params.id)
        if(!guest) {
            return res.status(404).json({msg: 'Guest is not found.'})
        }
        await Guest.findByIdAndRemove(req.params.id)
        res.send('guest removed')

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})

// UPDATE GUEST
router.put('/:id', auth, async(req, res) => {
    const { name, phone, dietary, isconfirmed } = req.body
    const updatedGuest = { name, phone, dietary, isconfirmed }
    try {
        let guest = await Guest.findById(req.params.id)
        if(!guest) {
            return res.status(404).json({ msg: 'Guest is not found.'})
        }
        guest = await Guest.findByIdAndUpdate(req.params.id, { $set: updatedGuest }, { new: true })
        res.send(guest)

    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})


module.exports = router