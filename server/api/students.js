'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Student = models.Student;
module.exports = router;

router.get('/', function (req, res, next) {
  Student.findAll()
  .then(students => res.json(students))
  .catch(next);
});

router.param('studentId', function (req, res, next, id) {
  Student.findById(id)
  .then(student => {
    if (!student) {
      const err = Error('Student not found');
      err.status = 404;
      throw err
    }
    req.student = student;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next);
});

router.post('/', (req, res, next) => {
  Student.create(req.body)
    .then(student => res.status(201).json(student))
    .catch(next);
});

router.get('/:studentId', (req, res, next) => {
  req.student(student => student)
    .then(student => res.json(student))
    .catch(next);
});


router.put('/:studentId/edit', (req, res, next) => {
  req.student.update(req.body)
    .then(student => res.json(student))
    .catch(next);
});


router.delete('/:studentId', (req, res, next) => {
  req.student.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});
