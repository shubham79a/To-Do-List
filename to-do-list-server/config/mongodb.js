import mongoose from 'mongoose'

const connectDB=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('connected to MongoDB')
    })
    mongoose.connect(`${process.env.MONGODB_URI}/to-do-list`)
}

export default connectDB