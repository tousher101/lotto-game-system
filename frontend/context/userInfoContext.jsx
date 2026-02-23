"use client"


import { createContext,useContext,useEffect,useState } from "react";
import fatchWithAuth from '../utils/fetchWithAuth'
import fetchWithAuth from "../utils/fetchWithAuth";
const BASEURL=process.env.NEXT_PUBLIC_API_URI;

const UserInfoContext=createContext();
export const UserProvider=({children})=>{
const [userInfo,setUserInfo]=useState(null);
const getAllUser= async()=>{
    const res= await fetchWithAuth(`${BASEURL}/api/auth/alluserdata`)
   
    setUserInfo(res)
    
};
useEffect(()=>{
    getAllUser()
},[]);
return(<UserInfoContext.Provider value={{userInfo,setUserInfo,getAllUser}}>{children}</UserInfoContext.Provider>)
};
export const useUserInfo=()=>useContext(UserInfoContext)