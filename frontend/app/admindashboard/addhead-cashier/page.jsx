"use client"
import EmployeeAddForm from "@/component/EmployeeAddForm"
import AssignEmployeeList from "@/component/AssignEmployeeList"
import { fetchWithAuth } from "@/utils/fetchWithAuth"
import { useEffect, useState } from "react"
import Alert from "@/utils/Alert"

export default function AddHeadCashier(){
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
    const [allHeadCashier, setAllHeadCashier]=useState([]);

    const getAllBranch= async()=>{
    const res= await fetchWithAuth(`${BASEURI}/api/admin/getallbranched`)
    setAllBranch(res)
        };

    const addHeadCashier=async()=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/admin/addnewheadcashier`,{
                method:'PUT',
                body:JSON.stringify({name,userName,password,phone,email,branchId})
            })
            if(res.success){setMsg(res.message);setType('Success');getAllHeadCashier()}else{throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')
    };
}

    const handleSubmit=(e)=>{
        e.preventDefault();
        addHeadCashier()
        setName('');setUsername('');setPassword('');setBranchId('');setEmail('');setPhone('')
    };

    const getAllHeadCashier=async()=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/admin/getallheadcashier`)
            if(res.success){setAllHeadCashier(res.allHeadCashier)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')
    }
};

const deleteHeadCashier=async(id)=>{
    try{
        const res= await fetchWithAuth(`${BASEURI}/api/admin/deleteheadcashier/${id}`,{
            method:'DELETE',
        })
        if(res.success){setMsg(res.message);setType('Success');getAllHeadCashier()}else{throw new Error(res.msg)}
    }catch(err){console.error(err);setMsg(err.message);setType('Error')
};
}

    useEffect(()=>{
        getAllBranch();
        getAllHeadCashier()
    },[]);



    return(
         <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div className="w-full ">
            <h1 className="text-center text-2xl font-bold my-[10px]">Add New Head-Cashier</h1>

            <EmployeeAddForm branch={allBranch} nameValue={name} nameOnCh={(e)=>{setName(e.target.value)}} emailValue={email} emailOnCh={(e)=>{setEmail(e.target.value)}}
            passOnCha={(e)=>{setPassword(e.target.value)}} passValue={password} phoneValue={phone} phoneOnCh={(e)=>{setPhone(e.target.value)}} userNameValue={userName}
            userNameOnCh={(e)=>{setUsername(e.target.value)}} branchValue={branchId} branchOnCh={(e)=>{setBranchId(e.target.value)}} submitOparetor={handleSubmit}
             />
           
            <h1 className="text-center text-2xl font-bold my-[10px]">Assign Head-Cashier List</h1>
            <AssignEmployeeList assignData={allHeadCashier} deleteEmpolye={(id)=>{deleteHeadCashier(id)}}/>

        </div>
        </>
      
    )
}
