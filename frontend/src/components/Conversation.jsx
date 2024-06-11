import React from 'react'
import Conversatio from './sidebar/Conversatio'
import useGetConversations from '../hooks/useGetConversations'

const Conversation = () => {
  const  { loading, conversations } = useGetConversations();
  console.log("CONVERSATIONS:", conversations)
  return (
    <div>
      <div className='py-2 flex flex-col h-96 overflow-auto'>
        {conversations.map((conversation, idx) => (
          <Conversatio key={conversation.id}
          conversation={conversation}
          lastIdex={idx === conversations.length - 1 }
           />
        ))}
        {loading ? <span className='loading loading-spinner mx-auto'></span> : null }
      </div>
    </div>
  )
}

export default Conversation
