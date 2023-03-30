const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://jaider:12345@cluster0.djqhev2.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, 
    { useNewUrlParser: true, 
        useUnifiedTopology: true, 
        serverApi: ServerApiVersion.v1 
});

module.exports = client