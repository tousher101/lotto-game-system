
export default function AssignAgentList({totalPage, page, handleNext, handlePrevious}){
    return(
        <div>
            <h1 className="text-2xl text-center font-bold my-2.5">Make Assign Agents</h1>
            <div className=" flex justify-center m-2.5">
                <select className="w-full p-2 border border-gray-400 focus:outline-none rounded-xl">
                    <option>Select Cashier</option>
                </select>
            </div>
        <table className="border border-gray-500 text-center  border-collapse  w-[calc(100%-20px)] mx-[10px] text-sm">
            <thead className=" bg-gray-300">
                <tr>
                    <th className="p-1 border border-gray-500">Agent Code</th>
                    <th className="p-1 border border-gray-500">Gadget Id</th>
                    <th className="p-1 border border-gray-500">Name</th>
                    <th className="p-1 border border-gray-500">Assign Status</th>
                    <th className="p-1 border border-gray-500"></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td className="p-1 border border-gray-500">KID-001</td>
                <td className="p-1 border border-gray-500">KID-A-001 </td>
                <td className="p-1 border border-gray-500">Hope Lising </td>
                <td className="p-1 border border-gray-500">Not_Assign </td>
                <td className="p-1 border border-gray-500"><input type="checkbox"/> </td>
                </tr>
            </tbody>

        </table>

    {totalPage>1&&<div className="flex justify-between items-center mx-2.5 mt-4 ">
<button disabled={page<=totalPage} onClick={handlePrevious}  className="h-[40px] w-[120px] rounded-sm border border-gray-500 cursor-pointer" >		&lArr; Previous</button>
<p>{page} page of {totalPage}</p>
<button onClick={handleNext} className="h-[40px] w-[120px] rounded-sm border border-gray-500 cursor-pointer" >	Next	&rArr; </button>
</div>}
        </div>
    )
}