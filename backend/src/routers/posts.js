const { Router } = require("express")
const homeController = require("../controllers/homeController")
const router = require("express").Router()

router.get('/', (req,res)=>{
	res.send(`server is running on port 5000`)
})

//    http://localhost:5000/api/posts/film
router.get('/film', homeController.getCRUDAllFilm)
//    http://localhost:5000/api/posts/user
router.get('/user', homeController.getCRUDAllUser)
//    http://localhost:5000/api/posts/msg
router.get('/msg', homeController.getCRUDAllMsg)


//    http://localhost:5000/api/posts/register
router.post('/register', homeController.postCRUDNewUser)
//    http://localhost:5000/api/posts/login
router.post('/login', homeController.postCRUDLoginUser)
//    http://localhost:5000/api/posts/add
router.post('/add',homeController.postCRUDNewFilm)
//    Route này Xử lý khi client thực hiện hành động upload file
//    http://localhost:5000/api/posts/upload
router.post("/upload",homeController.postVideo)

//    http://localhost:5000/api/posts/delete-user/:username
router.delete("/delete-user/:username",homeController.deleteCRUDUser)
//    http://localhost:5000/api/posts/delete-mes/:id
router.delete("/delete-mes/:id",homeController.deleteCRUDMes)

module.exports= router