
const Course = require("../models/Course")

const createCourse = async({title, instructorDetails, price, rating, img}) => {
    const responseBody = {
        message: null,
        status: null,
    }
    const courseModel = new Course({
        name: title,
        instructorDetails: instructorDetails,
        price: price,
        rating: rating,
        img: img
    })

    courseModel.validate().then(() => {
        courseModel.save()
    })
    .then((savedCourse) => {
        responseBody.message = 'Course created Successdully';
        responseBody.status = 200;
        console.info(savedCourse)
    }).catch((validationError) => {
        responseBody.message = `course creation failed due to validation error ${validationError}`;
        responseBody.status = 409
        console.error("validation error", validationError);
      })
      .catch((saveError) => {
        responseBody.message = `course creation failed due to ${saveError}`;
        responseBody.status = 409
        console.error("Error creating course", saveError);
      }).finally(() => {
        return responseBody
      })
}

const getCourses = async() => {
    const courses = await Course.find({});
    return courses
}

module.exports = {
    createCourse,
    getCourses
}