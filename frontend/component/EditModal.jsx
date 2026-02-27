import { useUserInfo } from "@/context/userInfoContext"
export default function EditModal({cancelModal,timeValue,timeValuOnCh,timePostValue,timePostOnCh,handleSubmit, gadgetValue, gadgetOnCh, imeiValue,imeiOnCh}){
    const {userInfo}=useUserInfo();
    return(
        <div className="fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50  " >
                  <div className="grid justify-items-center center content-center items-center bg-[#FCFCF7] p-[15px] rounded-2xl w-[350px] text-center text-black relative" >
                      {useUserInfo?.role==='ADMIN'&&<h1 className='text-2xl font-bold'>Edit Draw Time</h1>}
                      <h1 className='text-2xl font-bold'>Edit Agent Gadget</h1>
                    {useUserInfo?.role==='ADMIN'&&<input value={timeValue} onChange={timeValuOnCh}  type="text" placeholder="Draw Time" className="p-2 mt-[15px] rounded-xl border-1 w-full border-gray-400 focus:outline-none"/>}
                    {useUserInfo?.role==='ADMIN'&&<select value={timePostValue} onChange={timePostOnCh}  className="p-2 rounded-xl border-1 w-full border-gray-400 focus:outline-none mt-[10px]">
                    <option>Select Time Post</option>
                    <option value='AM'>AM</option>
                    <option value='PM'>PM</option>
                </select>}
                    <input value={gadgetValue} onChange={gadgetOnCh} type="text" placeholder="Gadget Id" className="p-2 mt-[15px] rounded-xl border-1 w-full border-gray-400 focus:outline-none"/>
                    <input value={imeiValue} onChange={imeiOnCh} type="number" placeholder="IMEI No" className="p-2 mt-[15px] rounded-xl border-1 w-full border-gray-400 focus:outline-none"/>
                        
                   <div className="flex items-center justify-center text-white mt-[25px] gap-2">
                    <button onClick={cancelModal} className=' h-[40px] w-[90px]  bg-red-500 rounded-xl  cursor-pointer'>Cancel</button>
                    <button onClick={handleSubmit} className=' h-[40px] w-[90px]  bg-gray-500 text-white rounded-xl  cursor-pointer'>Submit</button>
                   </div>
                  
                      
                  </div>
                  <div>
                   
                  </div>
                
              </div>
    )
}