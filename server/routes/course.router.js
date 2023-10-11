const courseController = require("../controllers/course.controller")

const createCourse = async(req, res, upload) => {
    const { body } = req;
    // upload.single('course_img');
    console.log(body);
    const { course_title, course_instructor, course_price, course_ratings, course_img } = body;

    const result = await courseController.createCourse({
        title: course_title,
        price: course_price,
        instructorDetails: course_instructor,
        rating: course_ratings,
        img: course_img
    })

    res.send(result)
}

module.exports = {
    createCourse
}