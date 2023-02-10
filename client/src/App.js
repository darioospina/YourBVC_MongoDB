import React, { Component, useState, useEffect } from 'react';
import { BrowserRouter as Router,Routes, Route  } from 'react-router-dom';
import {Login} from './Pages/Login'
import Profile from './Pages/Profile'
import {StudentRegistration} from './Pages/StudentRegistration'
import AddCourses from './Pages/AddCourses'
import MyCourses from './Pages/MyCourses'
import Header from './Components/Header'
import Footer from './Components/Footer'
import './App.css'

const  App = () =>{
  return (
    <Router>

      {/* {(localStorage.length == 1) && <Header/>} */}
      {window.location.pathname === "/" ? null : <Header/>}
      <Routes>
        <Route path="/" index element={<Login />}/>
        <Route path="/student-registration" element={<StudentRegistration />}/>          
        <Route path="/profile" element={<Profile />}/>
        <Route path="/my-courses" element={<MyCourses />}/>
        <Route path="/add-courses" element={<AddCourses />}/>
      </Routes>
      <Footer/>
    </Router>
    )
  }


export default App;