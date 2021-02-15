const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname))
app.get("/", (req,res) => {
    const indexPath = path.join(__dirname,"index.html")
    res.sendFile(indexPath)
    console.log(indexPath)
})
app.listen(3000, () => console.log("Server has started"))