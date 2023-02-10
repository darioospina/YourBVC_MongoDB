/*
SOLUTION TO ERROR: Client does not support authentication protocol requested by server
Execute the following query in MYSQL Workbench
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
Where root as your user localhost as your URL and password as your password
Then run this query to refresh privileges:
flush privileges;
*/
// For Project: API, Server, Config DB
import express from 'express'
import mongoose from 'mongoose'
import bodyParser from "body-parser"
import cors from 'cors'
import Students from './Schemas/students.js'
import MyCourses from './Schemas/mycourses.js'
import Courses from './Schemas/courses.js'

const app = express();
const port = 3005;

// CONNECT TO MONGODB
const dbURI = 'mongodb://darioospina:Canada0822@cluster0-shard-00-00.nphiy.mongodb.net:27017,cluster0-shard-00-01.nphiy.mongodb.net:27017,cluster0-shard-00-02.nphiy.mongodb.net:27017/bvcdb?ssl=true&replicaSet=atlas-n2rwvb-shard-0&authSource=admin&retryWrites=true&w=majority'
mongoose
    .connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MongoDB connected")
    })
    .catch((err) => console.log(err))
  
app.use(cors({
    origin: '*'  
}));
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})


// INSERT A NEW STUDENT INTO THE DB
app.post("/api/newstudent", (req, res) => {
    const newStudent = new Students({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        email: req.body.email,
        password: req.body.password,
        term: req.body.term
    });
    newStudent.save()
        .then(student => {
            console.log(student)
            res.json(student)
        })
        .catch(err => console.log(err))
})

// AUTHENTICATE A USER
app.post("/api/studentinfo", (req, res) => {
    const email = req.body.Email
    const password = req.body.Password

    Students.find({email: email, password: password})
        .then((result) => {
            console.log(result)
            res.send(result)
        })
        .catch((err) => 
            console.log(err))
})

// GET THE INFO FROM ONE STUDENT BASED ON THE EMAIL
app.get("/api/student/:email", (req, res) => {
    const email = req.params.email

    Students.find({email: email})
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((err) => 
        console.log(err))
})

// GET INFO FROM ALL STUDENTS
app.get("/api/studentsList", (req, res) => {
    Students.find()
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((err) => 
        console.log(err))
})

// // GET A LIST OF ALL COURSES AVAILABLE
app.get("/api/courseslist/:studentId", (req, res) => {

    const studentId = req.params.studentId


    // Courses.find()
    Courses.aggregate([
        {
          $lookup: {
            from: "mycourses",
            localField: "_id",
            foreignField: "course",
            as: "course_student_mapping"
          }
        },
        {
          $match: {
            "course_student_mapping.students": {
              $ne: mongoose.Types.ObjectId(studentId)
            }
          }
        },
        {
          $project: {
            "course_student_mapping": 0
          }
        }
      ])
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((err) => 
        console.log(err))
})

// ADD A NEW COURSE TO MY COURSES
app.post("/api/addcourse", (req, res) => {
    const newMyCourse = new MyCourses({
        course: req.body.CourseId,
        students: req.body.StudentId
    });
    newMyCourse.save()
        .then(mycourse => {
            console.log(mycourse)
            res.json(mycourse)
        })
        .catch(err => console.log(err))
})

// GET THE LIST OF ALL MY COURSES
app.get("/api/mycourses/:studentId", (req, res) => {
    const studentId = req.params.studentId

    MyCourses.find({students: studentId})
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((err) => 
        console.log(err))
})

// PENDING
// // GET A LIST OF MY COURSES INCLUDING THE DETAILS OF EACH COURSE
app.get("/api/mycourses/details/:studentId", (req, res) => {

    const studentId = req.params.studentId

    MyCourses.aggregate([
        {
          $match: {
            "students": mongoose.Types.ObjectId(studentId)
          }
        },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "course_info"
          }
        },
        {
          $unwind: "$course_info"
        },
        {
          $group: {
            "_id": "$course_info._id",
            "courseCode": { "$first": "$course_info.courseCode" },
            "courseName": { "$first": "$course_info.courseName" },
            "startDate": { "$first": "$course_info.startDate" },
            "endDate": { "$first": "$course_info.endDate" },
            "campus": { "$first": "$course_info.campus" },
            "tutor": { "$first": "$course_info.tutor" },
            "schedule": { "$first": "$course_info.schedule" },
            "term": { "$first": "$course_info.term" },
            "courseId": { "$first": "$course" }
          }
        },
        {
          $project: {
            "_id": 0,
            "courseCode": "$courseCode",
            "courseName": "$courseName",
            "startDate": "$startDate",
            "endDate": "$endDate",
            "campus": "$campus",
            "tutor": "$tutor",
            "schedule": "$schedule",
            "term": "$term",
            "courseId": "$courseId"
          }
        }
      ])
      .then((result) => {
        console.log(result)
        res.send(result)
      })
      .catch((err) => 
        console.log(err))
})

