const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { verifyUser, verifyToken } = require('../authentication');
const Student = mongoose.model('Student');

// router.get('/', (req, res) => {
//     res.render('student/addOrEdit', {
//         viewTitle: 'Insert Student'
//     })
// })

// const duplicateCheck = (data) => {
//     let data
//     const students = Student.find().select(' fullName email mobile city')
//         .then((students) => {
//             res.json({ students })
//         })
//     // if(data.email===)
// }

router.post('/', verifyToken, verifyUser, async (req, res) => {
    const existingStudent = await Student.findOne({ $or: [{ email: req.body.email }, { mobile: req.body.mobile }] });
    let email = existingStudent?.email === req.body.email
    let mobile = existingStudent?.mobile === req.body.mobile
    console.log(existingStudent)
    if (!req.body._id) {
        if (email || mobile) {
            res.status(400).send({
                error: `Student with this ${mobile && email ? "mobile and email" : email ? 'email' : 'mobile'} already exists.`
            });
        } else {
            insertRecord(req, res);
        }
    }
    else {
        updateRecord(req, res);
    }
})

//insert record
function insertRecord(req, res) {
    var student = new Student()
    student.fullName = req.body.fullName;
    student.email = req.body.email;
    student.mobile = req.body.mobile;
    student.city = req.body.city;
    student.save()
        .then((docs) => {
            res.send({ docs, msg: 'Student Record added Successfully.' })
            //below for using view hbs
            // res.redirect('student/list')
        })
        .catch((error) => {
            // Handle errors here
            console.error("Error during insert: ", error);
        });
}

//update records
function updateRecord(req, res) {
    Student.findOneAndUpdate(
        { _id: req.body._id },
        req.body,
        { new: false },
    ).then((docs) => {
        res.send({ msg: 'Record updated Successfully.' })
        //below for using view hbs
        // res.redirect('student/list')
    }).catch((err) => {
        res.status(400).send({ error: err.message })
        console.log("Error during update : " + err)
    })
}


const getlists = async (req, res) => {
    try {
        const students = await Student.find().select('fullName email mobile city');
        return students;
    } catch (err) {
        res.status(400).send({ error: err.message });
        console.error("Error during data retrieve: " + err);
    }
    // return students
    // .then((students) => {
    //     // console.log(students)
    //     // res.json({ students })
    //     return students
    // })
    // .catch(err => {
    //     res.status(400).send({ error: err.message })
    //     console.error("Error during data retrive: " + err);
    // })
}
//all list
router.get('/list', verifyToken, verifyUser, async (req, res) => {

    const students = await getlists(req, res);

    if (students) res.json({ students });
    // return res.json()
    // let responce = res.json()
    // console.log("data", res.json(list))
    // console.log("CONSOLELIST", list)
    //     .then((lis) => {
    //         console.log("CONSOLE", lis)
    //         res.json({ lis })
    //     })
})

//get by id 
router.get('/:_id', verifyToken, verifyUser, (req, res) => {
    Student.findById(req.params._id,)
        .then((doc) => {
            res.json({ doc })
            //using view hbs
            // res.render('student/addOrEdit', {
            //     viewTitle: 'Update Student',
            //     student: doc
            // })
        }).catch((err) => {
            console.log("Error during data retriving by id :" + err)
        })
})


router.get('/delete/:_id', verifyToken, verifyUser, (req, res) => {
    if (req.params._id) {
        Student.findByIdAndRemove(req.params._id,)
            .then((doc) => {
                if (doc) res.json({ doc, msg: 'Record deleted successfully.' })
                else res.json({ error: 'Record Not Found' })
                //using view hbs
                // res.render('student/list', { list: docs }) 
            })
            .catch((err) => console.log("Error during deletion :" + err))
    }
    else res.status(401).json({ msg: `Id is required for deletion.` })
})

module.exports = router