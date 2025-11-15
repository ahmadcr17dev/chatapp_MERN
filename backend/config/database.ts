import mongoose from "mongoose";

const DatabaseConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string),
        console.log("Database Connected");
    } catch (error) {
        console.log("Error in connection: ", error);
    }
}

export default DatabaseConnect;