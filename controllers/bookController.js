import { Book } from "../models/bookModel.js";
//getAllBooks
export const getTopOfWeek = async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length == 0) {
            res.status(404).json({ message: "No Book Found" });
        }
        return res.status(200).json(books);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


// Add a book to the database
export const addBook = async (req, res) => {
    const books = req.body;


    if (!Array.isArray(books)) {
        return res.status(400).json({ message: "Input should be an array of books." });
    }

    // Store validation errors
    let validationErrors = [];

    // Validate each book
    books.forEach((book, index) => {
        const { title, vender, price, review } = book;

        if (!title || !vender || !price) {
            validationErrors.push(`Book at index ${index}: Title, Vender, and Price are required fields.`);
        }

        if (review && (review < 1 || review > 5)) {
            validationErrors.push(`Book at index ${index}: Review must be between 1 and 5.`);
        }
    });

    if (validationErrors.length > 0) {
        return res.status(400).json({ message: "Validation Failed", errors: validationErrors });
    }

    try {

        const savedBooks = Book.insertMany(books);
        res.status(201).json(savedBooks);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add book. Internal Server Error." });
    }
};
