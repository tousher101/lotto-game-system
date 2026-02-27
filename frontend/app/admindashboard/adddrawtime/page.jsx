'use client'

import { useEffect, useState } from "react";
import Alert from "@/utils/Alert";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import EditModal from "@/component/EditModal";

export default function AddDrawTime(){
    const BASEURL=process.env.NEXT_PUBLIC_API_URI;
    const [time, setTime]=useState('');
    const [timePost, setTimePost]=useState('');
    const [allTime, setAllTime]=useState([]);
    const [msg,setMsg]=useState(null);
    const [type,setType]=useState(null);
    const [openEditModal, setEditModal]=useState(false);
    const [selectedTime, setSelectedTime]=useState(null);
    const [drawTimeId, setDrawTimeId]=useState(null);

    const addDrawTime=async()=>{
        try{
            const res=await fetchWithAuth(`${BASEURL}/api/admin/addnewdrawtime`,{
                method:'PUT',
                body:JSON.stringify({time,timePost})
            })
            if(res.success){setMsg(res.message);setType('Success');getAllTime()}else{throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    }
const handleAddDrawTime=(e)=>{
    e.preventDefault();
    addDrawTime();
    setTime('');setTimePost('')
};

const getAllTime=async()=>{
    try{
        const res=await fetchWithAuth(`${BASEURL}/api/admin/getalldrawtime`)
        if(res.success){setAllTime(res.allDrawTime)}
    }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const editTime=async(id)=>{
        try{
            const res= await fetchWithAuth(`${BASEURL}/api/admin/editdrawtime/${id}`,{
                method:'PUT',
                body:JSON.stringify({newTime:selectedTime.time, newTimePost:timePost})
            })
            if(res.success){setMsg(res.message); setType('Success');getAllTime()}else{throw new Error(res.msg)}

        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const handleSubmitEdit=(drawTimeId)=>{
        editTime(drawTimeId);
        setEditModal(false)
    }

    useEffect(()=>{
        getAllTime();
    },[])

    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div className="w-full">
            <h1 className="text-center text-2xl font-bold mt-[10px]">Add Draw Time</h1>
            <form onSubmit={handleAddDrawTime} className="border-1 border-gray-500 rounded-xl mx-[10px] mt-[20px] p-3 shadow-xs shadow-gray-500">
            <div className="flex mx-[10px] items-center justify-between gap-2">
                <input value={time} onChange={(e)=>{setTime(e.target.value)}}  type="text" placeholder="Draw Time" className="p-2 rounded-xl border-1 w-full border-gray-400 focus:outline-none"/>
                <select value={timePost} onChange={(e)=>{setTimePost(e.target.value)}} className="p-2 rounded-xl border-1 w-full border-gray-400 focus:outline-none">
                    <option>Select Time Post</option>
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                </select>
            </div>
            <div className="flex justify-center items-center mt-[10px]">
                <button type="submit" className="h-[40px] w-[120px] bg-gray-700 text-white rounded-md cursor-pointer">Submit</button>
            </div>
            </form>
            <h1 className="text-center text-2xl font-bold mt-[20px]">Active Draw Time List</h1>
            <table className="min-w-full border-1 border-gray-300 mt-[10px]">
                <thead>
                    <tr>
                    <th className="p-2 border border-gray-400 text-center">SL-No:</th>
                    <th className="p-2 border border-gray-400 text-center">Draw Time:</th>
                    <th className="p-2 border border-gray-400 text-center">Draw Time:</th>

                    </tr>
                </thead>
                <tbody>
                    {allTime.map((t)=>(
                        <tr key={t.id} onClick={()=>{setSelectedTime(t);setDrawTimeId(t.id) }}>
                        <td className="text-center border border-gray-300 p-2">{t.id}</td>
                        <td className="text-center border border-gray-300 p-2">{t.time} {t.timePost}</td>
                        <td className="text-center border border-gray-300 p-2"><button onClick={()=>{setEditModal(true)}} className="h-[35px] w-[100px] bg-gray-500 text-white rounded-md cursor-pointer">Edit</button></td>
                        
                    </tr>
                    ))}
                </tbody>

            </table>
        </div>

        {openEditModal&&selectedTime&&<EditModal cancelModal={()=>{setEditModal(false)}} timeValue={selectedTime.time}
            timeValuOnCh={(e)=>{setSelectedTime({...selectedTime,time:e.target.value})}} timePostValue={timePost} timePostOnCh={(e)=>{setTimePost(e.target.value)}}
            handleSubmit={()=>{handleSubmitEdit(drawTimeId)}}/>}
        </>
    )
}