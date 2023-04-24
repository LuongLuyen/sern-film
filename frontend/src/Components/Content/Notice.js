import axios from 'axios'
import './Notice.css'
function Notice(props) {
    const dataId=props.value[0]
    console.log(dataId[0].id)
    const dataCb1=props.value[1]
    const dataCb2=props.value[2]
    const handleDelete=()=>{
        axios.delete(`${process.env.REACT_APP_URL_SERVER}/api/posts/delete-mes/${dataId[0].id}`)
        .then(res => {
            dataCb1(res.data)
        }) 
    }
    return ( 
        <div className='notice'>
            <h1 className='notice_title'>Bạn muốn thu hồi ?</h1>
            <div
             className='notice_button'>
                <span className='notice_y'
                 onClick={handleDelete}
                >Có</span>
                <span className='notice_n'
                onClick={()=>{dataCb2()}}
                >Không</span>
            </div>
        </div>
    );
}

export default Notice;