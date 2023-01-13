import React, {useEffect, useState} from 'react'
import {io} from 'socket.io-client';
const socket = io.connect('http://localhost:3001'); //connect to our server, get individual socket

const Chat = () => {
const [message, setMessage] = useState('')
const [receivedMessage, setReceivedMessage] = useState({})
const [allMessages, setAllMessages] = useState([])
useEffect(() => {
 socket.on('send_message_to_client_from_server',(data)=>{
    console.log(data)
    setReceivedMessage(data)
 })
}, [socket])
useEffect(() => {
    setAllMessages(allMessages.concat(receivedMessage))
    console.log(allMessages)
}, [receivedMessage])


const sendMessage = () => {
    socket.emit('send_message',{message}) //send a message to back-end, after receiving the message, the back will send it to the client
}

return (
<div>
    <input placeholder='message...' onChange={e=>setMessage(e.target.value)}/>
    <button onClick={sendMessage}>Send</button>
    <div>Received messages: 
        {allMessages.length > 0 ? allMessages.map((message)=>{
    return <><p>id:{message.id} </p><p>message: {message.message}</p></>
    }) :null}
    
    </div>
</div>
)
}

export default Chat