import React, { useState } from 'react'
import {BsSend} from 'react-icons/bs'
import useSendMessage from '../../hooks/useSendMessage'

const Messageinput = () => {
  const [message, setMessage] = useState('')

  const { sendMessage, loading } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!message) {
      return
    }
    await sendMessage(message);
    setMessage('');
  }
  return (
    <div>
      <form className='px-4 my-3' onSubmit={handleSubmit}>
        <div className='w-full relative'>
            <input type='text'
             className='border text-sm rounded-lg block w-full p-2.5
              bg-gray-700 border-gray-600 text-white'
              placeholder='send a message'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
               />
            <button type='submit' className='absolute inset-y-0 end-0 flex items-center pe-3'>
              {loading ?
               <div className='loading loading-spinner'></div>
                :
                <BsSend />
              }
            </button>
        </div>
      </form>
    </div>
  )
}

export default Messageinput
