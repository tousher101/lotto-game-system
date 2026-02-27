"use client"
import EmployeeAddForm from "@/component/EmployeeAddForm"
import AssignEmployeeList from "@/component/AssignEmployeeList"
import { fetchWithAuth } from "@/utils/fetchWithAuth"
import { useEffect, useState } from "react"
import Alert from "@/utils/Alert"


export default function AddOparetor(){
    const BASEURI=process.env.NEXT_PUBLIC_API_URI
    const [allBranch, setAllBranch]=useState([]);
    const [name, setName]=useState('');
    const [email,setEmail]=useState('');
    const [userName, setUsername]=useState('');
    const [phone, setPhone]=useState('');
    const [branchId,setBranchId]=useState('');
    const [password,setPassword]=useState('');
    const [msg,setMsg]=useState(null);
    const [type,setType]=useState(null);
    const [allOparetor,setAllOparetor]=useState([]);
const getAllBranch= async()=>{
    const res= await fetchWithAuth(`${BASEURI}/api/admin/getallbranched`)
    setAllBranch(res)
};

const addOparetor=async()=>{
    try{
        const res= await fetchWithAuth(`${BASEURI}/api/admin/addnewoparetor`,{
            method:'PUT',
            body:JSON.stringify({name,password,userName,phone,branchId,email})
        })
        if(res.success){setMsg(res.message);setType('Success');getAllOpretor()}else{ throw new Error(res.msg)}
    }catch(err){console.error(err);setMsg(err.message);setType('Error')}
};

const handleAddOparetor=(e)=>{
    e.preventDefault();
    addOparetor();
    setName('');setEmail('');setPassword('');setPhone('');setUsername('');setBranchId('')
}

const getAllOpretor=async()=>{
    try{
        const res= await fetchWithAuth(`${BASEURI}/api/admin/getalloparetor`)
        if(res.success){setAllOparetor(res.allOparetor)}
    }catch(err){console.error(err);setMsg(err.message);setType('Error')}
};

const deleteOparetor=async(id)=>{
    try{
        const res=await fetchWithAuth(`${BASEURI}/api/admin/deleteopretor/${id}`,{
            method:'DELETE',
        })
        if(res.success){setMsg(res.message);setType('Success');getAllOpretor()}else{throw new Error(res.msg)}
    }catch(err){console.error(err);setMsg(err.message);setType('Error')}
}
 
const handleDeleteOparetor=(id)=>{
    deleteOparetor(id)
}




useEffect(()=>{
    getAllBranch();
    getAllOpretor()
},[])

    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div className="w-full ">
            <h1 className="text-center text-2xl font-bold my-[10px]">Add New Oparetor</h1>
            <EmployeeAddForm branch={allBranch} nameValue={name} nameOnCh={(e)=>{setName(e.target.value)}} emailValue={email} emailOnCh={(e)=>{setEmail(e.target.value)}}
            passOnCha={(e)=>{setPassword(e.target.value)}} passValue={password} phoneValue={phone} phoneOnCh={(e)=>{setPhone(e.target.value)}} userNameValue={userName}
            userNameOnCh={(e)=>{setUsername(e.target.value)}} branchValue={branchId} branchOnCh={(e)=>{setBranchId(e.target.value)}} submitOparetor={handleAddOparetor}
             />
           
            <h1 className="text-center text-2xl font-bold my-[10px]">Assign Oparetor List</h1>
            <AssignEmployeeList assignData={allOparetor} deleteEmpolye={(id)=>{handleDeleteOparetor(id)}}/>

        </div>
        </>
    )
}