import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/Authcontext';

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const {authUser, setAuthUser } = useAuthContext()

  const signup = async ({fullName, username, email, password, confirmPassword, gender}) => {
    const sucess = handleInputErrors({fullName, username, email, password, confirmPassword, gender})

    if(!sucess) return;
    setLoading(true);

    try {
       const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({fullName, username, email, password, confirmPassword, gender})
       })  

       const data = await res.json();
       if(data.error) {
        throw new Error(data.error)
       }

    //    save to local storage
    localStorage.setItem('chat-user', JSON.stringify(data))


    // context value 
    setAuthUser(data);

    } catch (error) {
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  };

  return { loading, signup }
};

export default useSignup


function handleInputErrors({fullName, username, email, password, confirmPassword, gender}) {
    if(!fullName || !username || !email || !password || !confirmPassword || !gender) {
        toast.error('please fill in all fields');
        return false
    }


    if(password !== confirmPassword ) {
        toast.error('Password do not match');
        return false
    }

    if(password.length < 6 ) {
        toast.error('Password must be at least 6 characters')
        return false
    }

    return true;
}
