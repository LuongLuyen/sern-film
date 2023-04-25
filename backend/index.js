const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const http = require("http")
const postsRoute = require("./src/routers/posts")
const connectDB = require('../backend/src/config/connectDB')
const db = require("./src/models/index")


const app = express()
const server = http.createServer(app)
const socketIo = require("socket.io")(server, { cors: { origin: "*" } })
const PORT = process.env.PORT || 5000

dotenv.config()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
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
connectDB()

socketIo.on("connection", (socket) => {
	console.log("New client connected")

	socket.on("sendDataClient", async (data) => {
		socketIo.emit("sendDataServer", { data })
		//save db
		const { key, sender, content } = data
		if (content && key && sender) {
			await db.Chat.create({
				key: key,
				sender: sender,
				content: content
			})
		}
	})

	socket.on("disconnect", () => {
		console.log("Client disconnected")
	})
})


app.use('/', postsRoute)
server.listen(PORT, () => {
	console.log(`server is running on port ${PORT}`)
})
