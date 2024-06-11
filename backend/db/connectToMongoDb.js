import mongoose from 'mongoose';

const connectToMongoDb = async () => {
    try {
        await mongoose.connect('mongodb+srv://ademolaidris2002:wf4qq2MXsUSR8VBT@cluster0.qjryh2a.mongodb.net/')
            console.log('DB connection succesful');
        }
        catch (error) {
        console.log('error connecting to mongodb', error.message);
    }
}

export default connectToMongoDb;