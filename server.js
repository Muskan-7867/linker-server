import app from "./app.js";
import connectDB from "./src/config/db.js";

const startServer = async () => {

    await connectDB()  
    
    const port = 8083;
    app.set("port", port)
    app.listen(app.get("port"), () => {
        console.log(`Listening on port: ${app.get("port")}`)
    })
}
startServer() 

//hun ki error aa ?
//deploy ch ni chlda ye v dekhi local route te deployed route da chkr a shyd  
//error dikha ki aariha rukja port chngr krnnnna pena sare ch fr chlna   ki dita c bakiya vich 8082 