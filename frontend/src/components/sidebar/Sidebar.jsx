import React from 'react'
import Conversation from '../Conversation'
import Logout from './Logout'
import Searchinput from './Searchinput'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <Searchinput />

      <div className='divider px-3'></div>
      <Conversation />
      
      <Logout />
    </div>
  )
}

export default Sidebar
