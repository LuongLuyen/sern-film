import { useRef, useState} from 'react'
import Video from './Contentvideo'
import Chat from './Chat'
import Profile from './Profile'
import { Link } from 'react-router-dom'
import './Content.css'
function Content(props) {
    const data =props.props
    console.log(data)
    
    const [show,setShow] =useState(false)
    const [showChat,setShowChat] =useState(false)
    const [showProfile,setProfile] =useState(false)

    const [product,setProduct] = useState(data)
    const [video,setVideo] = useState(data)
    const [inputText, setInputText] = useState("")
    const [check, setCheck] = useState(false)

    //thanh search
    const inputHandler = (e) => {
        const lowerCase = e.target.value.toLowerCase()
        setInputText(lowerCase)
    }
    const filterData = data.filter((prevData) => {   
        if (inputText === '') {
            return prevData
        }
        else {
            return prevData.name.toLowerCase().includes(inputText)
        }
    })

    const handleSearch = ()=>{
        setProduct(filterData)
    }
    const handleEnter= (e)=>{
        if(e.keyCode===13){
            handleSearch()
            setCheck(false)
        }
    }

    //scrollTop
    const refTop = useRef(null)
    const handleClick = ()=>{
        refTop.current?.scrollIntoView({behavior: 'smooth'})
    }

    //filter film
    const filterFilm = (type)=>{
        setProduct(
            data.filter((item) => {
                return item.type === type
            })
        )
    }
    //filter search
    const filter = (_id)=>{
        setProduct(
            data.filter((item) => {
                return item._id === _id
            })
        )
    }
  

    // play content video
    const filterVideo = (_id)=>{
        console.log(_id)
        setVideo(
            data.filter((item) => {
                return item._id === _id
            })
        )
    }

    //mount content video
    const mountVideo=()=>{
        setShow(()=>{
            return true
        })
    }
    const handleLoad=()=>{
        setShow(false)
        setShowChat(false)
        setProfile(false)
        setCheck(false)
        setProduct(data)
    }

    return ( 
        <div ref={refTop} className='app'>
            <div 
            onClick={()=>setShowChat(false)}
            className='header'>
                <div
                 className='header_home'>
                    <Link 
                    onClick={handleLoad}
                    className='header_title' to='../content'>
                        Phim BờRồ
                    </Link>
                    <div className='header_user'>
                        <span className='header_notice'>Thông báo</span>
                        <span className='header_notice'>Trợ giúp</span>
                        <span
                        onClick={()=>setProfile(!showProfile)}
                        className='profile-button'>
                            Hồ sơ
                        </span>
                    </div>
                </div>
                <div
                onClick={()=>setProfile(false)}
                 className='header_search'>
                    <input
                    onClick={()=>setCheck(!check)}
                    className='header_search-input'
                    type = 'text'
                    placeholder='Tìm kiếm'
                    onChange={inputHandler} 
                    onKeyDown={handleEnter}
                    />
                </div>
                <div className='header_category'>
                    <div className='header_list'>
                        <button onClick={()=>filterFilm('hanhdong')} className='header_list-item'>Hành động</button>
                        <button onClick={()=>filterFilm('phieuluu')} className='header_list-item'>Phiêu lưu</button>
                        <button onClick={()=>filterFilm('hoathinh')} className='header_list-item'>Hoạt hình</button>
                        <button onClick={()=>filterFilm('kungfu')} className='header_list-item'>Kungfu</button>
                        <button onClick={()=>filterFilm('kinhdi')} className='header_list-item'>Kinh dị</button>
                    </div>
                </div>
            </div>
            <div
                onClick={()=>setProfile(false)}>
                <div 
                onClick={()=>setShowChat(false)}
                className='product'>
                    {show && <Video value={video}/>}
                    <div onClick={handleClick} className='product_wrap'>
                        {product.map((item,index) =>(
                            <div 
                            key={index}
                            onClick={()=>filterVideo(item._id)}
                            className='product_film'>
                                <img 
                                onClick={()=>mountVideo()} 
                                className='product_img' 
                                src={item.img} 
                                alt={item.type}
                                />
                                <div className='product_item'>
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showProfile && <Profile/>}
            {showChat && <Chat value ={showChat}/>}
            <div className='messenger'
                onClick={()=>setShowChat(!showChat)}>
                    Chat
            </div>
            <div 
            onClick={()=>setCheck(false)}
            className={`${check? 'search':'no_search'}`}>
            {filterData.map((item,index) =>(
                <div 
                onClick={()=>filter(item._id)}
                className='search_content'
                key ={index}>
                    {item.name}
                </div>
            ))}
            </div>
        </div>
    )
}


export default Content;