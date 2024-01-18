const express = require('express');
const cors = require('cors');
const {readJsonFile, writeJsonFile} = require("./fsUils");


const app = express();


app.use(cors()); // erlaubt den Ürsprungsübergreifenden (Ursprung=Origin, übergreifend=Cross) Zugriff auf resourcen (also das ein Client von zb localhost:3489 auf localhost:5909, oder sonst eine anderen Server greifen kann)
app.use((req, _, next) => {
    console.log("new request", req.method, req.url);
    next();
});
app.use(express.json());

app.get("/api/buch", (_, res) => {
    readJsonFile("./buch-data.json")
      .then((buch) => res.status(200).json({ success: true, result: buch })) // put 200 (OK) into status and the object as JSON in the body...(and end the response)
    .catch((err) => {
        console.log(err); // wir geben den error aus damit wir sehen, was passiert ist (nur für uns)
        res
        .status(INTERNAL_SERVER_ERROR)
        .json({ success: false, error: "Failed to load Gästebuch" });
    });
});



app.post("/api/buch", (req, res) => {

    const newPost = {
    id: Date.now(),
    name: req.body.name ,
    email: req.body.email,
    message: req.body.message,
    };
    
    
    readJsonFile("./buch-data.json")
    .then((buch) => [...buch, newPost])
    .then((newPostArray) => writeJsonFile("./buch-data.json", newPostArray))
    .then((newPostArray) => {
        res.status(201).json({ success: true, result: newPostArray });
    })
    .catch((err) => {
        console.log(err);
        res
        .status(500)
        .json({ success: false, error: "Failed to update Post" });
    });
});


app.use((_, res) => {
    res.status(404).json({
    success: false,
    error: "Route not found",
    });
});


const PORT = 5050;
app.listen(PORT, () => {
  console.log("Server listening on port", PORT);
});