const User = require("../models/User")
const Film = require("../models/Film")
const Msg = require("../models/Msg")
const multer = require("multer")

const createNewUser = async(data)=>{
    return new Promise(async(resolve,reject) => {
        const { username,password} = data
        if (!username){
            return 
        }
        try {
            const user = await User.findOne({ username })
            if (user){
                return 
            }
            const newUser = new User({ username,password})
            newUser.save(newUser)
            resolve(newUser)
        } catch (err) {
            reject(err)
        }
    })
}
const createNewFilm = async(data)=>{
    const { name,type,video,img} = data
    console.log([name,type,video,img])
    if (!name){     
        return name
    }try {
        const film = await Film.findOne({ name })
        if (film){
            return film
        }
        const newFilm = new Film({ name,type, video,img})
        newFilm.save(newFilm)
        return newFilm
    } catch (err) {
        return err
    }

}
const createVideo = async(req,res)=>{
    return new Promise(async(resolve,reject) => {
        const diskStorage = multer.diskStorage({
                destination: (req, file, callback) => {
                    callback(null, "uploads")
                },
                filename: (req, file, callback) => {
                    const math = ["image/png", "image/jpeg","video/mp4"]
                    if (math.indexOf(file.mimetype) === -1) {
                        return callback(null)
                    }
                    const date =`${Date.now()}`
                    const filename = `${date.slice(0,9)}${file.originalname}`
                    callback(null, filename)
                }
        })
        const uploadFile = multer({storage: diskStorage}).single("file")
        uploadFile(req, res, (err) => {
            try {
                if(err){
                    return err
                }
                if(req.file){
                    resolve (`${process.env.URL_SERVER}/uploads/${req.file.filename}`)
                }else{
                    resolve(null)
                }
            } catch (error) {
                reject(error)
            }
        })
    })

}
const loginUser = async(req,res)=>{
    const {username,password}=req.body
        if (!username){
            const status = "Vui lòng điền tài khoản hoặc mật khẩu"
            return status
        }
        try {
            const port=process.env.URL_CLIENT
            const user = await User.findOne({ username })
            if(user.username===username && user.password===password) {
                res.redirect(`${port}/content`)
            }else{
                res.redirect(`${port}/login`)
            }
        } catch (err) {
            const status =`Lỗi:.....:${err}`
            return status
        }

}




const getAllMsg = async()=>{
    return new Promise(async(resolve,reject) => {
        try {
            const msg= await Msg.find()
            resolve(msg)
        } catch (err) {
            reject(err)
        }
    })
}
const getAllUser = async()=>{
    return new Promise(async(resolve,reject) => {
        try {
            const user= await User.find()
            resolve(user)
        } catch (err) {
            reject(err)
        }
    })
}
const getAllFilm = async()=>{
    return new Promise(async(resolve,reject) => {
        try {
            const film= await Film.find()
            resolve(film)
        } catch (err) {
            reject(err)
        }
    })
}


const deleteUser = async(req,res)=>{
    return new Promise(async(resolve,reject) => {
        try {
            const user = req.params.username
            await User.deleteOne({ username:user })
            const userOld= await User.find()
            resolve(userOld)
        } catch (err) {
            reject(err)
        }
    })
}
const deleteMes = async(req,res)=>{
    return new Promise(async(resolve,reject) => {
        try {
            const id = req.params.id
            await Msg.deleteOne({ id:id })
            const data= await Msg.find()
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports={
    createNewUser:createNewUser,
    createNewFilm:createNewFilm,
    createVideo:createVideo,
    getAllMsg:getAllMsg,
    getAllFilm:getAllFilm,
    getAllUser:getAllUser,
    loginUser:loginUser,
    deleteUser:deleteUser,
    deleteMes:deleteMes
}