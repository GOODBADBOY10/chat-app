import React from 'react'
import useConversation from '../../zustand/useConversation';
import { useAuthContext } from '../../context/Authcontext';
import { extractTime } from '../../utils/extraTime';

const Message = ({message}) => {
  const {authUser} = useAuthContext();

  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id

  const chatClassname = fromMe ? 'chat-end' : 'chat-start';

  const formattedTime = extractTime(message.createdAt);

  const profilePic = fromMe ? authUser.profilePic : selectedConversation.profilePic;

  const bubbleBgColor = fromMe ? 'bg-blue-500' : '';

  const shakeClass = message.shouldShake ? "shake" : "" 


  return (
    <>
      <div className={`chat ${chatClassname}`}>
        <div className='chat-image avatar'>
            <div className='w-10 rounded-full'>
                <img
                src={profilePic} alt='Tailwind css chat bubble'
                />
            </div>
        </div>
        <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
      </div>
    </>
  )
}

export default Message
