"use client"
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useEffect, useState } from "react";
import Alert from "@/utils/Alert";
export default function AddBranch(){

    const BASEURI=process.env.NEXT_PUBLIC_API_URI;
    const [name,setName]=useState('');
    const [code, setCode]=useState('');
    const [address, setAddress]=useState('');
    const [msg, setMsg]=useState(null);
    const [type,setType]=useState(null);
    const [allBranch,setAllBranch]=useState([]);

    const addBranch=async()=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/admin/addnewbranch`,{
                method:'PUT',
                body:JSON.stringify({name,code,address})
            })
            
            if(res.success){setMsg(res.message); setType('Success');getAllBranch()}else{throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const handleSubmitBranch=(e)=>{
        e.preventDefault();
        addBranch();
        setName(''),setCode('');setAddress('');
    };

    const getAllBranch=async()=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/admin/getallbranched`)
            setAllBranch(res)
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    }

    useEffect(()=>{
        getAllBranch()
    },[])


    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div className="w-full">
            <h1 className="text-center text-2xl font-bold mt-[10px]">Add New Station</h1>
            <form onSubmit={handleSubmitBranch} className="border-1 border-gray-500 rounded-xl mx-[10px] mt-[20px] p-3 shadow-xs shadow-gray-500">
            <div className="flex mx-[10px] items-center justify-between gap-2">
                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" placeholder="Station Name" className="p-2 rounded-xl border-1 w-full border-gray-400 focus:outline-none"/>
                <input value={code} onChange={(e)=>{setCode(e.target.value)}} type="text" placeholder="Station Code" className="p-2 rounded-xl border-1 w-full border-gray-400 focus:outline-none"/>
            </div>
            <div className="flex mx-[10px] mt-[10px] justify-center items-center">
                <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" placeholder="Station Address"className="p-2 rounded-xl border-1 w-full border-gray-400 focus:outline-none "/>
            </div>
            <div className="flex justify-center items-center mt-[10px]">
                <button type="submit" className="h-[40px] w-[120px] bg-gray-700 text-white rounded-md cursor-pointer">Submit</button>
            </div>
            </form>

            <h1 className="text-center text-2xl font-bold mt-[20px]">Active Station List</h1>
            <table className="min-w-full border-1 border-gray-300 mt-[10px]">
                <thead>
                    <tr>
                <th className="p-2 border border-gray-400 text-center">SL-No:</th>
                <th className="p-2 border border-gray-400 text-center">Name</th>
                <th className="p-2 border border-gray-400 text-center">Code</th>
                <th className="p-2 border border-gray-400 text-center">Address</th>
               
                </tr>
                </thead>

                <tbody>
                    {allBranch.map((b)=>(
                            <tr key={b.id}>
                        <td className="text-center border border-gray-300 p-2">{b.id}</td>
                        <td className="text-center border border-gray-300 p-2">{b.name}</td>
                        <td className="text-center border border-gray-300 p-2">{b.name}</td>
                        <td className="text-center border border-gray-300 p-2">{b.address}</td>

                    </tr>
                    ))}
                </tbody>
            

            </table>
        </div>
        </>
    )
}