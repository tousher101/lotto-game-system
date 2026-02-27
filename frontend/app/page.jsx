"use client"
import Image from "next/image"
import stlLogo from '../public/stl-logo.png'
import Link from "next/link";
import visiableEye from '../public/visibility.png'
import notVisiableEye from '../public/eye.png'
import { useEffect, useState } from "react";
import Alert from "../utils/Alert";
import { useUserInfo } from "../context/userInfoContext";
import { useRouter } from "next/navigation";

export default function Loging(){
  const [openEye,setOpenEye]=useState('hidden');
  const [closeEye,setCloseEye]=useState('block');
  const [showPass,setShowPass]=useState('password');
  const [msg,setMsg]=useState(null);
  const [type,setType]=useState(null);
  const BASEURI=process.env.NEXT_PUBLIC_API_URI;
  const [userName, setUserName]=useState('');
  const [password, setPassword]=useState('');
  const {getAllUser,userInfo}=useUserInfo();
  const router=useRouter()

  const handleShowPass=()=>{
    if(openEye==='hidden'){setCloseEye('hidden'); setOpenEye('block'); setShowPass('text')} else{setOpenEye('hidden'); setCloseEye('block'); setShowPass('password')}
  };



  const login=async()=>{
    try{
      const res= await fetch(`${BASEURI}/api/auth/login`,{
        method:'POST',
        credentials:'include',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({userName,password})
      });
      const data= await res.json();
      
      
      if(res.ok){
        setMsg(data.message);setType('Success'); sessionStorage.setItem('token',data.result.accessToken)
        ;sessionStorage.setItem('role',data.result.payload.role);getAllUser()
        if(data.result.payload.role==='ADMIN'){window.location.href=('/admindashboard')}
        if(data.result.payload.role==='OPARETOR'){window.location.href=('/oparetordashboard')}
        if(data.result.payload.role==='HEAD_CASHIER'){window.location.href=('/head-cashierdashboard')}
        if(data.result.payload.role==='CASHIER'){window.location.href=('/cashierdashboard')}
      } else{throw new Error(data.message||data.msg||'Something Went Wrong')}
    } catch(err){console.error(err);setMsg(err.message);setType('Error')}
  };

  const handleLogin=(e)=>{
    e.preventDefault();
    login();
    setPassword(''); setUserName('')
  }

    useEffect(()=>{
const role= sessionStorage.getItem('role');
const token= sessionStorage.getItem('token')
if(token&&role){
  if(role==='ADMIN'){router.replace('/admindashboard');}
  else if(role==='OPARETOR'){router.replace('/oparetordashboard');}
  else if(role==='HEAD_CASHIER'){router.replace('/head-cashierdashboard');}
  else if (role==='CASHIER'){router.replace('/cashierdashboard')}
}
  },[])


  return(
    <>
    {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
    <div className=" max-w-[1380px] mx-auto overflow-hidden ">
      <div className="grid grid-cols-1  justify-items-center  mt-[100px] ">
        <div className="flex border-1 border-gray-500 shadow-2xl rounded-2xl w-[700px] overflow-hidden">
          <div className=" flex flex-[50%] bg-[#25343F] justify-center items-center  ">
          <Image src={stlLogo} className="h-[100px] w-[100px]" alt="stl-logo"/>
          <h1 className="text-white text-4xl font-bold ml-[15px]">STL</h1>
          </div>
          <form onSubmit={handleLogin} className="flex-[50%] grid justify-items-center p-10 gap-2">
            <h1 className="text-3xl font-bold">Login to STL</h1>
            <h2 className=" ">Please enter your username and password</h2>
            <input required value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="Username" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
            <div className="flex items-center relative w-full">
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type={`${showPass}`} placeholder="Password" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
                <div onClick={handleShowPass}>
                <Image src={visiableEye} className={`h-[20px] w-[20px]  absolute top-3 right-2 cursor-pointer ${openEye}`} alt="open-eye-logo"/>
                <Image src={notVisiableEye} className={`h-[20px] w-[20px] absolute top-3 right-2 cursor-pointer ${closeEye}`} alt="close-eye-logo"/>
                </div>
            </div>
            
            
            <Link href="/forgetpassword"><h1>Forget Password?</h1></Link>
            
            
            <button type="submit" className=" h-[40px] w-full   rounded-md text-white bg-[#25343F] cursor-pointer ">Login</button>

          </form>

        </div>
      </div>
    </div>
    </>

  )
}