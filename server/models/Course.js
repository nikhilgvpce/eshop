const { default: mongoose}  =  require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: { type: "string", required: true },
  instructorDetails: { type: "string", required: true},
  price: { type: "number", required: true },
  rating: { type: "number", required: true },
  img: {type: "string", required: true },
  topics: {type: ["string"]},
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;