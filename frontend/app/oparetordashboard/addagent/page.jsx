'use client'
import EmployeeAddForm from "@/component/EmployeeAddForm"
import { useState } from "react";
import Alert from "@/utils/Alert";
import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default function AddAgent(){
     const BASEURI=process.env.NEXT_PUBLIC_API_URI
        
        const [name, setName]=useState('');
        const [email,setEmail]=useState('');
        const [userName, setUsername]=useState('');
        const [phone, setPhone]=useState('');
        const [address, setAddress]=useState('');
        const [agentCode, setAgentCode]=useState('');
        const [gadgetId, setGadgetId]=useState('');
        const [password,setPassword]=useState('');
        const [comission, setComission]=useState('');
        const [msg,setMsg]=useState(null);
        const [type,setType]=useState(null);
        const [imeino, setImeino]=useState('');


        const addAgent=async()=>{
            try{
                const res= await fetchWithAuth(`${BASEURI}/api/oparetor/addagent`,{
                    method:'POST',
                    body:JSON.stringify({name,email,userName,password,address,agentCode,gadgetId,phone,comission,imeino})
                })
                if(res.success){setMsg(res.message);setType('Success')} else{throw new Error(res.msg)}

            }catch(err){console.error(err);setMsg(err.message);setType('Error')
        }
    };

    const handleSubmitAddAgent=(e)=>{
        e.preventDefault();
        addAgent()
        setName(''); setAddress(''); setPassword(''); setAgentCode(''); setEmail('');setGadgetId('');setUsername('');setPhone(''); setComission('')
    }
    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
       <div className="w-full">
        <h1 className="text-center text-2xl font-bold my-[10px]">Add Agent</h1>
        <EmployeeAddForm  nameValue={name} nameOnCh={(e)=>{setName(e.target.value)}} emailValue={email} emailOnCh={(e)=>{setEmail(e.target.value)}}
            passOnCha={(e)=>{setPassword(e.target.value)}} passValue={password} phoneValue={phone} phoneOnCh={(e)=>{setPhone(e.target.value)}} userNameValue={userName}
            userNameOnCh={(e)=>{setUsername(e.target.value)}} addressValue={address} addressValuOnCh={(e)=>{setAddress(e.target.value)}}
            agentCodeValue={agentCode} agentCodeOnCh={(e)=>{setAgentCode(e.target.value)}} gadgetValue={gadgetId} gadgetOnCh={(e)=>{setGadgetId(e.target.value)}} submitOparetor={handleSubmitAddAgent}
            comiValue={comission} comiOnCh={(e)=>{setComission(e.target.value)}} imeiValue={imeino} imeiValueOnCh={(e)=>{setImeino(e.target.value)}} />
       </div>
       </>
    )
}