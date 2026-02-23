export default function AssignEmployeeList(){
    return(
        <table className="min-w-full border-1 border-gray-300 ">
            <thead className="bg-gray-300">
                <th className="p-2 border-b text-left">Name</th>
                <th className="p-2 border-b text-left">Email</th>
                <th className="p-2 border-b text-left">Phone</th>
                <th className="p-2 border-b text-left">Role</th>
                <th className="p-2 border-b text-left">Username</th>
                <th className="p-2 border-b text-left">Station</th>
                <th className="p-2 border-b text-left"></th>

            </thead>
            <tbody>
                <tr>
                    <td className="text-left p-2">Hope Lising</td>
                    <td className="text-left p-2">hope@gmail.com</td>
                    <td className="text-left p-2">09488194563</td>
                    <td className="text-left p-2">Oparetor</td>
                    <td className="text-left p-2">ehasan</td>
                    <td className="text-left p-2">Kidapawan</td>
                    <td className="text-center" ><button className="bg-gray-500 - text-white h-[35px] w-[100px] cursor-pointer rounded-sm">Delete</button></td>
                </tr>
            </tbody>

        </table>
    )
}