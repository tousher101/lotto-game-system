"use client"

import Image from "next/image"
import printLogo from '../public/printer.png'
import downloadLogo from '../public/file.png'
import * as XLSX from 'xlsx'
import { useUserInfo } from "../context/userInfoContext"

export default function DataTable({branch,drewTime, dateValue, dateValueOnCh, branchIdValue,branchIdValueOnCh, drewTimeIdValue,
  drewTimeIdValueOnCh, totalData,submitSearch
}){
const totalIn=totalData?.totalInOutAmount?.totalInAmount;
const totalOut=totalData?.totalInOutAmount?.totalOutAmount
  const debitCedit= (totalIn-totalOut);
  const {userInfo}=useUserInfo()

    const handleDownload = () => {
  const table = document.getElementById("my-table-id");
  const rows = Array.from(table.querySelectorAll("tr"));

  let data = [];
  let merges = [];

  rows.forEach((row, rowIndex) => {
    const cells = Array.from(row.children); //slice(0,-1) for last coloum delete
    let colIndex = 0;

    data[rowIndex] = data[rowIndex] || [];

    cells.forEach((cell) => {
      while (data[rowIndex][colIndex] !== undefined) colIndex++;

      data[rowIndex][colIndex] = cell.innerText;

      const rowSpan = cell.rowSpan || 1;
      const colSpan = cell.colSpan || 1;

     
      if (rowSpan > 1 || colSpan > 1) {
        merges.push({
          s: { r: rowIndex, c: colIndex },
          e: {
            r: rowIndex + rowSpan - 1,
            c: colIndex + colSpan - 1,
          },
        });
      }

      
      for (let r = 0; r < rowSpan; r++) {
        for (let c = 0; c < colSpan; c++) {
          if (r === 0 && c === 0) continue;

          data[rowIndex + r] = data[rowIndex + r] || [];
          data[rowIndex + r][colIndex + c] = "";
        }
      }

      colIndex++;
    });
  });

 
  const ws = XLSX.utils.aoa_to_sheet(data);
  ws["!merges"] = merges;


  Object.keys(ws).forEach((key) => {
    if (key[0] === "!") return;

    ws[key].s = {
      alignment: {
        wrapText: true,
        vertical: "center",
        horizontal: "center",
      },
      font: {
        name: "Calibri",
        sz: 11,
      },
    };
  });


  const colWidths = data[0].map((_, colIndex) => {
    let maxLength = 10;

    data.forEach((row) => {
      const cell = row[colIndex];
      if (cell) {
        maxLength = Math.max(maxLength, cell.toString().length);
      }
    });

    return { wch: maxLength + 2 };
  });

  ws["!cols"] = colWidths;


  ws["!rows"] = data.map((row) => {
    const maxLine = Math.max(
      ...row.map((cell) =>
        cell ? Math.ceil(cell.toString().length / 25) : 1
      )
    );

    return { hpt: maxLine * 15 };
  });


  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  XLSX.writeFile(wb, `Clean_Data ${new Date().toDateString()}.xlsx`);
};


const handlePrint=()=>{
    window.print();
}
  
    return(
        <div className="w-full overflow-hidden ">
            <div className="flex items-center justify-evenly mt-[10px]">
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                    Select Date
                </label>
                <div className="relative">
                    <input value={dateValue} onChange={dateValueOnCh} type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-200 outline-none items-center"/>
                    <span className="absolute right-3 top-2.5 text-gray-400">📅</span>
                </div>
            </div>
            {userInfo?.role==='ADMIN'&&<div>
                <label className="text-sm font-medium text-gray-700 block mb-1 "> Select Station</label>
                <select value={branchIdValue} onChange={branchIdValueOnCh} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>Station Name</option>
                {branch?.map((b)=>(
                    <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                 </select>
            </div>}

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 ">  Draw Time</label>
                <select value={drewTimeIdValue} onChange={drewTimeIdValueOnCh} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option> Draw Time</option>
                    {drewTime.map((d)=>(
                    <option key={d.id} value={d.id}>{d.time} {d.timePost}</option>
                    ))}
                </select>
            </div>

            <button onClick={submitSearch} className="h-[40px] w-[120px] print:hidden cursor-pointer bg-gray-600 text-white rounded-xl border-gray-300 border">Search</button>
            </div>
            <div className="flex items-center justify-around mt-[25px]">
                <h1 className="font-bold text-green-500">Total Station In Amount: {totalIn||'0.00'}</h1>
                <h1 className="font-bold text-red-500">Total Station Out Amount: {totalOut||'0.00'}</h1>
                <h1 className={`font-bold ${totalIn>totalOut?'text-green-500':'text-red-500'}`}>Debit/Credit: {debitCedit||"0.00"}</h1>
                <div className="flex items-center gap-8">
                <Image onClick={()=>{handlePrint()}} src={printLogo} className="h-[30px] w-[30px] cursor-pointer" alt="printer-logo"/>
                 <Image onClick={()=>{handleDownload()}} src={downloadLogo} className="h-[30px] w-[30px] cursor-pointer" alt="file-logo"/>
                </div>
             

            </div>
            <table id="my-table-id" className=" border border-gray-300 mt-[20px] w-[calc(100%-20px)] mx-[10px] border-collapse">
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
                           <th className="p-2 border border-gray-400  text-center">In</th>
                        <th className="p-2 border border-gray-400  text-center">Out</th>
                    </tr>
                    </thead>
                    <tbody>

                    {totalData?.users?.length===0 ?(
                        <tr>
                        <td colSpan="7" className=" text-center text-3xl font-semibold py-3">
                        Draw Not Published Yet !
                        </td>
                        </tr>
                    ):(
                      totalData?.users?.map((user)=>(
                      <tr key={user.id}>
                        <td className="p-2 border border-gray-400  text-center">{user?.name}</td>
                        <td className="p-2 border border-gray-400  text-center">{totalData?.report[user.id]?.totalIn ?? "0.00"}</td>
                        <td className="p-2 border border-gray-400  text-center">{totalData?.report[user.id]?.totalOut ?? "0.00"}</td>
                        <td className="p-2 border border-gray-400  text-center">{totalData?.report[user.id]?.pendingIn ?? "0.00"}</td>
                        <td className="p-2 border border-gray-400  text-center">{totalData?.report[user.id]?.pendingOut ?? "0.00"}</td>
                        <td className="p-2 border border-gray-400  text-center">{totalData?.report[user.id]?.settledIn ?? "0.00"}</td>
                        <td className="p-2 border border-gray-400  text-center">{totalData?.report[user.id]?.settledOut ?? "0.00"}</td>
                    </tr>
                    ))
                    )}
                    </tbody>
                
              
            </table>



        </div>
    )
}