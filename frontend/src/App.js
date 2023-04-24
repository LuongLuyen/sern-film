import Home from './Components/Home/Home.js'
import Content from './Components/Content/Content.js'
import Login from './Components/Login/Login.js'
import Register from './Components/Register/Register.js'
import Upload from './Components/Upload/Upload.js'
import Admin from './Components/Admin/Admin.js'
import{
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import {useEffect,useState} from 'react'
import axios from 'axios'


function App() {
  const [items, setItems] = useState([])
  const [data, setData] = useState(null)
  const [users, setUsers] = useState(null)
  useEffect(() => {
    const items = JSON.parse(sessionStorage.getItem('items'))
    if (items) {
     setItems(items)
    }
  }, [])
  //get api
  useEffect(() => {
      axios.get(process.env.REACT_APP_URL_DATA)
      .then((response) => {
          setData(response.data)
      })
  }, []) 
  useEffect(() => {
      axios.get(process.env.REACT_APP_URL_USERS)
      .then((response) => {
          setUsers(response.data)
      })
  }, []) 
  if (!data) return null
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/content' element={items[0] ? <Content props={data}/> : <Login/>}/>
        <Route path='/admin' element={items==='admin123' ? <Admin props={users}/> : <Content/>}/>
        <Route path='/upload' element= {items[0] ? <Upload/>:<Login/>}/>
      </Routes>
    </Router>
  );
}

export default App;