// GET THE INFORMATION BY COURSE ID
app.get("/api/getcoursedetails/:courseId", (req, res) => {
    const courseId = req.params.courseId;

    Courses.find({_id: courseId})
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((err) => 
        console.log(err))
})

// UPDATE PROFILE INFO
app.patch("/api/updateprofile/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    const email = req.body.email;
    const password = req.body.password;

    Students.updateOne(
        { "_id": mongoose.Types.ObjectId(studentId) },
        {
          $set: {
            "email": email,
            "password": password
          }
        }
      )
    .then((result) => {
        console.log(result)
        res.send(result)
    })
    .catch((err) => 
        console.log(err))
})

// DROP A COURSE FROM MYCOURSES
app.delete("/api/delete/:courseId/:studentId", (req, res) => {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;

    MyCourses.deleteOne({
        course: mongoose.Types.ObjectId(courseId),
        students: mongoose.Types.ObjectId(studentId)
      })
     .then((result) => {
        console.log(result)
        res.send({message: 'Course successfully removed'})
     })
     .catch((err) => {
        console.log(err)
        res.send({message: 'Course not found'})
     })
})

// ADDING COURSES TO THE LIST

const listOfCourses = [
    {
        "courseCode":"Pr111",
        "courseName":"Project management1",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"South Campus",
        "tutor":"Peter Griffin",
        "schedule":"Mon-Fri 9:00AM - 11:00AM"
        ,"term":1
    },
    {
        "courseCode":"C++111",
        "courseName":"C++ Programming Fundamentals",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"South Campus",
        "tutor":"Peter Griffin",
        "schedule":"Mon-Fri 9:00AM - 11:00AM",
        "term":1
    },
    {
        "courseCode":"CompM1111",
        "courseName":"Computer Maintenance",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"North Campus",
        "tutor":"Zoran Ali",
        "schedule":"Tue-Thu 9:00AM - 11:00AM",
        "term":1
    },
    {
        "courseCode":"IS1111",
        "courseName":"Information Security1",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"South Campus",
        "tutor":"Zoran Ali",
        "schedule":"Mon 8:00AM - 11:00AM",
        "term":1
    },
    {
        "courseCode":"Net222",
        "courseName":"Networking",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"South Campus",
        "tutor":"Rupa Fu",
        "schedule":"Fri 8:00AM - 11:00AM",
        "term":2
    },
    {
        "courseCode":"Web222",
        "courseName":"Web technology",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"East Campus",
        "tutor":"Iskandar Jonas",
        "schedule":"Tue 11:00AM - 1:00PM",
        "term":2
    },
    {
        "courseCode":"Pro222",
        "courseName":"Project Management",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"East Campus",
        "tutor":"Iskandar Jonas",
        "schedule":"Tue-Thu 2:00PM - 4:00PM",
        "term":2
    },
    {
        "courseCode":"Pr333",
        "courseName":"Advanced Project Management1",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"North Campus",
        "tutor":"Kerri Betty",
        "schedule":"Mon-Fri 2:00PM - 4:00PM",
        "term":3
    },
    {
        "courseCode":"C++333",
        "courseName":"Advanced C++ Programming Fundamentals",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"South Campus",
        "tutor":"Kerri Betty",
        "schedule":"Tue-Thu 7:00PM - 9:00PM",
        "term":3
    },
    {
        "courseCode":"CompM333",
        "courseName":"Advanced Computer Maintenance",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"South Campus",
        "tutor":"Deepa Evlogi",
        "schedule":"Mon-Fri 7:00PM - 9:00PM",
        "term":3
    },
    {
        "courseCode":"IS333",
        "courseName":"Advanced Information Security1",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"South Campus",
        "tutor":"Hilaria Daryl",
        "schedule":"Tue-Thu 2:00PM - 4:00PM",
        "term":3
    },
    {
        "courseCode":"Net222",
        "courseName":"Advanced Networking",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"North Campus",
        "tutor":"Yash Pharaildis",
        "schedule":"Mon 9:00AM - 11:00AM",
        "term":4
    },
    {
        "courseCode":"Web222",
        "courseName":"Advanced Web Technology",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"North Campus",
        "tutor":"Frederico Margriet",
        "schedule":"Tue 9:00AM - 11:00AM",
        "term":4
    },
    {
        "courseCode":"Pro222",
        "courseName":"Advanced Project Management",
        "startDate":"2023-01-10",
        "endDate":"2023-04-18",
        "campus":"North Campus",
        "tutor":"Maximilianus Alojzij",
        "schedule":"Wed 9:00AM - 11:00AM",
        "term":4
}];

async function addCourses() {
    const count = await Courses.countDocuments();
  
    if (count === 0) {
      try {
        const savedCourses = await Courses.insertMany(listOfCourses);
        console.log('Courses saved successfully: ', savedCourses);
      } catch (error) {
        console.error('Error saving courses: ', error);
      }
    } else {
      console.log('Courses already exist in the collection. No new courses were added.');
    }
  }
  
addCourses();
