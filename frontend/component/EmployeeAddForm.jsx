export default function EmployeeAddForm(){
    return(
             <form className="border-1 border-gray-400 mx-[10px] rounded-xl p-3 shadow-xs shadow-gray-500">
                <div className="flex justify-between items-center gap-2"> 
                <input required placeholder="Name" type="text" className="border-1 rounded-xl border-gray-500 w-full p-2 mb-2 focus:outline-none "/>
                <input required placeholder="Username" type="text" className="border-1 rounded-xl border-gray-500 w-full p-2  mb-2 focus:outline-none "/>
                </div>
                <div className="flex justify-between items-center gap-2">
                <input required placeholder="Email" type="email" className="border-1 rounded-xl border-gray-500 w-full p-2  mb-2 focus:outline-none "/>
                <input required placeholder="Phone" type="number" className="border-1 rounded-xl border-gray-500 w-full p-2  mb-2 focus:outline-none "/>
                </div>
                <div className="flex justify-between items-center gap-2">
                <input required placeholder="Password" type="password" className="border-1 rounded-xl border-gray-500 w-full p-2  mb-2 focus:outline-none "/>
                 <select className="p-2 border-1 border-gray-500 w-full mb-2 focus:outline-none rounded-xl">
                        <option>Select Station</option>
                </select>
                </div>
                <div className="flex justify-center items-center mt-[15px]">
                <button type="submit" className=" text-white h-[40px] w-[120px] cursor-pointer  bg-gray-500 rounded-sm">Submit</button>
                </div>    
            </form>
    )
}