"use client"
import EmployeeAddForm from "@/component/EmployeeAddForm"
import AssignEmployeeList from "@/component/AssignEmployeeList"
import { fetchWithAuth } from "@/utils/fetchWithAuth"
import { useEffect, useState } from "react"
import Alert from "@/utils/Alert"

export default function AddCashier(){
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
    const [allCashier, setAllCashier]=useState([]);

    const getAllBranch= async()=>{
    const res= await fetchWithAuth(`${BASEURI}/api/admin/getallbranched`)
    setAllBranch(res)
        };

    const addCashier=async()=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/admin/addnewcashier`,{
                method:'PUT',
                body:JSON.stringify({name,email,phone,userName,password,branchId})
            })
            if(res.success){setMsg(res.message);setType('Success');getAllCashier()}else{ throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')
    }
};

const handleAddCashier=(e)=>{
    e.preventDefault();
    addCashier();
    setName('');setUsername('');setPassword('');setBranchId('');setEmail('');setPhone('')
};

const getAllCashier=async()=>{
    try{
        const res= await fetchWithAuth(`${BASEURI}/api/admin/getallcashier`)
        if(res.success){setAllCashier(res.allCashier)}
    }catch(err){console.error(err);setMsg(err.message);setType('Error')
}
};

const deleteCashier=async(id)=>{
    try{
        const res= await fetchWithAuth(`${BASEURI}/api/admin/deletecashier/${id}`,{
            method:'DELETE'
        })
        if(res.success){setMsg(res.message); setType('Success');getAllCashier()}else{throw new Error(res.msg)}
    }catch(err){console.error(err);setMsg(err.message);setType('Error')
}
};

useEffect(()=>{
getAllBranch();
getAllCashier();
},[])

    return(
         <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div className="w-full ">
            <h1 className="text-center text-2xl font-bold my-[10px]">Add Cashier</h1>

            <EmployeeAddForm branch={allBranch} nameValue={name} nameOnCh={(e)=>{setName(e.target.value)}} emailValue={email} emailOnCh={(e)=>{setEmail(e.target.value)}}
            passOnCha={(e)=>{setPassword(e.target.value)}} passValue={password} phoneValue={phone} phoneOnCh={(e)=>{setPhone(e.target.value)}} userNameValue={userName}
            userNameOnCh={(e)=>{setUsername(e.target.value)}} branchValue={branchId} branchOnCh={(e)=>{setBranchId(e.target.value)}} submitOparetor={handleAddCashier}
             />
           
            <h1 className="text-center text-2xl font-bold my-[10px]">Assign Cashier List</h1>
            <AssignEmployeeList assignData={allCashier} deleteEmpolye={(id)=>{deleteCashier(id)}} />

        </div>
        </>
    )
}