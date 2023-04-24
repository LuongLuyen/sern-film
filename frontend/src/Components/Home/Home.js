import bgVideo from '../../assets/video/v1.mp4'
import imgTrailer from '../../assets/img/trailer.jpg'
import { Link } from 'react-router-dom'
import './Home.css'
function Home() {
    return ( 
        <div className='home'>
            <video className='home_trailer'
            autoPlay loop muted
            src={bgVideo} type='video/mp4'
            />
            <div className='wrap'>
                <div className='home_wrap'>
                    <div>
                        <h1>HOME</h1>
                    </div>
                </div>
                <div className='home_content'>
                    <h1>Trailer Film</h1>
                </div>
                <div className='home_item'>
                    <p className='home_item-list'>
                    Chào mừng bạn quay lại!
                    </p>
                    <p className='home_item-list'>
                    Chương trình truyền hình, phim không giới hạn và nhiều nội dung khác.
                    </p>
                    <p className='home_item-list'>
                    Xem ở mọi nơi. Hủy bất kỳ lúc nào.
                    </p>
                    <div className='home_button'>
                        <Link className='home-to-content' to='/login'>XEM NGAY</Link>
                    </div>
                </div>
                <div>
                    <Link className='trailer_wrap' to='/login'>
                        <img className='trailer_item' src={imgTrailer} alt='/'/>
                        <img className='trailer_item' src={imgTrailer} alt='/'/>
                        <img className='trailer_item' src={imgTrailer} alt='/'/>
                        <img className='trailer_item' src={imgTrailer} alt='/'/>
                        <img className='trailer_item' src={imgTrailer} alt='/'/>
                        <img className='trailer_item' src={imgTrailer} alt='/'/>
                        <img className='trailer_item' src={imgTrailer} alt='/'/>
                    </Link>
                </div>
            </div>
        </div>
     );
}

export default Home;