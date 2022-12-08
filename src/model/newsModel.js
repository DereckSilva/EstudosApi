import mongoose from "mongoose";

const NewsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user:{
        //relation between collection inside mongoose
       type: mongoose.Schema.Types.ObjectId,
       ref: "User" ,
       required: true
    }
})

export const NewsModel = mongoose.model("News", NewsSchema)