const CRUDservice = require('../services/CRUDservice')

//get CRUD
const getCRUDAllFilm = async (req, res) => {
    const data = await CRUDservice.getAllFilm()
    return res.json(data)
}
const getCRUDAllChat = async (req, res) => {
    const data = await CRUDservice.getAllChat()
    return res.json(data)
}
const getCRUDAllUser = async (req, res) => {
    const data = await CRUDservice.getAllUser()
    return res.json(data)
}


//post CRUD
const postCRUDNewFilm = async (req, res) => {
    const data = await CRUDservice.createNewFilm(req.body)
    return res.json(data)
}
const postVideo = async (req, res) => {
    const data = await CRUDservice.createVideo(req, res)
    return res.json(data)
}
const postCRUDNewUser = async (req, res) => {
    const data = await CRUDservice.createNewUser(req.body)
    return res.json(data)
}
const postCRUDLoginUser = async (req, res) => {
    const data = await CRUDservice.loginUser(req, res)
    return res.json(data)
}


//delete CRUD
const deleteCRUDUser = async (req, res) => {
    const data = await CRUDservice.deleteUser(req, res)
    return res.json(data)
}
const deleteCRUDChat = async (req, res) => {
    const data = await CRUDservice.deleteChat(req, res)
    return res.json(data)
}
const deleteCRUDFilm = async () => {

}

module.exports = {
    getCRUDAllChat: getCRUDAllChat,
    getCRUDAllFilm: getCRUDAllFilm,
    getCRUDAllUser: getCRUDAllUser,
    postCRUDNewFilm: postCRUDNewFilm,
    postVideo: postVideo,
    postCRUDNewUser: postCRUDNewUser,
    postCRUDLoginUser: postCRUDLoginUser,
    deleteCRUDUser: deleteCRUDUser,
    deleteCRUDFilm: deleteCRUDFilm,
    deleteCRUDChat: deleteCRUDChat
}