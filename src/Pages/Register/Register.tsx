import { NavLink, useNavigate } from "react-router-dom"
import useFetch from "../../Hooks/fetch"
import { ChangeEvent } from "react"

const { useState } = require("react")
const { default: Button } = require("../../components/Button/Button")
const { default: Input } = require("../../components/Input/Input")

const Register = () => {

    const [userDetails, setUserDetails] = useState({
        email: '',
        username: '',
        password: '',
        companyName: ''
    })

    const navigate = useNavigate()

    const { fetch }  = useFetch()

    const handleFormChange = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        const { target: { value }} = event;
        setUserDetails({
            ...userDetails,
            [event.target.name]: value
        });
    }

    const handleFormSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUserDetails(() => { 
            return {
                email: '',
                username: '',
                password: '',
                companyName: ''
            }
        })
        try {
            fetch("/register", 'POST', {
                ...userDetails
            }).then(res => {
                if(res.status === 200) {
                    navigate('/login')
                }
            })
        } catch(err) {
            console.error('registration failed due to', err)
        }
    }

    return (
        <form onSubmit={handleFormSubmit} onChange={handleFormChange}>
            <Input name='email' placeholder='email' defaultValue={userDetails['email']} value={userDetails['email']} />
            <Input name='username'  placeholder='username' defaultValue={userDetails['username']} value={userDetails['username']} />
            <Input name='password' placeholder='password' defaultValue={userDetails['password']} value={userDetails['password']}/>
            {/* <select placeholder='gender' name='gender' onChange={handleGender}/> */}
            <Input name='companyName' placeholder='company name' defaultValue={userDetails['companyName']} value={userDetails['companyName']} />
            <Button text='register'/>
            <Button text='cancel'/>
            <NavLink to="/login">Login Here</NavLink>
        </form>
    )
}

export default Register;