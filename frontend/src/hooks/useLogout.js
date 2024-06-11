import React, { useState } from 'react'
import { useAuthContext } from '../context/Authcontext'

const useLogout = () => {
  const [loading, setLoading] = useState(false)
  const {authUser, setAuthUser } = useAuthContext();


  const logout = async () => {
    setLoading(true)
    try {
        const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json()

        if(data.error) {
            throw new Error(data.error)
           }
    
        //    save to local storage
        localStorage.removeItem('chat-user')
    
    
        // context value 
        setAuthUser(null);
        
    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  }

  return { loading, logout }
}

export default useLogout
