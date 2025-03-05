import app from "./app.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {

    await connectDB()
    const port = 8000;

    app.listen(port, () => {
        console.log(`Listening on port: ${port}`)
    })
}
startServer() 