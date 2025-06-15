import mongoose from 'mongoose';

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL!);
        const connection = mongoose.connection;
        connection.once('connected', () => {
            console.log('Connected to MongoDB');
        });
        connection.on('error', (error) => {
            console.error('Error in connecting to MongoDB ----> ', error);
            process.exit();
        })
    } catch (error) {
        console.log('Error in connecting to MongoDB ----> ', error);
        return false;
    }
}

export default connect;