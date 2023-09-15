const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('Student');

router.get('/', (req, res) => {
    res.render('student/addOrEdit', {
        viewTitle: 'Insert Student'
    })
})

router.post('/', (req, res) => {
    console.log(`Id : ${req.body._id}`)
    if (!req.body._id) {
        insertRecord(req, res)
    }
    else {
        updateRecord(req, res)
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
            res.send({ docs, msg: 'Record added Successfully.' })
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
        console.log("Error during update : " + err)
    })
}

//all list
router.get('/list', (req, res) => {
    Student.find().select(' fullName email mobile city')
        .then((docs) => {
            res.send(docs)
            //using view hbs
            // res.render('student/list', { list: docs })
        }
        )
        .catch((err) => {
            // Handle errors here
            res.status(400).send({ err: err.message })
            console.error("Error during data retrive: " + err);
        });
})

//get by id 
router.get('/:_id', (req, res) => {
    Student.findById(req.params._id,)
        .then((doc) => {
            res.render('student/addOrEdit', {
                viewTitle: 'Update Student',
                student: doc
            })
        }).catch((err) => {
            console.log("Error during data retriving by id :" + err)
        })
})


router.get('/delete/:_id', (req, res) => {
    Student.findByIdAndRemove(req.params._id,)
        .then((docs) => {
            Student.find()
                .then((docs) => res.render('student/list', { list: docs }))
                .catch((err) => {
                    // Handle errors here
                    console.error("Error during data retrive: " + err);
                });
        })
        .catch((err) => console.log("Error during deletion :" + err))
})

module.exports = router