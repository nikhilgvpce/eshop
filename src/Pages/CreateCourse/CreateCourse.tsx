import { useState } from "react"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import { useNavigate } from "react-router-dom"
import useFetch from "../../Hooks/fetch"

const CreateCourse = () => {

    const [courseDetails, setCourseDetails] = useState({
        course_instructor: '',
        course_ratings: '',
        course_img: '',
        course_price: '',
        course_title: '',
    })


    const { fetch } = useFetch()

    const navigate = useNavigate()

    const handleFormChange = (event: React.ChangeEvent<HTMLFormElement>) => {
        setCourseDetails({
            ...courseDetails,
            [event.target.name]: event.target.value
        })
    }

    const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        fetch('/createcourse', 'POST', courseDetails, {})
        .then((res) => {
            if(res.status === 200) {
                // redirect user to the same page as user might
                // want to create another course
                navigate('/createcourse');
                alert('Saved course successfully')
            }
        }).finally(() => {
            setCourseDetails({
                course_instructor: '',
                course_ratings: '',
                course_img: '',
                course_price: '',
                course_title: '',
            })
        })
        
    }

    return (
        <form className="create-course-wrapper" onChange={handleFormChange} onSubmit={handleFormSubmit}>
            <Input name='course_title' type='text' value={courseDetails.course_title} placeholder="course title" />
            <Input name='course_instructor' type='text' value={courseDetails.course_instructor} placeholder="course instructor" />
            <Input name='course_ratings' type='number' value= {courseDetails.course_ratings} placeholder="course ratings"/>
            <Input name='course_price' type='number' value= {courseDetails.course_price} placeholder="course price"/>
            <Input name='course_img' type="text" title="upload course image" value={courseDetails.course_img} placeholder="image link" />
            <Button text='submit'/>
        </form>
    )
}

export default CreateCourse