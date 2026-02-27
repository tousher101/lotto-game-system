import Link from "next/link"

export default function Layout({children}){

    return(
       <main className="max-w-[1380px] overflow-hidden flex  mx-auto ">
            <aside className="flex-[20%]  bg-[#25343F] text-white h-screen print:hidden">
                    <h1 className="text-xl font-bold text-center mt-[25px] ">Manage Dashboard</h1>
                    <Link href='/oparetordashboard'><h1 className="mt-[15px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Home</h1></Link>
                    <Link href='/oparetordashboard/addagent'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Add Agent</h1></Link>
                    <Link href='/oparetordashboard/allagents'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">All Agents</h1></Link>
                    <Link href='/oparetordashboard/agentgadgets'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Agent Gadget</h1></Link>
                    <Link href='/oparetordashboard/assignagents'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Make Assign Agents</h1></Link>
                    <Link href='/oparetordashboard/unassignagents'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Make Unassign Agents</h1></Link>
                    <Link href='/oparetordashboard/addhotnumber'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Add Hot Number</h1></Link>
                    <Link href='/oparetordashboard/hotnumber'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Hot Number List</h1></Link>
                    <Link href='/oparetordashboard/openbetsession'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Open Bet Session</h1></Link>
                    <Link href='/oparetordashboard/publishdrawresult'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Publish Darw Result</h1></Link>
                    
                    
                    

            </aside>

            <section className="flex-[80%] ">
                    <div>{children}</div>

            </section>

        </main>
    )
}