import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const studentsSchema = new Schema({
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    dateOfBirth: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    term: {
        type: Number,
        required: false
    }
})

export default mongoose.model('Students', studentsSchema);


