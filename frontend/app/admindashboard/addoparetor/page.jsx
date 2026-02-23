import EmployeeAddForm from "@/component/EmployeeAddForm"
import AssignEmployeeList from "@/component/AssignEmployeeList"
export default function AddOparetor(){

    return(
        <div className="w-full ">
            <h1 className="text-center text-2xl font-bold my-[10px]">Add New Oparetor</h1>
            <EmployeeAddForm/>
            <h1 className="text-center text-2xl font-bold my-[10px]">Assign Oparetor List</h1>
            <AssignEmployeeList/>

        </div>
    )
}