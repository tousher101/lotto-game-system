"use client"
import Image from "next/image"
import stlLogo from '../../public/stl-logo.png'
import { useState } from "react"
import Alert from '../../utils/Alert'
import visiableEye from '../../public/visibility.png'
import notVisiableEye from '../../public/eye.png'



export default function AddAdmin(){
const [msg,setMsg]=useState(null);
const [type,setType]=useState(null);
const BASEURL=process.env.NEXT_PUBLIC_API_URI
const [name,setName]=useState('');
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const [userName,setUserName]=useState('');
const [secCode, setSecCode]=useState('');
const [phone, setPhone]=useState('');
const [openEye,setOpenEye]=useState('hidden')
const [closeEye,setCloseEye]=useState('block')
const [showPass,setShowPass]=useState('password')


const addNewAddmin=async()=>{
    try{
        const res= await fetch(`${BASEURL}/api/auth/createadmin`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name,email,password,userName,secCode,phone})
        });
      
        const data= await res.json();
        console.log(data)
        if(res.ok){setMsg(data.message);setType('Success')} 
       else{ throw new Error(data.msg||data.message||'Something Went Wrong')}


    }catch(err){console.error(err),setMsg(err.message);setType('Error')}
}

const handleSubmit=(e)=>{
e.preventDefault();
addNewAddmin();
setEmail('');setName('');setUserName('');setSecCode('');setPassword('');setPhone('')
};

 const handleShowPass=()=>{
    if(openEye==='hidden'){setCloseEye('hidden'); setOpenEye('block'); setShowPass('text')} else{setOpenEye('hidden'); setCloseEye('block'); setShowPass('password')}
  }

  return(
    <>
    {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
    <div className=" max-w-[1380px] mx-auto overflow-hidden ">
      <div className="grid grid-cols-1  justify-items-center  mt-[25px] ">
        <div className="flex border-1 border-gray-500 shadow-2xl rounded-2xl w-[900px] overflow-hidden">
          <div className=" flex flex-[50%] bg-[#25343F] justify-center items-center  ">
          <Image src={stlLogo} className="h-[100px] w-[100px]" alt="stl-logo"/>
          <h1 className="text-white text-4xl font-bold ml-[15px]">STL</h1>
          </div>
          <form onSubmit={handleSubmit} className="flex-[50%] grid justify-items-center p-10 gap-2">
            <h1 className="text-3xl font-bold">Add New Admin</h1>
            <h2 className=" ">Please enter all information of new addmin !</h2>
           
            <input required value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Name" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
            <input required value={userName} onChange={(e)=>{setUserName(e.target.value)}} type="text" placeholder="Username" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
            <input required value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" placeholder="Email" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
            <input required value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="number" placeholder="Phone" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>


              <div className="flex items-center relative w-full">
                <input required value={password} onChange={(e)=>{setPassword(e.target.value)}} type={`${showPass}`} placeholder="Password" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
                <div onClick={handleShowPass}>
                <Image src={visiableEye} className={`h-[20px] w-[20px]  absolute top-3 right-2 cursor-pointer ${openEye}`} alt="open-eye"/>
                <Image src={notVisiableEye} className={`h-[20px] w-[20px] absolute top-3 right-2 cursor-pointer ${closeEye}`} alt="close-eye"/>
                </div>
                </div>

                  <div className="flex items-center relative w-full">
                <input required value={secCode} onChange={(e)=>{setSecCode(e.target.value)}}  type={`${showPass}`} placeholder="Admin Secret Code" className="border-1 border-gray-400 w-full p-2 rounded-2xl"/>
                <div onClick={handleShowPass}>
                <Image src={visiableEye} className={`h-[20px] w-[20px]  absolute top-3 right-2 cursor-pointer ${openEye}`} alt="open-eye"/>
                <Image src={notVisiableEye} className={`h-[20px] w-[20px] absolute top-3 right-2 cursor-pointer ${closeEye}`} alt="close-eye"/>
                </div>
                </div>


           
            
            <button type="submit" className=" h-[40px] w-full   rounded-md text-white bg-[#25343F] cursor-pointer ">Submit</button>
           

          </form>

        </div>
      </div>
    

    </div>
    </>

  )
}