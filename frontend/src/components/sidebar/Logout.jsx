import React from 'react'
import {FaSignOutAlt} from 'react-icons/fa'
import useLogout from '../../hooks/useLogout'

const Logout = () => {
  const { loading, logout } = useLogout();
  return (
    <>
      <div className='mt-auto'>
        {!loading ? (
          <FaSignOutAlt className='w-6 h-6 text-white cursor-pointer'
          onClick={logout}
           />
        ) : (
          <span className='loading loading-spinner'></span>
        ) }
      </div>
    </>
  )
}

export default Logout
