import { createContext, useContext, useEffect, useState } from "react";
const BASEURI=process.env.EXPO_PUBLIC_BASE_URL;

const AgenInfoContext=createContext();
export const AgentProvider=({children})=>{
    const [agenInfo,setAgentInfo]=useState(null);

    const getAllAgent=async()=>{
        const res= await fetch(`${BASEURI}/api/agent/agentinfo`)
        const data= await res.json()
        setAgentInfo(data.agentData)
    };

    useEffect(()=>{
        getAllAgent()
    },[]);

    return (
        <AgenInfoContext.Provider value={{agenInfo, setAgentInfo, getAllAgent}}>{children}</AgenInfoContext.Provider>
    )
};
export const agentUserInfo=()=>useContext(AgenInfoContext)