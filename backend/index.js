const express  = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const mongoose = require("mongoose")
const http = require("http")
const postsRoute = require("./src/routers/posts")
const Msg = require('./src/models/Msg')

const app = express()
const server = http.createServer(app)
const socketIo = require("socket.io")(server, {cors: {origin: "*"}})
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/uploads', express.static('./uploads'))

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
mongoose.set("strictQuery", true)
const connectDB = async () => {
	try {
		await mongoose.connect(
			process.env.URL_DB,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			}
		)
		console.log('MongoDB connected')
	} catch (error) {
		console.log(error.message)
		process.exit(1)
	}
}
connectDB()

socketIo.on("connection",(socket) => {
	console.log("New client connected")
  
	socket.on("sendDataClient",(data)=> {
		socketIo.emit("sendDataServer", { data })
		//save db
		const{id,sender,content}=data
		if(content){
			const newMsg = new Msg({ id,sender,content})
			newMsg.save(newMsg)
		}
	})
  
	socket.on("disconnect", () => {
	  console.log("Client disconnected")
	})
  })


app.use('/api/posts', postsRoute)
server.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})
