import React, { useState } from 'react'
import { IoSearchSharp } from 'react-icons/io5'
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../hooks/useGetConversations'
import toast from 'react-hot-toast'

const Searchinput = () => {
  const [search, setSearch] = useState('')
  const { setSelectedConversation } = useConversation();
  const { conversations } =useGetConversations();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!search) {
      return;
    }
    if(search.length < 3) {
      return toast.error('search term must be at least 3 characters long')
    }

    const conversation = conversations.find((e) => e.fullName.toLowerCase().includes(search.toLocaleLowerCase()) )


    if(conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    } else {
      toast.error(`No such user found with ${search}`);
    }
  }
  return (
    <div>
      <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type='text' placeholder='search...'
         className='input input-bordered rounded-full'
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         />
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <IoSearchSharp className='w-6 h-6 outline-none' />
        </button>
      </form>
    </div>
  )
}

export default Searchinput
