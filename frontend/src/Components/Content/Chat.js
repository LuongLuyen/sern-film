import React, { useState, useEffect, useRef } from "react"
import socketIOClient from "socket.io-client"
import axios from 'axios'
import Notice from './Notice'
import './Chat.css'
const host = process.env.REACT_APP_URL_SERVER


function Chat() {
  const [notice,setNotice]=useState(false)
  const [mess, setMess] = useState([])
  const [message, setMessage] = useState('')
  const [idchat, setIdchat] = useState('')
  const socketRef = useRef()
  const messagesEnd = useRef()
  
  const [items, setItems] = useState([])


  const callbackFunction1 = (newMes) => {
    setMess(newMes) 
    setNotice(false)
  }
  const callbackFunction2 = () => {
    setNotice(false)
  }
  //get api
  useEffect(() => {
      axios.get(process.env.REACT_APP_URL_MSG)
      .then((response) => {
          setMess(response.data)
      })
  }, []) 
    
    // get data localstorage
    useEffect(() => {
      const items = JSON.parse(sessionStorage.getItem('items'))
      if (items) {
       setItems(items)
      }
    }, [])

    useEffect(() => {
      socketRef.current = socketIOClient.connect(host)
      socketRef.current.on('sendDataServer', dataGot => {
        setMess(oldMsgs => [...oldMsgs, dataGot.data])
        scrollToBottom()
      })
      return () => {
        socketRef.current.disconnect()
      }
    }, [])

    const sendMessage = () => {
      if(message !== null) {
        const msg = {
          id:Math.round(Math.random()*(10**10)),
          sender:items,
          content: message
        }
        socketRef.current.emit('sendDataClient', msg)
        setMessage('')
      }
    }

    const scrollToBottom = () => {
      messagesEnd.current.scrollIntoView({ behavior: "smooth" })
    }
    const handleChange = (e) => {
      setMessage(e.target.value)
    }

    const onEnterPress = (e) => {
      if(e.keyCode === 13 && e.shiftKey === false) {
        sendMessage()
      }
    }

    const filterId = (id)=>{
      setIdchat(
          mess.filter((item) => {
              return item.id === id
          })
      )
   }

    return (
      <div className="chat box-chat">
        <div className="box-chat_message">
        {mess.map((m, index) =>(
          <div key={index} className={`${m.sender===items? 'your-message' : 'other-people'} chat-item`}>
            <span className="chat_user">
              {m.sender}
            </span>
            <div className={`${m.sender===items? 'chat_your':'chat_other'}`} >
              {m.content}
            </div>
            <span 
              onClick={()=>filterId(m.id)}
              >
              <span 
              onClick={()=>setNotice(!false)}
              className={`${m.sender===items? 'chat_delete':'chat_nodelete'}`}
              >
                ⊕
              </span>
              <div style={{ float:"left", clear: "both" }}
                ref={messagesEnd}>
              </div>
            </span>
          </div>
        ))}
      </div>
      <div className="send-box">
        <textarea 
          onClick={()=>setNotice(false)}
          value={message}  
          onKeyDown={onEnterPress}
          onChange={handleChange} 
          placeholder="Nhập tin nhắn ..." 
        />
          <button className="chat_send" onClick={sendMessage}>
            Send
          </button>
        </div>
        <div>
          {notice && <Notice value={[idchat,callbackFunction1,callbackFunction2]}/>}
        </div>
      </div>
    )
  }

export default Chat;