import React from 'react'
import { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios'

const MyCourses = ()=>{

    const userName = window.localStorage.getItem('SET_USERNAME')
    const [studentId, setStudentId] = useState()    

    const [coursesList, setCoursesList] = useState(null);
    const [myCourses, setMyCourses] = useState(null)
    
    useEffect(() => {
        Axios.get(`http://localhost:3005/api/student/${userName}`)
        .then((res) => {
            setStudentId(res.data[0]._id)
            console.log(res.data[0]._id)
        })
    }, [])

    useEffect(() => {
        Axios.get(`http://localhost:3005/api/mycourses/details/${studentId}`)
        .then((res) => {
            setMyCourses(res.data)
            console.log(res.data)
        })
    }, [studentId])

    const handleDeleteCourse = (courseId)=>{
        console.log(studentId)
        console.log(courseId)
        if(window.confirm("Are you sure you want to delete this course?")) {
            Axios.delete(`http://localhost:3005/api/delete/${courseId}/${studentId}`)
            .then((res) => {
                console.log(res)
            })
            .then(
                window.location.reload(true)
            )
            .catch((err) => {
                console.log(err)
            })
        }

    }


    return (
        <div>
            {myCourses && myCourses.map((myCourseId, index) => (
                <div key={index}>
                    <Card style={{ width: "80%", margin: "20px auto" }}>
                        <Card.Header>
                            <div style={{ display: "table", width: "100%" }}>
                                <div style={{ display: "table-row" }}>
                                    <div id="myCourseId" style={{ display: "table-cell" }}><b>{myCourseId.courseName}</b></div>
                                    <div style={{ display: "table-cell", textAlign: "right" }}><b>{myCourseId.courseCode}</b></div> 
                                </div>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            <Card.Text>
                                <div>
                                    <b>Term:</b> {myCourseId.term}
                                </div>
                                <div>
                                    <b>Tutor:</b> {myCourseId.tutor}
                                </div>
                                <div>
                                    <b>Campus:</b> {myCourseId.campus}
                                </div>
                                <div>
                                    <b>Start Date:</b> {myCourseId.startDate}
                                </div>
                                <div>
                                    <b>End Date:</b> {myCourseId.endDate}
                                </div>
                                <div>
                                    <b>Schedule:</b> {myCourseId.schedule}
                                </div>
                            </Card.Text>
                            <Button variant="danger" style={{ marginRight: "10px" }} onClick={() => {handleDeleteCourse(myCourseId.courseId) }} >Drop</Button>
                        </Card.Body>
                    </Card>
                </div>
            ))
            } 
        </div>
    )
}




export default MyCourses