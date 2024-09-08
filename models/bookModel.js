import mongoose from "mongoose";


const bookSchema = mongoose.Schema({

    title: {
        type: String,
        required: false
    },
    subTitle: {
        type: String,
        required: false
    },
    vender: {
        type: String,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    review: {
        type: Number,
        required: false
    },
    imageUrl: {
        type: String,
        required: false
    }

},
    {
        toJSON: {
            transform: (doc, ret) => {
                delete ret.__v;
                return ret;
            }
        },
        toObject: {
            transform: (doc, ret) => {
                delete ret.__v;
                return ret;
            }
        }
    });

export const Book = mongoose.model("Book", bookSchema);