"use client"
import Image from "next/image"
import pcsoLogo from '../public/stl-logo.png'
import userLogo from '../public/user.png'
import UserProfileModal from "./userProfileModal"
import { useState } from "react"
import Alert from "../utils/Alert"
import { useRouter } from "next/navigation"
import { useUserInfo } from "../context/userInfoContext"

export default function NavBar(){
    const [openModal, setOpenModal]=useState(false);
    const [msg,setMsg]=useState(null);
    const [type,setType]=useState(null);
    const BASEURL=process.env.NEXT_PUBLIC_API_URI
    const router=useRouter();
    const {userInfo,getAllUser}=useUserInfo();

    const goHome=()=>{
        router.push('/')
    }

    const logOut=async()=>{
        try{
            const res= await fetch(`${BASEURL}/api/auth/logout`,{
                method:'POST',
                credentials:'include',
                headers:{
                    'Content-Type':'application/json'
                }
            });
            const data=await res.json();
            if(res.ok){setMsg(data.message);setType('Success'); getAllUser(); localStorage.removeItem('token'); setTimeout(()=>{
                goHome()}),200} else{throw new Error(data.msg||data.message)}
        }catch(err){console.error(err); setMsg(err.message);setType('Error')};

        setOpenModal(false);
    }

    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
     <nav className="max-w-[1380px] mx-auto h-[70px]  flex bg-[#30364F] justify-between items-center relative z-50">
        <div className="flex items-center justify-center">
        <Image src={pcsoLogo} className="h-[60px] w-[60px] ml-[10px]" alt="stl-logo"/>
        <h1 className="text-2xl font-bold text-white mx-[20px] ">STL-Lotto Corporation</h1>
        </div>

        {userInfo&&<div onClick={()=>{setOpenModal(true)}}>
            <Image src={userLogo} className="h-[40px] w-[40px] mr-[10px] cursor-pointer " alt="user-logo" />
        </div>}
        
       
     </nav>

     {openModal&&<UserProfileModal cancelModal={()=>{setOpenModal(false)}} logOut={()=>{logOut()}} />}
     </>
    )
}