// React Hooks
import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

// React Icons
import {Image, Button, Card} from 'react-bootstrap'
import { MdPerson } from "react-icons/md";
import { MdAlternateEmail } from "react-icons/md";
import { MdPermDeviceInformation } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";
import {MdCalendarToday} from 'react-icons/md'
import {RiLockPasswordFill} from 'react-icons/ri'

// Components
import mypic from '../Images/profilePic4.jpg'
import MyCourses from './MyCourses';
import AddCourses from './AddCourses';

// Other libraries
import Axios from 'axios'
import Form from 'react-bootstrap/Form';

const Profile = () => {
    
    const userName = window.localStorage.getItem('SET_USERNAME')
    console.log(userName)
    const [student, setStudent] = useState(userName)    
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [studentId, setStudentId] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get(`http://localhost:3005/api/student/${userName}`)
        .then((res) => {
            setStudent(res.data[0])
            console.log(res.data[0])
        })
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(oldPassword == student.password) {
            Axios.patch(`http://localhost:3005/api/updateprofile/${student._id}`, {
                email: email,
                password: password
            }).then((res) => {
                console.log(res)
            }
            ).then(
                navigate("../")
            ).catch((err) => {
                console.log(err)
            })    
        } else {
            alert("Your Old Password is not correct")
        }
    }
    

    return (
        <div className='profile'>
            <h1 className='profileTitle'>Profile</h1>
            <div className='profileCard'>
                <Card style={{ width: '17rem' }} border='light'>
                    <Image className="image-center" roundedCircle="false" src={mypic} width="100%" />
                    <Card.Body className='cardBody'>
                        <Card.Title ><MdPerson />Student Name:</Card.Title>
                        <Card.Text className='text-center '>
                            {student.firstName} {student.lastName}
                        </Card.Text>
                        <Card.Title ><MdPermDeviceInformation />Student ID:</Card.Title>
                        <Card.Text className='text-center '>
                            {student._id}
                        </Card.Text>
                        <Card.Title ><MdAlternateEmail />Email:</Card.Title>
                        <Card.Text className='text-center '>
                            {student.email}
                        </Card.Text>
                        <Card.Title ><MdCalendarToday />Term:</Card.Title>
                        <Card.Text className='text-center '>
                            {student.term}
                        </Card.Text>
                    </Card.Body>
                </Card>


            <MyCourses></MyCourses> 

            <Form className='cardBody' style={{border:"1px solid #E5E7E9", padding: "20px"}}>
                <h4>Update your credentials</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control onChange={(e) => setOldPassword(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Update
                </Button>
            </Form>


            </div>

        </div>
    )
}
export default Profile