// React and Libraries
import React from "react";
import Axios from "axios"

// React Hooks
import {useState, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Other components
import Logo from '../Images/logo.png'


export const Login = () => {

    const navigate = useNavigate();
    const[studentEmail, setStudentEmail] = useState('');
    const[password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(studentEmail)
        Axios.post(`${process.env.REACT_APP_API_URL}/api/studentinfo`, {
            Email: studentEmail,
            Password: password
        }).then((res) => {
            console.log(res)
            if(res.data != '') {
                console.log("User authenticated");
                console.log(res.data);
                setStudentEmail(studentEmail);
                window.localStorage.setItem('SET_USERNAME', studentEmail) 
                window.location.href = '../Profile'
            } else {
                alert("This user does not exist in our DB")
            }
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        console.log("Email and/or password changed")
        const btnSubmit = document.getElementById("buttonSubmit")
        btnSubmit.addEventListener("click", handleSubmit)

        return () => {
            btnSubmit.removeEventListener("click", handleSubmit)
        }
        
    }, [studentEmail, password])


    return(
        <div className="auth-form-container">
            <div style={{margin: "auto", padding: "auto"}}>
                <img src={Logo} width="250px" style={{verticalAlign: "middle"}} alt="Logo"></img>
            </div>
                <h2>Login</h2>
                <p style={{margin: "10px auto", fontSize: "14px"}}>For testing purposes you can use "test@fakemail.com" as Email and "test" as Password.</p>
            <Form style={{width:"80%", border:"1px solid #E5E7E9", padding: "20px", margin: "auto"}}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} type="email" placeholder="Try sample both for email and password" id="email" name="email"/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="***********" id="password" name="password" />
                </Form.Group>

                <Button variant="primary" type="submit" id="buttonSubmit">Sign in</Button>
                <br></br>
                <Form.Text className="text-primary">
                <Link to="./student-registration" style={{textDecoration:'none'}}>Don't have an account? Register here.</Link> 
                </Form.Text>
            </Form>
       </div>
    )
}