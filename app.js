const express = require("express");
const { devConfig } = require("./config");
const { users } = require("./src/routes");
require("./src/config/db")
const app = express();

app.use(express.json());
app.use("/users", users)


app.use((req, res) => {
    res.status(400).json({
        message: "please check route"
    })
})
app.listen(devConfig.port.port, () => {
    console.log(`Server running on port ${devConfig.port.port}`)
});