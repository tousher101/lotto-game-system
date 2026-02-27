export default function DeleteModal({close, submitDelete}){
    return(
        <div className="fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50">
            <div  className="grid justify-items-center center content-center items-center bg-[#FCFCF7] p-[15px] rounded-2xl w-[350px] text-center text-black relative">
                <h1 className="text-2xl font-bold text-center my-2.5 text-red-600">WARNING!</h1>
                <h1 className="text-xl mb-2.5">Are You Sure! You Want To Delete?</h1>
                <div className="flex items-center justify-center gap-3">
                    <button onClick={close} className="h-[40px] w-[120px] rounded-xl bg-red-500 text-white cursor-pointer">No</button>
                    <button onClick={submitDelete} className="h-[40px] w-[120px] rounded-xl bg-green-500 text-white cursor-pointer">Yes!</button>
                </div>
            </div>
            
        </div>
    )
}