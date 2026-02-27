import { useUserInfo } from "@/context/userInfoContext"

export default function EmployeeAddForm({branch,nameValue,nameOnCh,emailValue,emailOnCh,userNameValue,userNameOnCh,
    phoneValue, phoneOnCh, passValue,passOnCha,branchValue,branchOnCh,submitOparetor, addressValue,addressValuOnCh,agentCodeValue,
    agentCodeOnCh,gadgetValue,gadgetOnCh, comiValue, comiOnCh, imeiValue, imeiValueOnCh
}){
    const {userInfo}=useUserInfo();
    return(
             <form onSubmit={submitOparetor} className="border-1 border-gray-500 mx-[10px] rounded-xl p-3 shadow-xs shadow-gray-500">
                <div className="flex justify-between items-center gap-2"> 
                <input value={nameValue} onChange={nameOnCh} required placeholder="Name" type="text" className="border-1 rounded-xl border-gray-400 w-full p-2 mb-2 focus:outline-none "/>
                <input value={userNameValue} onChange={userNameOnCh} required placeholder="Username" type="text" className="border-1 rounded-xl border-gray-500 w-full p-2  mb-2 focus:outline-none "/>
                </div>
                <div className="flex justify-between items-center gap-2">
                <input value={emailValue} onChange={emailOnCh}  placeholder="Email" type="email" className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>
                <input value={phoneValue} onChange={phoneOnCh} required placeholder="Phone" type="number" className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>
                </div>
                <div className="flex justify-between items-center gap-2">
                <input value={passValue} onChange={passOnCha} required placeholder="Password" type="password" className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>
                {userInfo?.role==='OPARETOR'&&<input value={addressValue} onChange={addressValuOnCh} type="text" placeholder="Address" required className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>}
                 {userInfo?.role==='ADMIN'&&<select value={branchValue} onChange={branchOnCh} className="p-2 border-1 border-gray-400 w-full mb-2 focus:outline-none rounded-xl">
                        <option value="">Select Station</option>
                        {branch.map((b)=>(
                        <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                </select>}
                </div>
                {userInfo?.role==='OPARETOR'&&<div className="flex justify-between items-center gap-2">
                <input value={agentCodeValue} onChange={agentCodeOnCh}   required placeholder="Agent Code" type="text" className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>
                <input value={gadgetValue} onChange={gadgetOnCh}  required placeholder="Gadget Id" type="text" className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>
                <input value={comiValue} onChange={comiOnCh}  required placeholder="Comission %" type="number" className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>
                </div>}
                {userInfo?.role==='OPARETOR'&& <input value={imeiValue} onChange={imeiValueOnCh} required type="number" placeholder="Gadget IMEI No" className="border-1 rounded-xl border-gray-400 w-full p-2  mb-2 focus:outline-none "/>}
                <div className="flex justify-center items-center mt-[15px]">
                <button type="submit" className=" text-white h-[40px] w-[120px] cursor-pointer  bg-gray-700 rounded-sm">Submit</button>
                </div>    
            </form>
    )
}