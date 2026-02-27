export default function AssignEmployeeList({assignData,deleteEmpolye}){
    return(
        <table className="min-w-full border-1 border-gray-300 ">
            <thead className="bg-gray-300">
                <tr>
                <th className="p-2 border-b text-left">Name</th>
                <th className="p-2 border-b text-left">Email</th>
                <th className="p-2 border-b text-left">Phone</th>
                <th className="p-2 border-b text-left">Role</th>
                <th className="p-2 border-b text-left">Username</th>
                <th className="p-2 border-b text-left">Station</th>
                <th className="p-2 border-b text-left"></th>
                </tr>
            </thead>
            <tbody>
                {assignData?.map((o)=>(
                    <tr key={o.id}>
                    <td className="text-left p-2">{o.name}</td>
                    <td className="text-left p-2">{o.email}</td>
                    <td className="text-left p-2">{o.phone}</td>
                    <td className="text-left p-2">{o.role}</td>
                    <td className="text-left p-2">{o.userName}</td>
                    <td className="text-left p-2">{o.branch.name}</td>
                    <td className="text-center" ><button onClick={()=>{deleteEmpolye(o.id)}} className="bg-gray-500 - text-white h-[35px] w-[100px] cursor-pointer rounded-sm">Delete</button></td>
                </tr>
                ))}
            </tbody>

        </table>
    )
}