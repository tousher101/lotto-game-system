"use client"
import AgentReportDetailsModal from "@/component/AgentReportDetailsModal";
import ReportByAgentTable from "@/component/ReportByAgentTable"
import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import Alert from "@/utils/Alert";
export default function ReportByAgent(){
const BASEURI=process.env.NEXT_PUBLIC_API_URI;
const [date, setDate]=useState('');
const [drewTimeId, setDrewTimeId]=useState(1);
const [branchId, setBranchId]=useState(1);
const [allBranch, setAllBranch]=useState([]);
const [alldrewTime,setAllDrewTime]=useState([]);
const [detailsModal, setDetailsModal]=useState(false);
const [allAgenetReport, setAllAgentReport]=useState([]);
const [msg, setMsg]=useState(null);
const [type, setType]=useState(null);
const [totalPage ,setTotalPage]=useState(1);
const [page, setPage]=useState(1);
const [limit, setLimit]=useState(100);
const [detailsAgentData, setDetailsAgentData]=useState([])


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


const getAllAgentData=async(date,branchId,drewTimeId,page,limit)=>{
    try{
    const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (branchId) params.append("branchId", branchId);
    if (drewTimeId) params.append("drewTimeId", drewTimeId);
    if(page) params.append('page', page);
    if(limit) params.append('limit',limit);
        const res= await fetchWithAuth(`${BASEURI}/api/admin/getallagentreport?${params.toString()}`)
          if(res.success){setAllAgentReport(res.result); setTotalPage(res.totalPage)} 
    }catch(err){console.error(err)}
};

const getAgentDetails=async(id, date,branchId,drewTimeId)=>{
    try{
        const params = new URLSearchParams();
    if (date) params.append("date", date);
    if (branchId) params.append("branchId", branchId);
    if (drewTimeId) params.append("drewTimeId", drewTimeId);
        const res= await fetchWithAuth(`${BASEURI}/api/admin/agentdetailsreport/${id}?${params.toString()}`)
        if(res.success){setDetailsAgentData(res); setMsg(res.message);setType(success); setDetailsModal(true)} else{throw new Error(res.msg)}

    }catch(err){console.error(err);setMsg(err.message);setType('Error')}
}

 const handleNext=()=>{
        if(page<totalPage){setPage((p)=>p+1)}else{setMsg('No More Page Available');setType('Error'); return}
    };

    const handlePrevious=()=>{
        setPage((p)=>p-1)
    };

useEffect(()=>{
     if(!branchId){setMsg('Please Select Branch'); setType('Error');return}
    if(!drewTimeId){setMsg('Please Select Draw Time'); setType('Error');return}
    getAllBranch();
    getAllDrewTime();
    getAllAgentData(date,branchId,drewTimeId,page,limit)
},[page])
    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div>
            <ReportByAgentTable branch={allBranch} drewTime={alldrewTime} dateValue={date } dateValueOnCh={(e)=>{setDate(e.target.value)}}
            branchIdValue={branchId} branchIdValueOnCh={(e)=>{setBranchId(e.target.value)}} drewTimeIdValue={drewTimeId} drewTimeIdValueOnCh={(e)=>{setDrewTimeId(e.target.value)}} agentData={allAgenetReport} page={page}
            totalPage={totalPage} handleNext={()=>{handleNext()}} submitSearch={()=>{getAllAgentData(date,branchId,drewTimeId,page,limit)}} submitDetails={(id)=>{getAgentDetails(date,branchId,drewTimeId)}} handlePrevious={()=>{handlePrevious()}}/>
        </div>
        {detailsModal&&<AgentReportDetailsModal closeModal={()=>{setDetailsModal(false)}} detailsData={detailsAgentData} />}
        </>
    )
}