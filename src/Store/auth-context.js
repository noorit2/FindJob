import React,{useState,useEffect,useCallback} from "react";
import {onAuthStateChanged,signOut,signInWithCustomToken }from 'firebase/auth'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { auth } from "../config/fire";
const AuthContext=React.createContext({
    isLoggedIn:false,
    setIsLoggedIn:(loggedIn)=>{},
    onLogout:()=>{},
    profile:{
      profileType:'',
      picture:'',
    },
    
    loginHandler:(profile)=>{},
    setProfile:()=>{},
    
});
export const AuthContextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profile,setProfile]=useState({});
 
    useEffect(()=>{
   
        const storedData=localStorage.getItem('IsLoggedIn');
        if(storedData==='1'){
          setIsLoggedIn(true);
          const uid=localStorage.getItem('profile');
          setProfile(JSON.parse(storedProfile));
        }      
    },[])
  
    const loginHandler = (profile) => {
      if(Object.keys(profile).length < 1){
        const storedProfile=localStorage.getItem('profile');
          setProfile(JSON.parse(storedProfile));
        return;
      }
        localStorage.setItem('IsLoggedIn','1');
        localStorage.setItem('profile',JSON.stringify(profile));
        setIsLoggedIn(true);
        setProfile(profile);
      };
    useEffect(()=>{
      localStorage.setItem('profile',JSON.stringify(profile));
     
    },[profile])
      const logoutHandler = async() => {
        await signOut(auth);
        localStorage.removeItem('IsLoggedIn');
        localStorage.removeItem('profile');
        setProfile({});
        setIsLoggedIn(false);
      };
    return(<AuthContext.Provider value={{
        onLogin:loginHandler,
        onLogout:logoutHandler,
        isLoggedIn:isLoggedIn,
        profile:profile,
        setProfile:setProfile
    }}
    > {props.children}</AuthContext.Provider>);
}
export default AuthContext;