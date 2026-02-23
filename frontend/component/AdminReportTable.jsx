import Image from "next/image"
import printLogo from '../public/printer.png'
import downloadLogo from '../public/file.png'

export default function DataTable({branch,drewTime}){

    return(
        <div className="max-w-full overflow-hidden ">
            <div className="flex items-center justify-evenly mt-[10px]">
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                    Select Date
                </label>
                <div className="relative">
                    <input type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-200 outline-none items-center"/>
                    <span className="absolute right-3 top-2.5 text-gray-400">📅</span>
                </div>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 "> Select Station</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>Station Name</option>
                {branch?.map((b)=>(
                    <option key={b.id}>{b.name}</option>
                    ))}
                 </select>
            </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 ">  Draw Time</label>
                <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option> Draw Time</option>
                    {drewTime.map((d)=>(
                    <option key={d.id}>{d.time} {d.timePost}</option>
                    ))}
                </select>
            </div>

            <button className="h-[40px] w-[120px] cursor-pointer bg-gray-600 text-white rounded-xl border-gray-300 border">Search</button>
            </div>
            <div className="flex items-center justify-around mt-[25px]">
                <h1 className="font-bold">Total Station In Amount:</h1>
                <h1 className="font-bold">Total Station Out Amount:</h1>
                <h1 className="font-bold">Debit/Credit:</h1>
                <div className="flex items-center gap-8">
                    <Image src={printLogo} className="h-[30px] w-[30px] cursor-pointer" alt="printer-logo"/>
                 <Image src={downloadLogo} className="h-[30px] w-[30px] cursor-pointer" alt="file-logo"/>
                </div>
             

            </div>
            <table className=" border-1 border-gray-300 mt-[20px] min-w-full  mx-[10px] ">
                <thead className="bg-gray-100">
                    <tr>
                        <th rowSpan={2} className="p-2 border border-gray-400 text-center" >Cashier Name</th>
                        <th rowSpan={2} className="p-2 border border-gray-400  text-center" >Total In Amount</th>
                        <th rowSpan={2} className="p-2 border border-gray-400  text-center" >Total Out Amount</th>
                        <th  colSpan={2} className="p-2 border border-gray-400  text-center" >Total Pending Amount</th>
                        <th colSpan={2} className="p-2 border border-gray-400  text-center" >Total Settled Amount</th>
                       

                    </tr>
                    <tr>
                        <th className="p-2 border border-gray-400  text-center">In</th>
                        <th className="p-2 border border-gray-400  text-center">Out</th>
                           <th className="p-2 border border-gray-400  text-centert">In</th>
                        <th className="p-2 border border-gray-400  text-center">Out</th>
                    </tr>

                    <tr>
                        <td className="p-2 border border-gray-400  text-center">Hope Lising</td>
                        <td className="p-2 border border-gray-400  text-center">In Amount</td>
                        <td className="p-2 border border-gray-400  text-center">Out Amount</td>
                        <td className="p-2 border border-gray-400  text-center">P In Amount</td>
                        <td className="p-2 border border-gray-400  text-center">P Out Amount</td>
                        <td className="p-2 border border-gray-400  text-center">S In Amount</td>
                        <td className="p-2 border border-gray-400  text-center">S Out Amount</td>
                        
                    </tr>

                    <tr></tr>
                </thead>
              
            </table>



        </div>
    )
}