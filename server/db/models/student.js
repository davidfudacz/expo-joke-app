'use strict';

const db = require('../index');
const DataTypes = db.Sequelize;
const unique = require

const images = [
  'https://designerdoginfo.files.wordpress.com/2013/01/puggle-puppy-4.jpg?w=584',
  'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/slide/public/puppy-2_0.jpg',
  'https://www.askideas.com/media/19/Papillon-Puppy-Looking.jpg',
  'http://www.101dogbreeds.com/wp-content/uploads/2015/10/Chi-Spaniel-Puppy-Pictures.jpg',
  'http://4.bp.blogspot.com/-3JeIxWBU7bY/UKjIt8lVpCI/AAAAAAAABx8/YM8piSOwczs/s1600/Schipperke-Puppy.jpg'
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

const Student = db.define('student', {
  name: {
    type: DataTypes.STRING(1e4),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    defaultValue: function () {
      return getRandomImage();
    }
  },
  GPA: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
})

module.exports = Student;
