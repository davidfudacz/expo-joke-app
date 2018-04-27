'use strict';

const express = require('express');
const router = new express.Router();
const models = require('../db/models');
const Campus = models.Campus;
module.exports = router;

router.get('/', function (req, res, next) {
  Campus.findAll()
  .then(campuses => res.json(campuses))
  .catch(next);
});

router.param('campusId', function (req, res, next, id) {
  Campus.findById(id)
  .then(campus => {
    if (!campus) {
      const err = Error('Campus not found');
      err.status = 404;
      throw err
    }
    req.campus = campus;
    next();
    return null; // silences bluebird warning about promises inside of next
  })
  .catch(next)
});

router.post('/', (req, res, next) => {
  Campus.create(req.body)
    .then(campus => res.status(201).json(campus))
    .catch(next);
});

router.get('/:campusId', (req, res, next) => {
  req.campus.reload(Campus.options.scopes.populated())
    .then(campus => res.json(campus))
    .catch(next);
});

router.put('/:campusId/edit', (req, res, next) => {
  req.campus.update(req.body)
    .then(campus => res.json(campus))
    .catch(next);
});


router.delete('/:campusId', (req, res, next) => {
  req.campus.destroy()
    .then(() => res.sendStatus(204))
    .catch(next);
});
