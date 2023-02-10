import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const coursesSchema = new Schema({
    courseCode: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    campus: {
        type: String,
        required: true
    },
    tutor: {
        type: String,
        required: true
    },
    schedule: {
        type: String,
        required: true
    },
    term: {
        type: Number,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Courses', coursesSchema);
