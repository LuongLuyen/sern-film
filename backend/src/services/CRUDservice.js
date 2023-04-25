const db = require('../models/index')
const multer = require("multer")

const createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = data
        try {
            const newUser = await db.User.create({
                username: username,
                password: password
            })
            resolve(newUser)
        } catch (err) {
            reject(err)
        }
    })
}
const createNewFilm = async (data) => {
    return new Promise(async (resolve, reject) => {
        const { name, type, video, img } = data
        try {
            const newFilm = await db.Film.create({
                name: name,
                type: type,
                video: video,
                img: img,
            })
            resolve(newFilm)
        } catch (err) {
            reject(err)
        }
    })

}
const createVideo = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        const diskStorage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "uploads")
            },
            filename: (req, file, callback) => {
                const math = ["image/png", "image/jpeg", "video/mp4"]
                if (math.indexOf(file.mimetype) === -1) {
                    return callback(null)
                }
                const date = `${Date.now()}`
                const filename = `${date.slice(0, 9)}${file.originalname}`
                callback(null, filename)
            }
        })
        const uploadFile = multer({ storage: diskStorage }).single("file")
        uploadFile(req, res, (err) => {
            try {
                if (err) {
                    return err
                }
                if (req.file) {
                    resolve(`${process.env.URL_SERVER}/uploads/${req.file.filename}`)
                } else {
                    resolve(null)
                }
            } catch (error) {
                reject(error)
            }
        })
    })

}
const loginUser = async (req, res) => {
    const { username, password } = req.body
    if (!username) {
        const status = "Vui lòng điền tài khoản hoặc mật khẩu"
        return status
    }
    try {
        const port = process.env.URL_CLIENT
        const user = await db.User.findOne({ where: { username: username } })
        if (user.username === username && user.password === password) {
            res.redirect(`${port}/content`)
        } else {
            res.redirect(`${port}/login`)
        }
    } catch (err) {
        const status = `Lỗi:.....:${err}`
        return status
    }

}


const getAllChat = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const chat = await db.Chat.findAll()
            resolve(chat)
        } catch (err) {
            reject(err)
        }
    })
}
const getAllUser = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findAll()
            resolve(user)
        } catch (err) {
            reject(err)
        }
    })
}
const getAllFilm = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const film = await db.Film.findAll()
            resolve(film)
        } catch (err) {
            reject(err)
        }
    })
}


const deleteUser = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = req.params.username
            const userDelete = await db.User.findOne({ where: { username: user } })
            if (userDelete != null) {
                userDelete.destroy()
            }
            const userOld = await db.User.findAll()
            resolve(userOld)
        } catch (err) {
            reject(err)
        }
    })
}
const deleteChat = async (req, res) => {
    return new Promise(async (resolve, reject) => {
        try {
            const key = req.params.key
            const mesDelete = await db.Chat.findOne({ where: { key: key } })
            if (mesDelete != null) {
                mesDelete.destroy()
            }
            const mesOld = await db.Chat.findAll()
            resolve(mesOld)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    createNewFilm: createNewFilm,
    createVideo: createVideo,
    getAllChat: getAllChat,
    getAllFilm: getAllFilm,
    getAllUser: getAllUser,
    loginUser: loginUser,
    deleteUser: deleteUser,
    deleteChat: deleteChat
}