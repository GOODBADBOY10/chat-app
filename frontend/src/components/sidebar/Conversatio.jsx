import React from 'react'
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import useConversation from '../../zustand/useConversation';


const Conversatio = ({conversation, lastIdx}) => {
    const {selectedConversation, setSelectedConversation } = useConversation();
  
    const isSelected = selectedConversation?._id === conversation._id;

    return (
        <>
          <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer
          ${isSelected ? "bg-green-700" : '' }
          `}
          onClick={() => setSelectedConversation(conversation)}
          >
            <div className='avatar'>
                <div className='w-12 rounded-full'>
                    <img
                    src={conversation.profilePic} alt='user avatar'
                    />
    
                </div>
            </div>
    
            <div className='flex flex-col flex-1'>
                <div className='flex gap-3 justify-between'>
                    <p className='font-bold text-gray-200'>{conversation.fullName}</p>
                    <span className='text-xl'>
                    {/* <Emoji unified="1f423" size="25" /> */}
                    &#128075;
                      </span>
                </div>
            </div>
          </div>
          {!lastIdx && <div className='divider my-0 py-0 h-1'></div> }
        </>
      )
    }
    
    export default Conversatio
    