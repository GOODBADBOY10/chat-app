import { createContext, useContext, useState } from "react";



export const Authcontext = createContext();



export const useAuthContext = () => {
    return useContext(Authcontext);
}



export const AuthcontextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem('chap-user')) || null)

    return <Authcontext.Provider value={{authUser, setAuthUser}}>
        {children}
        </Authcontext.Provider>
};