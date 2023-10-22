const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json())


// Connect to MongoDB
require("./db")

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
});

const Registration = mongoose.model('Registration', registrationSchema);


app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const res = await Registration.findOne({ email: email })
        if (res) {
            return res.status(200).send({ message: "user already exist" })
        }
        const newUser = new Registration({ name: name, email: email, password: password })
        await newUser.save();
        res.status(201).send({ message: "user created successfully" })
    } catch (err) {
        return res.status(200).send({ message: "Error " })
    }
});

app.get("/register", async (req, res) => {
    console.log(req.params.id)
    try {
        const users = await Registration.find({})
        console.log(users)
        return res.status(200).send(users)
    } catch (err) {
        res.status(500).json({ message: "Couldn't retrieve user" })
    }
})

app.delete("/register/:id", async (req, res) => {
    const id = req.params.id
    try {
        const users = await Registration.deleteOne({ _id: id })
        return res.status(200).send({ message: "user deleted" })
    } catch (err) {
        res.status(500).json({ message: "Couldn't retrieve user" })
    }
})

app.put('/register/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    try {
        const updatedUser = await Registration.findByIdAndUpdate(
            userId,
            { name, email, password },
            { new: true, useFindAndModify: false } // Returns the updated document and prevents deprecated warning
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

