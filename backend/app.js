const express = require("express");
const cors = require("cors");
const app = express();

const router = require("./router/authRouter")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api", router);

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});