import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import Messageskeleton from '../skeleton/Messageskeleton';


const Messages = () => {
  const { messages, loading } = useGetMessages();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: 'smooth'} );
    }, 100)
  },[messages])
  return (
    <div>
      <div className='px-4 flex-1 overflow-auto h-96'>
        {!loading && messages.length > 0 
        && messages.map((message) => (
          <div key={message._id}
          ref={lastMessageRef}
          >
            <Message message={message} />
          </div>
        )) }
        {loading && [...Array(3)].map((_, idx) => <Messageskeleton key={idx} /> )}

        {!loading && messages.length === 0 && (
          <p className='text-center'>Send a message to start the Conversation</p>
        )}
      </div>
    </div>
  )
}

export default Messages
