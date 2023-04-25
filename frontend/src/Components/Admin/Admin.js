import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import './Admin.css'
function Admin() {
    const [data, setData] = useState()
    console.log(data)
    const [user, setUser] = useState([])
    const [check, setCheck] = useState(false)
    const deleteUser = () => {
        console.log(user)
        axios.delete(`${process.env.REACT_APP_URL_SERVER}/api/posts/delete-user/${user[0].username}`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
        setCheck(false)
    }
    useEffect(() => {
        axios.get(process.env.REACT_APP_URL_USER)
            .then((response) => {
                setData(response.data)
            })
    }, [])

    const filter = (_id) => {
        setUser(
            data.filter((item) => {
                return item._id === _id
            })
        )
        setCheck(true)
    }
    return (
        <div className='admin'>
            <Link
                className='admin_title1' to='../content'>
                Phim BờRồ
            </Link>
            <div className='admin_title'>Quản lý người dùng</div>
            <div>
                <table
                    className="admin_table"
                    border="1">
                    <tbody>
                        <tr >
                            <th>Username</th>
                            <th>Password</th>
                            <th>Sữa</th>
                            <th>Xóa</th>
                        </tr>
                        {data && data.map((item, index) => (
                            <tr key={index} >
                                <th>{item.username}</th>
                                <th>{item.password}</th>
                                <th>✎</th>
                                <th
                                    onClick={() => filter(item._id)}>
                                    ✘
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className={`${check ? 'admin_notice' : 'no_film'}`}>
                    <div className='admin_lb'
                        onClick={() => setCheck(false)}>✘</div>
                    <h1 className='admin_title'>Bạn muốn xóa người dùng này ?</h1>
                    <div
                        className='admin_button'>
                        <span
                            onClick={deleteUser}
                            className='admin_y'>Có</span>
                        <span className='admin_n'>Không</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;