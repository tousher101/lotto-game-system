
export default  function AgentReportDetailsModal({closeModal, detailsData}){
    return(
        <div className="fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50  " >
                  <div className="grid justify-items-center center content-center items-center bg-[#FCFCF7] p-[15px] rounded-2xl w-[500px] text-center text-black relative" >
                      <p className='text-2xl font-bold'>Agent Details</p>
                        <div className="flex gap-5  mt-2.5 text-sm">
                          <h1>Agent Name : {detailsData?.agent?.name}</h1>
                          <h1>Branch : {detailsData?.agent?.branch?.name}</h1>
                        </div>
                          <div className="flex gap-5 text-sm">
                          <h1>Agent Code : {detailsData?.agent?.agentCode}</h1>
                          
                        </div>
                        <div className="flex items-center justify-center">
                    <table className=" border border-gray-400 mt-[20px] w-[calc(100%-20px)] mx-[10px] border-collapse">
                      <thead className="bg-gray-300 border border-gray-500">
                        <tr>
                            <th colSpan={3} className="p-1 border border-gray-500 text-center">Betting</th>
                        </tr>
                        <tr className="text-sm">
                            <th className="p-1 border border-gray-500 text-center">Option</th>
                            <th className="p-1 border border-gray-500 text-center"> Bet</th>
                            <th className="p-1 border border-gray-500 text-center"> Amount</th>
                        </tr>
                        
                      </thead>
                      <tbody className="text-xs">
                        <tr>
                            <td className="p-1 border border-gray-500 text-center">L-2</td>
                            <td className="p-1 border border-gray-500 text-center">{detailsData?.totalL2BetCount}</td>
                            <td className="p-1 border border-gray-500 text-center">{detailsData?.totalL2BetAmount}</td>
                          
                        </tr>
                        <tr>
                            <td className="p-1 border border-gray-500 text-center">S-3</td>
                            <td className="p-1 border border-gray-500 text-center">{detailsData?.totalS3Count}</td>
                            <td className="p-1 border border-gray-500 text-center">{detailsData?.totalS3betAmount}</td>
                        </tr>
                        <tr>
                            <td className="p-1 border border-gray-500 text-center">RS-3</td>
                            <td className="p-1 border border-gray-500 text-center">{detailsData?.totlRS3BetCount}</td>
                            <td className="p-1 border border-gray-500 text-center">{detailsData?.totalRS3BetAmount}</td>
                            
                        </tr>
                        
                        
                      </tbody>

                    </table>
                    <table className=" border border-gray-400 mt-[20px] w-[calc(100%-20px)] mx-[10px] border-collapse">
                        <thead className="bg-gray-300 border border-gray-500">
                            <tr>
                                <th colSpan={3} className="p-1 border border-gray-500 text-center">Wining</th>
                            </tr>
                            <tr className="text-sm">
                                <th className="p-1 border border-gray-500 text-center">Bet Slip</th>
                                <th className="p-1 border border-gray-500 text-center">Option</th>
                                <th className="p-1 border border-gray-500 text-center">Win Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detailsData?.winingData?.agentWining?.map((w)=>(
                                <tr className="text-xs" key={w.id}>
                                <td className="p-1 border border-gray-500 text-center"> {w.betTrxId}</td>
                                <td className="p-1 border border-gray-500 text-center"> {w.bettingOption}</td>
                                <td className="p-1 border border-gray-500 text-center"> {w.amount}</td>

                            </tr>
                            ))}
                        </tbody>

                    </table>
                    </div>

                       
                   <div className="flex items-center gap-2 text-white mt-[25px]">
                    <button onClick={closeModal} className=' h-[40px] w-[90px]  bg-green-500 rounded-xl  cursor-pointer'>Cancel</button>
                   </div>
                      
                  </div>
                  <div>
                   
                  </div>
                
              </div>
    )
}