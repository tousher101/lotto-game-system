"use client"
import { useEffect, useState } from "react";
import DataTable from "../../component/AdminReportTable"
import fetchWithAuth from "../../utils/fetchWithAuth";


export default function AdminPage(){
const BASEURI=process.env.NEXT_PUBLIC_API_URI;
const [allBranch, setAllBranch]=useState([]);
const [alldrewTime,setAllDrewTime]=useState([]);

const getAllBranch= async()=>{
try{
const res = await fetchWithAuth(`${BASEURI}/api/admin/getallbranched`)
setAllBranch(res)
}catch(err){console.error(err)}
};

const getAllDrewTime=async()=>{
    try{
        const res= await fetchWithAuth(`${BASEURI}/api/admin/getalldrawtime`)
        setAllDrewTime(res)
    }catch(err){console.error(err)}
}

useEffect(()=>{
    getAllBranch();
    getAllDrewTime();
},[])


    return(
        <div>
            <DataTable branch={allBranch} drewTime={alldrewTime}/>
        </div>
    )
}