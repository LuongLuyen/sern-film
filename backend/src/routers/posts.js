const { Router } = require("express")
const homeController = require("../controllers/homeController")
const router = require("express").Router()

router.get('/', (req, res) => {
	res.send(`server is running on port 5000`)
})

//    http://localhost:5000/all-film
router.get('/all-film', homeController.getCRUDAllFilm)
//    http://localhost:5000/all-user
router.get('/all-user', homeController.getCRUDAllUser)
//    http://localhost:5000/all-chat
router.get('/all-chat', homeController.getCRUDAllChat)


//    http://localhost:5000/register
router.post('/register', homeController.postCRUDNewUser)
//    http://localhost:5000/login
router.post('/login', homeController.postCRUDLoginUser)
//    http://localhost:5000/create-film
router.post('/create-film', homeController.postCRUDNewFilm)
//    Route này Xử lý khi client thực hiện hành động upload file
//    http://localhost:5000/upload
router.post("/upload", homeController.postVideo)

//    http://localhost:5000/delete-user/:username
router.delete("/delete-user/:username", homeController.deleteCRUDUser)
//    http://localhost:5000/delete-chat/:key
router.delete("/delete-chat/:key", homeController.deleteCRUDChat)

module.exports = router