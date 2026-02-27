'use clinet'
import { useState } from "react"
import DeleteModal from "./DeleteModal"

export default function AgentList({page,totalPage,handleNext, data, handlePrevious, handleBlockAgent,handleUnblockAgent, openModal
    ,deleteModal,closeModal, submitDeleteAgent, searchOnCh,searchhValue, submitSearch, searchData
}){
    const [agentId, setAgentId]=useState(null);
    const handleDelete=()=>{
        submitDeleteAgent(agentId);
        closeModal();
    }
    return(
        <>
        <div>
            <div className="flex gap-3 justify-end m-2.5 items-center">
                <input value={searchhValue} onChange={searchOnCh} type="text" placeholder="Search by Agent Code" className="border border-gray-300 p-2 w-full rounded-xl focus:outline-none "/>
                <button onClick={submitSearch} className="h-[40px] w-[100px] rounded-xl bg-gray-500 text-white cursor-pointer">Search</button>
            </div>
        <table className= "border border-gray-500 text-center  border-collapse  w-[calc(100%-20px)] mx-[10px] text-sm">
            <thead className=" bg-gray-300">
        <tr>
            <th className="p-1 border border-gray-500">Agent Code</th>
            <th className="p-1 border border-gray-500">Agent Name</th>
            <th className="p-1 border border-gray-500">Username</th>
            <th className="p-1 border border-gray-500">Address</th>
            <th className="p-1 border border-gray-500">Phone</th>
            <th className="p-1 border border-gray-500">Assigned Status</th>
            <th className="p-1 border border-gray-500">Active Status</th>
            <th className="p-1 border border-gray-500">Join Date</th>
            <th className="p-1 border border-gray-500">Update Date</th>
            <th className="p-1 border border-gray-500">Blocked</th>
            <th className="p-1 border border-gray-500">Unbloked</th>
            <th className="p-1 border border-gray-500">Edit</th>
        </tr>
    </thead>
    <tbody>

        {
            Object.keys(searchData).length>0?
            <tr className="text-xs" key={searchData.id} onClick={()=>{setAgentId(searchData.id)}}>
            <td className="p-1 border border-gray-500">{searchData.agentCode} </td>
            <td className="p-1 border border-gray-500">{searchData.name}</td>
            <td className="p-1 border border-gray-500">{searchData.userName}</td>
             <td className="p-1 border border-gray-500"> {searchData.address}</td>
             <td className="p-1 border border-gray-500">{searchData.phone} </td>
             <td className="p-1 border border-gray-500">{searchData.assignStatus} </td>
             <td className="p-1 border border-gray-500">{searchData.status} </td>
             <td className="p-1 border border-gray-500"> {new Date(searchData.createdAt).toLocaleDateString()} </td>
             <td className="p-1 border border-gray-500"> {new Date(searchData.updatedAt).toLocaleDateString()} </td>
             <td className=" border border-gray-500 p-1"> {searchData.status==='ACTIVE'&&<button onClick={()=>{handleBlockAgent(searchData.id)}} className="h-[30px] w-[60px] bg-red-500 text-white cursor-pointer rounded-md">Block</button>} </td>
            <td className=" border border-gray-500 p-1"> { searchData.status==='INACTIVE'&&<button onClick={()=>{handleUnblockAgent(searchData.id)}} className="h-[30px] w-[60px] bg-green-500 text-white cursor-pointer rounded-md">Unblock</button>} </td>
             <td className=" border border-gray-500 p-1"> <button onClick={openModal} className="h-[30px] w-[50px] bg-blue-500 text-white cursor-pointer rounded-md">Delete</button> </td>
            
         </tr> 
        :
        data?.map((agent)=>(
            <tr className="text-xs" key={agent.id} onClick={()=>{setAgentId(agent.id)}}>
            <td className="p-1 border border-gray-500">{agent.agentCode} </td>
            <td className="p-1 border border-gray-500">{agent.name}</td>
            <td className="p-1 border border-gray-500">{agent.userName}</td>
            <td className="p-1 border border-gray-500"> {agent.address}</td>
            <td className="p-1 border border-gray-500">{agent.phone} </td>
            <td className="p-1 border border-gray-500">{agent.assignStatus} </td>
            <td className="p-1 border border-gray-500">{agent.status} </td>
            <td className="p-1 border border-gray-500"> {new Date(agent.createdAt).toLocaleDateString()} </td>
            <td className="p-1 border border-gray-500"> {new Date(agent.updatedAt).toLocaleDateString()} </td>
            <td className=" border border-gray-500 p-1"> {agent.status==='ACTIVE'&&<button onClick={()=>{handleBlockAgent(agent.id)}} className="h-[30px] w-[60px] bg-red-500 text-white cursor-pointer rounded-md">Block</button>} </td>
           <td className=" border border-gray-500 p-1"> { agent.status==='INACTIVE'&&<button onClick={()=>{handleUnblockAgent(agent.id)}} className="h-[30px] w-[60px] bg-green-500 text-white cursor-pointer rounded-md">Unblock</button>} </td>
            <td className=" border border-gray-500 p-1"> <button onClick={openModal} className="h-[30px] w-[50px] bg-blue-500 text-white cursor-pointer rounded-md">Delete</button> </td>
            
        </tr>
        ))}
    </tbody>

</table>

{totalPage>1&&<div className="flex justify-between items-center mx-2.5 mt-4 ">
<button disabled={page<=totalPage} onClick={handlePrevious}  className="h-[40px] w-[120px] rounded-sm border border-gray-500 cursor-pointer" >		&lArr; Previous</button>
<p>{page} page of {totalPage}</p>
<button onClick={handleNext} className="h-[40px] w-[120px] rounded-sm border border-gray-500 cursor-pointer" >	Next	&rArr; </button>
</div>}
</div>

{deleteModal&&<DeleteModal close={()=>{closeModal()}} submitDelete={handleDelete}/>}
    </>
    )
}