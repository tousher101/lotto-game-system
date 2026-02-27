'use client'
import { useState } from "react"
import EditModal from "./EditModal"
export default function AgentGadget({searchOnCh,searchhValue, submitSearch, page, totalPage, handleNext, handlePrevious,data, openModal, editModal,cancelModal,gadgetValue, gadgetOnCh, imeiValue, imeiOnCh, submitEdit,
    searchData
   
 }){
    const [agentId, setAgentId]=useState(null);
    const handleSubmitEdit=(agentId)=>{
            submitEdit(agentId)
        cancelModal();
    }

  
    return(
        <>
        <div>
             <div className="flex gap-3 justify-end m-2.5 items-center">
                <input value={searchhValue} onChange={searchOnCh} type="text" placeholder="Search by Gadget Id" className="border border-gray-300 p-2 w-full rounded-xl focus:outline-none "/>
                <button onClick={submitSearch} className="h-[40px] w-[100px] rounded-xl bg-gray-500 text-white cursor-pointer">Search</button>
            </div>
            <table className="border border-gray-500 text-center  border-collapse  w-[calc(100%-20px)] mx-[10px] text-sm">
                <thead className=" bg-gray-300">
                    <tr>
                        <th className="p-1 border border-gray-500">Gadget Id</th>
                        <th className="p-1 border border-gray-500">Agent Name</th>
                        <th className="p-1 border border-gray-500">IMEI No</th>
                        <th className="p-1 border border-gray-500">Edit</th>

                    </tr>
                </thead>
                <tbody>
                        {Object.keys(searchData).length>0?
                        <tr key={searchData.id} onClick={()=>setAgentId(searchData.id)}>
                            <td className="p-1 border border-gray-500">{searchData.gadgetId}</td>
                            <td className="p-1 border border-gray-500">{searchData.name}</td>
                            <td className="p-1 border border-gray-500">{searchData.imeino}</td>
                            <td className="p-1 border border-gray-500"><button onClick={openModal}  className="h-[30px] w-[70px] bg-blue-500 text-white cursor-pointer rounded-md">Edit</button></td>
                        </tr>
                        
                        
                        
                        :
                        
                        data?.map((d)=>(
                            <tr key={d.id} onClick={()=>{setAgentId(d.id)}}>
                            <td className="p-1 border border-gray-500">{d.gadgetId}</td>
                            <td className="p-1 border border-gray-500">{d.name}</td>
                            <td className="p-1 border border-gray-500">{d.imeino}</td>
                            <td className="p-1 border border-gray-500"><button onClick={openModal}  className="h-[30px] w-[70px] bg-blue-500 text-white cursor-pointer rounded-md">Edit</button></td>
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
        {editModal&&<EditModal cancelModal={cancelModal} gadgetValue={gadgetValue} gadgetOnCh={gadgetOnCh} imeiValue={imeiValue} imeiOnCh={imeiOnCh} handleSubmit={()=>{handleSubmitEdit(agentId)}} />}
         </>
    )
}