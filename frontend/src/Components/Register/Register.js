// chung css vs trang login
import { Link } from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'
import '../Login/Login.css'
function Register() {
    const [data, setData] = useState([])
    const [check, setCheck] = useState(false)
    const [username,setName]=useState('')
    const [password,setPass]=useState('')
    const url=process.env.REACT_APP_URL_REGISTER
    const handleSubmit =()=>{
            setCheck(true)
        axios.post(url, {username,password})
        .then((res)=>{
            setData(res.data)
            setCheck(false)
        })
        .catch((err)=>{
        console.log(err)
        })
    }
    return ( 
        <div className='login'>
            <div className='header_home'>
                <h1>Phim BờRồ</h1>
            </div>
            <div className='login_title'>
                <h1>Đăng ký</h1>
            </div>
            <div>
                <div>
                    <div className='login_wrap'>
                        <label className='login_name'>Tên đăng ký</label>
                        <input
                        className='login_input'
                        value={username}
                        onChange={e=> setName(e.target.value)}
                        type='text'
                        placeholder='Username'
                        />
                    </div>
                    <div className='login_wrap'>
                        <label className='login_name'>Mật Khẩu</label>
                        <input
                        className='login_input'
                        value={password}
                        onChange={e=> setPass(e.target.value)}
                        type='password'
                        placeholder='Password'
                        />
                    </div>
                    <div>
                        <span className='login_check'>Tên tài khoản từ 6 đến 20 kí tự.</span>
                        <span className='login_check'>Tên mật khẩu từ 6 đến 20 kí tự.</span>
                        <span className={`${check? 'login_check-status1':'no_film'}`}>Người dùng đã tồn tại Hoặc chưa điền TK,MK.</span>
                        <span className={`${!check? 'login_check-status2':'no_film'}`}>Tài khoản đăng ký là: {data.username}</span>
                        <span className={`${!check? 'login_check-status2':'no_film'}`}>Mật khẩu đăng ký là: {data.password}</span>
                    </div>
                    <div className='login_submit'>
                        <div onClick={handleSubmit} className='login_button'>Đăng ký</div>
                    </div>
                    <div className='login__1'>
                        <span>Ghi nhớ tôi</span>
                        <span>Bạn cần trợ giúp ?</span>
                    </div>
                    <div className='login__2'>
                        <span>Bạn đã có tài khoản Film Bờ Rồ</span>
                        <Link  to='/login'>
                            <button>Đăng nhập</button>
                        </Link>
                    </div>
                    <div className='login__2'>
                        Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là robot. Tìm hiểu thêm.
                    </div>
                </div>
            </div>
        </div>
     );
}

export default Register;