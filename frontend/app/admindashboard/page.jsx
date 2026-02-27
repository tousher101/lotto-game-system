"use client"
import { useEffect, useState } from "react";
import DataTable from "../../component/AdminReportTable"
import {fetchWithAuth} from "../../utils/fetchWithAuth";
import Alert from "@/utils/Alert";



export default function AdminPage(){
const BASEURI=process.env.NEXT_PUBLIC_API_URI;
const [allBranch, setAllBranch]=useState([]);
const [alldrewTime,setAllDrewTime]=useState([]);
const [date, setDate]=useState('');
const [drewTimeId, setDrewTimeId]=useState(1);
const [branchId, setBranchId]=useState(1);
const [getData, setGetData]=useState(null);
const [msg, setMsg]=useState(null);
const [type, setType]=useState(null);

const getAllBranch= async()=>{
try{
const res = await fetchWithAuth(`${BASEURI}/api/admin/getallbranched`)
setAllBranch(res)
}catch(err){console.error(err)}
};

const getAllDrewTime=async()=>{
    try{
        const res= await fetchWithAuth(`${BASEURI}/api/admin/getalldrawtime`)
        setAllDrewTime(res.allDrawTime)
    }catch(err){console.error(err)}
};

const getAllReport=async(date,branchId,drewTimeId)=>{
    try{
        const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (branchId) params.append("branchId", branchId);
    if (drewTimeId) params.append("drewTimeId", drewTimeId);
        const res= await fetchWithAuth(`${BASEURI}/api/admin/gettotalinoutreportbybranch?${params.toString()}`)
        if(res.success){setGetData(res)}
        
    }catch(err){console.error(err)}
}

useEffect(()=>{
    if(!branchId){setMsg('Please Select Branch'); setType('Error');return}
    if(!drewTimeId){setMsg('Please Select Draw Time'); setType('Error');return}
    getAllBranch();
    getAllDrewTime();
    getAllReport(date,branchId,drewTimeId)
},[])


    return(
       
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div>
            <DataTable branch={allBranch} drewTime={alldrewTime} dateValue={date } dateValueOnCh={(e)=>{setDate(e.target.value)}}
            branchIdValue={branchId} branchIdValueOnCh={(e)=>{setBranchId(e.target.value)}} drewTimeIdValue={drewTimeId} drewTimeIdValueOnCh={(e)=>{setDrewTimeId(e.target.value)}}
            totalData={getData} submitSearch={()=>{getAllReport(date,branchId,drewTimeId)}}/>
        </div>
        </>
    )
}