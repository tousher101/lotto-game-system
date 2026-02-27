'use client'
import AgentList from "@/component/AgentList"
import { fetchWithAuth } from "@/utils/fetchWithAuth"
import { useEffect, useState } from "react";
import Alert from "@/utils/Alert";


export default function AllAgents(){
    const BASEURI=process.env.NEXT_PUBLIC_API_URI;
    const [agentData, setAgentData]=useState([]);
    const [page, setPage]=useState(1);
    const [totalPage, setTotalPage]=useState(1);
    const [msg, setMsg]=useState(null);
    const [type, setType]=useState(null);
    const [deleteModal, setDeleteModal]=useState(false);
    const [searchData, setSearchData]=useState({});
    const [agentCode, setAgentCode]=useState('');

    const getAgentList=async(page)=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/getallagent?page=${page}&limit=100`)
            if(res.success){setAgentData(res.AllAgent); setTotalPage(res.totalPage)}else{throw new Error(res.msg)}
           
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const handleNet=()=>{
        if(page<totalPage){setPage((p)=>p+1)}else{setMsg('No More Page Available'); setType('Error'); return}
    };

    const handlePrevious=()=>{
        setPage((p)=>{p-1})
    };

    const handleBlockAgent=async(id)=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/blockedagentgadget/${id}`,{
                method:'PUT'
            })
            if(res.success){setMsg(res.message);setType('Success');getAgentList();searchAgent(agentCode)}else{ throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const handleUnblockAgent=async(id)=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/unblockedagent/${id}`,{
                method:'PUT'
            })
            if(res.success){setMsg(res.message); setType('Success');getAgentList();searchAgent(agentCode)}else{ throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const handleDeleteAgent=async(id)=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/deleteagent/${id}`,{
                method:"DELETE"
            })
        if(res.success){setMsg(res.message); setType('Success');getAgentList(); searchAgent(agentCode)}else{ throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const searchAgent=async(agentCode)=>{
        try{
            
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/searchagent?agentCode=${agentCode}`)
            
            if(res.success){setSearchData(res.getAgent)}else{throw new Error(res.msg)}
            
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    }

    useEffect(()=>{
        getAgentList(page)
    },[page])



    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
       <div className="w-full overflow-hidden">
        <h1 className="text-2xl font-bold text-center my-2.5">Agent List</h1>
        <AgentList totalPage={totalPage} page={page} handleNext={()=>{handleNet()}} data={agentData} handlePrevious={()=>{handlePrevious()}}
            handleBlockAgent={(id)=>{handleBlockAgent(id)}} handleUnblockAgent={(id)=>{handleUnblockAgent(id)}} openModal={()=>{setDeleteModal(true)}}
            deleteModal={deleteModal} closeModal={()=>{setDeleteModal(false)}} submitDeleteAgent={(id)=>{handleDeleteAgent(id)}} searchhValue={agentCode}
            searchOnCh={(e)=>{setAgentCode(e.target.value)}} submitSearch={()=>{searchAgent(agentCode)}} searchData={searchData}/>
       </div>
       
       </>
    )
}