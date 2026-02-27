'use client'
import AgentGadget from "@/component/AgentGadget"
import { useEffect, useState } from "react"
import Alert from "@/utils/Alert"
import { fetchWithAuth } from "@/utils/fetchWithAuth"


export default function AgentGadgets(){
    const BASEURI=process.env.NEXT_PUBLIC_API_URI
    const [page, setPage]=useState(1);
    const [totalPage, setTotalPage]=useState(1);
    const [gadgetData, setGadgetData]=useState([]);
    const [msg, setMsg]=useState(null);
    const [type, setType]=useState(null);
    const [editModal, setEditModal]=useState(false);
    const [editgadgetId,setEditGadgetId]=useState('');
    const [imeino, setImeiNo]=useState('');
    const [gadgetId, setGadgetId]=useState('');
    const [searchData, setSearchData]=useState({});
   

    const getAllAgentGadgets=async(page)=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/getallgadgets?page=${page}&limit=100`)
            if(res.success){setGadgetData(res.allGadget);setTotalPage(totalPage)} else{throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    };

    const handleNext=()=>{
        if(page<totalPage){setPage((p)=>p+1)}else{setMsg('No More Page Available'); setType('Error');return}
    };

    const handlePrevious=()=>{
        setPage((p)=>p-1)
    };

    const editGadget=async(id)=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/editagentgadget/${id}`,{
                method:'PUT',
                body:JSON.stringify({gadgetId:editgadgetId,imeino})
            })
            if(res.success){setMsg(res.message);setType('Success');getAllAgentGadgets()}else{throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
        setEditGadgetId('');setImeiNo('')
    };

    const searchAgentByGadgetId=async(gadgetId)=>{
        try{
            const res= await fetchWithAuth(`${BASEURI}/api/oparetor/searchagentbygadget?gadgetId=${gadgetId}`)
            if(res.success){setSearchData(res.getGadget)}else{throw new Error(res.msg)}
        }catch(err){console.error(err);setMsg(err.message);setType('Error')}
    }

    useEffect(()=>{
        getAllAgentGadgets()
    },[page])
    return(
        <>
        {msg&&<Alert message={msg} type={type} onClose={()=>{setMsg('')}}/>}
        <div className="w-full overflow-hidden">
            <h1 className="text-2xl font-bold text-center my-2.5">Agent Gadgets</h1>
            <AgentGadget totalPage={totalPage} page={page} data={gadgetData} handleNext={()=>{handleNext()}} handlePrevious={()=>{handlePrevious()}} openModal={()=>{setEditModal(true)}}
                editModal={editModal} cancelModal={()=>{setEditModal(false)}} gadgetValue={editgadgetId} gadgetOnCh={(e)=>{setEditGadgetId(e.target.value)}}
                imeiValue={imeino} imeiOnCh={(e)=>{setImeiNo(e.target.value)}} submitEdit={(id)=>{editGadget(id)}} searchhValue={gadgetId} searchOnCh={(e)=>{setGadgetId(e.target.value)}}
                submitSearch={()=>{searchAgentByGadgetId(gadgetId)}} searchData={searchData} />
        </div>

     
        </>
    )
}