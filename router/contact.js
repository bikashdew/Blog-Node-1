const router = require('express').Router();
const contacts = require('../model/Contact')


router.get("/", (req, res) => {

    contacts.find().sort({ Date: -1 }).then(data => {
        if (!data) {
            return res.status(404).send('data is not SHOW')
        }
        res.json(data)
    })
});

router.post("/add", (req, res) => {

    const contactdata = new contacts({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    })

    contactdata.save().then(data => {
        res.json({
            datas: data,
            message: "Data send successfull "
        })
    }).catch(err => {
        res.status(501).json({
            error: err,
            message: "can't contactdata save db"
        })

    })
})

module.exports = router;