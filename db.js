const mongoose = require('mongoose')
const DB = 'mongodb+srv://workspacex28:UIYmxoRcl2LfMTG9@cluster0.08wivtf.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB).then(() => {
    console.log("Connection Successfull (DB)")
}).catch((err) => {
    console.log("Connection Failed", err.message)
})