import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const mycoursesSchema = new Schema({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Courses',
        required: true
    },
    students: {
        type: Schema.Types.ObjectId,
        ref: 'Students',
        required: true
    }
}, {timestamps: true});

export default mongoose.model('MyCourses', mycoursesSchema);
