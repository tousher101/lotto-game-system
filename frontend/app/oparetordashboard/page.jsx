'use client'
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import DataTable from "@/component/AdminReportTable"
import { useEffect, useState } from "react";
export default function OparetorPage(){
const BASEURI=process.env.NEXT_PUBLIC_API_URI;

const [alldrewTime,setAllDrewTime]=useState([]);
const [date, setDate]=useState('');
const [drewTimeId, setDrewTimeId]=useState(1);
const [getData, setGetData]=useState(null);
const [msg, setMsg]=useState(null);
const [type, setType]=useState(null);

    const getAllDrewTime=async()=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/admin/getalldrawtime`)
            setAllDrewTime(res.allDrawTime)
        }catch(err){console.error(err)}
    };

    const getAllReport=async(date,drewTimeId)=>{
        try{
            const params=  new URLSearchParams();
            if(date) params.append('date',date);
            if(drewTimeId) params.append('drewTimeId', drewTimeId)
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/branchreportbycashier?${params.toString()}`)
        if(res.success){setGetData(res)}
      
        }catch(err){console.error(err)}
    }

    useEffect(()=>{
        if(!drewTimeId){setMsg('Please Select Draw Time'); setType('Error');return}
        getAllDrewTime()
        getAllReport(date,drewTimeId)
    },[])
    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        
        <div>
             <DataTable  drewTime={alldrewTime} dateValue={date } dateValueOnCh={(e)=>{setDate(e.target.value)}}
             drewTimeIdValue={drewTimeId} drewTimeIdValueOnCh={(e)=>{setDrewTimeId(e.target.value)}} totalData={getData} submitSearch={()=>{getAllReport(date,drewTimeId)}}
              />
        </div>
        </>
    )
}