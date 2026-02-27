import Image from "next/image"
import printLogo from '../public/printer.png'
import downloadLogo from '../public/file.png'
import * as XLSX from 'xlsx'

export default function ReportByAgentTable({branch,drewTime, dateValue, dateValueOnCh, branchIdValue,branchIdValueOnCh, drewTimeIdValue,
  drewTimeIdValueOnCh, agentData ,page, totalPage, handleNext,submitSearch,submitDetails,handlePrevious}){
      const handleDownload = () => {
      const table = document.getElementById("my-table-id");
      const rows = Array.from(table.querySelectorAll("tr"));
    
      let data = [];
      let merges = [];
    
      rows.forEach((row, rowIndex) => {
        const cells = Array.from(row.children).slice(0,-1); //slice(0,-1) for last coloum delete
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
        <div className="w-full overflow-hidden">
              <div className="flex items-center justify-evenly mt-[10px]">
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">
                    Select Date
                </label>
                <div className="relative">
                    <input  value={dateValue} onChange={dateValueOnCh} type="date" className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-200 outline-none items-center"/>
                    <span className="absolute right-3 top-2.5 text-gray-400">📅</span>
                </div>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 "> Select Station</label>
                <select value={branchIdValue} onChange={branchIdValueOnCh} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option>Station Name</option>
                {branch?.map((b)=>(
                    <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                 </select>
            </div>

              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 ">  Draw Time</label>
                <select value={drewTimeIdValue} onChange={drewTimeIdValueOnCh} className="w-full rounded-lg border border-gray-300 px-3 py-2">
                    <option> Draw Time</option>
                    {drewTime.map((d)=>(
                    <option key={d.id} value={d.id}>{d.time} {d.timePost}</option>
                    ))}
                </select>
            </div>

            <button onClick={submitSearch}  className="h-[40px] w-[120px] print:hidden cursor-pointer bg-gray-600 text-white rounded-xl border-gray-300 border">Search</button>
            </div>
             <div className="flex items-center justify-end mr-2.5 gap-8">
            <Image onClick={()=>{handlePrint()}} src={printLogo} className="h-[30px] w-[30px] cursor-pointer" alt="printer-logo"/>
            <Image onClick={()=>{handleDownload()}} src={downloadLogo} className="h-[30px] w-[30px] cursor-pointer" alt="file-logo"/>
            </div>
            
            <table id="my-table-id" className=" border border-gray-300 mt-[20px] w-[calc(100%-20px)] mx-[10px] border-collapse">
                     <thead className="bg-gray-100">
                         <tr className="text-sm">
                        <th rowSpan={2} className="p-2 border border-gray-400 text-center" >agent Code</th>
                        <th rowSpan={2} className="p-2 border border-gray-400  text-center" >Gadget Id</th>
                        <th rowSpan={2} className="p-2 border border-gray-400  text-center" >Agent Name</th>
                        <th  colSpan={4} className="p-2 border border-gray-400  text-center" >Remittence</th>
                        <th colSpan={2} className="p-2 border border-gray-400  text-center" >Payment</th>
                        <th rowSpan={2} className="p-2 border border-gray-400  text-center">Dr/Cr</th>
                        <th rowSpan={2} className="p-2 border border-gray-400  text-center print:hidden"></th>
                    </tr>
                    <tr className="text-sm">
                        <th className="p-2 border border-gray-400 text-center">Gross Amount</th>
                        <th className="p-2 border border-gray-400 text-center">Comission Amount</th>
                        <th className="p-2 border border-gray-400 text-center">RN</th>
                        <th className="p-2 border border-gray-400 text-center">Net Amount</th>
                        <th className="p-2 border border-gray-400 text-center">Win Amount</th>
                        <th className="p-2 border border-gray-400 text-center">Net Payable</th>
                    </tr>
                     </thead>
                     <tbody>
                        {
                           agentData.length===0?(  <tr>
                        <td colSpan="7" className=" text-center text-3xl font-semibold py-3">
                        Draw Not Published Yet !
                        </td>
                        </tr> ):(
                            agentData?.map((data)=>(
                                <tr key={data.id} className="text-sm">
                            <td  className="p-2 border border-gray-400 text-center">{data?.agentCode}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.gadgetId}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.name}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.grossRemit}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.comissionAmount}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.bettingFee}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.netRmiteAmount}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.netPayableAmount}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.netPayableAmount}</td>
                            <td  className="p-2 border border-gray-400 text-center">{data?.debitCredit}</td>
                            <td onClick={()=>{submitDetails(data.id)}} className="p-2 border border-gray-400 print:hidden"><button className="h-[35px] w-[100px] bg-gray-500 text-white cursor-pointer rounded-md ">Details</button></td>
                        </tr>
                            )))}
                     </tbody>
            </table>

                    <div className="flex justify-between items-center mx-2.5 mt-4 ">
                        <button disabled={page<=totalPage} onClick={handlePrevious} className="h-[40px] w-[120px] rounded-sm border border-gray-500 cursor-pointer" >		&lArr; Previous</button>
                        <p>{page} page of {totalPage}</p>
                        <button onClick={handleNext} className="h-[40px] w-[120px] rounded-sm border border-gray-500 cursor-pointer" >	Next	&rArr; </button>

                    </div>
        </div>
    )
}