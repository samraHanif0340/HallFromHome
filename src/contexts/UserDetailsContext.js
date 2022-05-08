import { createContext,useState,React } from "react";

const UserDetailContext = createContext()

const UserDetailProvider = ({children}) => {
    const [user, setUser] = useState({name:'Samra Hanif Context'})

    const modifyUser = (value) => {
        setUser((prevState) => [...prevState,{newValue:value}])
    }

    return(
        <UserDetailContext.Provider value={{user}}>
            {children}
        </UserDetailContext.Provider>
    )
   
}

export {UserDetailProvider}