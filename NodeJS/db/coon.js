const mongoose = require('mongoose')

async function main() {
    
    await mongoose.connect('mongodb://0.0.0.0:27017/my_commerce')
    console.log("Conexão feita")
}

main().catch((err) => console.log(err))

module.exports = mongoose