import Link from "next/link"

export default function Layout({children}){

    return(
        <main className="max-w-[1380px] overflow-hidden flex  mx-auto ">
            <aside className="flex-[20%]  bg-[#25343F] text-white h-screen print:hidden">
                    <h1 className="text-xl font-bold text-center mt-[25px] ">Manage Dashboard</h1>
                    <Link href='/admindashboard'><h1 className="mt-[15px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Home</h1></Link>
                    <Link href='/admindashboard/addoparetor'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Add Oparetor</h1></Link>
                    <Link href='/admindashboard/addhead-cashier'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Add Head-Cashier</h1></Link>
                    <Link href='/admindashboard/addcashier'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Add Cashier</h1></Link>
                    <Link href='/admindashboard/addbranch'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Add Station</h1></Link>
                    <Link href='/admindashboard/adddrawtime'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Add Draw Time</h1></Link>
                    <Link href='/admindashboard/reportbyagent'><h1 className="mt-[10px] p-2 cursor-pointer hover:scale-105 duration-1000 ml-[15px] shadow-sm shadow-white">Report By Agent</h1></Link>
                    
                    

            </aside>

            <section className="flex-[80%] ">
                    <div>{children}</div>

            </section>

        </main>
    )
}