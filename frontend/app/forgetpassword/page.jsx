"use client"
import Image from "next/image"
import stlLogo from '../../public/stl-logo.png'
import { useState } from "react"
import Alert from '../../utils/Alert'
import { useRouter } from "next/navigation"
import visiableEye from '../../public/visibility.png'
import notVisiableEye from '../../public/eye.png'


export default function ForgetPassword(){
const BASEURL=process.env.NEXT_PUBLIC_API_URI
const [userName, setUserName]=useState('');
const [newPassword,setNewPassword]=useState('');
const [confirmPass,setConfirmPass]=useState('');
const [msg,setMsg]=useState(null);
const [type,setType]=useState(null);
const router=useRouter();
const [openEye,setOpenEye]=useState('hidden')
const [closeEye,setCloseEye]=useState('block')
const [showPass,setShowPass]=useState('password')

const goSignin=()=>{
  router.push('/')
};

 const handleShowPass=()=>{
    if(openEye==='hidden'){setCloseEye('hidden'); setOpenEye('block'); setShowPass('text')} else{setOpenEye('hidden'); setCloseEye('block'); setShowPass('password')}
  }

const forgetUserPassword=async()=>{
  try{
    const res= await fetch(`${BASEURL}/api/auth/userforgetpassword`,{
      method:'PUT',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({userName,newPassword})
    });
    const data= await res.json();
    if(res.ok){setMsg(data.message);setType('Success'); setTimeout(()=>{
      goSignin()
    },2000)
    }
    else{throw new Error(data.msg)}
  }catch(err){console.error(err);setMsg(err.message);setType('Error')}
};

const handleSubmit=(e)=>{
  e.preventDefault();
  if(newPassword !== confirmPass){setMsg('Password Not Matched');setType('Error');return}
  forgetUserPassword();

};




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
          <form onSubmit={handleSubmit} className="flex-[50%] grid justify-items-center p-10 gap-2">
            <h1 className="text-3xl font-bold">Forget Password</h1>
            <h2 className=" ">Enter Your User Name For Reset Password!</h2>
            <input required value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="Username" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
             <div className="flex items-center relative w-full">
                <input  value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} required type={`${showPass}`} placeholder="Password" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
                <div onClick={handleShowPass}>
                <Image src={visiableEye} className={`h-[20px] w-[20px]  absolute top-3 right-2 cursor-pointer ${openEye}`} alt="open-eye"/>
                <Image src={notVisiableEye} className={`h-[20px] w-[20px] absolute top-3 right-2 cursor-pointer ${closeEye}`} alt="close-eye"/>
                </div>
                </div>
             <div className="flex items-center relative w-full">
                <input required value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}}  type={`${showPass}`} placeholder="Confiem Password" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
                <div onClick={handleShowPass}>
                <Image src={visiableEye} className={`h-[20px] w-[20px]  absolute top-3 right-2 cursor-pointer ${openEye}`} alt="open-eye"/>
                <Image src={notVisiableEye} className={`h-[20px] w-[20px] absolute top-3 right-2 cursor-pointer ${closeEye}`} alt="close-eye"/>
                </div>
                </div>
            
            <button type="submit" className=" h-[40px] w-full mt-[15px]   rounded-md text-white bg-[#25343F] cursor-pointer ">Submit</button>

          </form>

        </div>
      </div>
    

    </div>
    </>

  )
}