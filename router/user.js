const router = require('express').Router();
const Users = require('../model/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: (1024 * 1024 * 3)
    }
})

//all user show

router.get('/', (req, res) => {

    Users.find().sort({ Date: -1 }).then(user => {
        if (!user) {
            return res.status(404).send('data is not SHOW')
        }
        res.json(user)
    })
});

// myuser find
router.get('/myuser/:userid', (req, res) => {

    Users.findById(req.params.userid, (err, user) => {

        if (err || !user) {
            return res.status(501).json({
                error: err,
                message: " user not found "
            })
        }
        res.json({
            message: 'success',
            user: user
        })

    })
});


// UserRegister

router.post('/register', upload.single('image'), async (req, res) => {
    let { name, email, phone, password, } = req.body

    let file = req.file
    const emailExist = await Users.findOne({ email });

    if (emailExist)
        return res.status(400).json({ message:"Email Already Exist"});

    // hashed Password        
    const hashPassword = await bcrypt.hash(password, 11);
    // create new usser
    const users = new Users({
        name,
        email,
        phone,
        password: hashPassword,
        image: req.file.path
    });


    try {
        const savedUsers = await users.save()
        res.json({
            message: "Registration Succesfull",
            data: savedUsers
        })
    } catch (error) {
        res.status(400).json({
            err: error,
            message: "Data not saved"
        })
    }

});

// User Log in

router.post('/login', async (req, res) => {

    let { email, password } = req.body

    try {

        // Check Email
        const emailExist = await Users.findOne({
            email
        });

        if (!emailExist) return res.status(400).json({message:"Email does not Exist "});

        const passExist = await bcrypt.compare(password, emailExist.password);
        if (!passExist) return res.status(400).json({ message:"Invalid Password"});

        const token = await jwt.sign({ _id: emailExist._id }, process.env.TOKEN, { expiresIn: '72h' })
        // const token = jwt.sign({ _id: emailExist._id }, process.env.TOKEN);

        const { _id } = emailExist;
        return res.json({
            data: {
                token,
                _id, 
            },
            message: "login Succesfull"
        })

    } catch (error) {
        res.status(400).json({
            err: error,
            message: " Email and Password Does Not Matched ..?? "
        });
    }
})

module.exports = router;