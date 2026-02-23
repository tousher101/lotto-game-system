import ProfileLogo from '@/assets/images/man.png';
import ModalScreen from '@/components/modal';
import { agentUserInfo } from '@/context/agentInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from "expo-router";
import { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-root-toast';




export default function Agent(){
const[openModal,setOpenModal]=useState(false);
const[oldPassword,setOldPassword]=useState('');
const [newPassword, setNewPassword]=useState('');
const {setAgentInfo,agentInfo}=agentUserInfo();
const BASEURI=process.env.EXPO_PUBLIC_BASE_URL
const router=useRouter();
const agentPasswordChange=async()=>{
const accessToken= await AsyncStorage.getItem('token')
try{
      const res= await fetch(`${BASEURI}/api/auth/agentpasswordchange`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json',
            "Authorization": `Bearer ${accessToken}`
        },
        body:JSON.stringify({oldPassword,newPassword})

    });
    const data= await res.json();
    
    if(res.ok){Toast.show(data.message||data.msg,{
        position:Toast.positions.TOP,duration:Toast.durations.LONG, backgroundColor:'green'
    })}

}catch(err){console.error(err);Toast.show(err.message||err.msg||'Something Went Wrong',{
        position:Toast.positions.TOP,duration:Toast.durations.LONG, backgroundColor:'red'
    })}
};

const handleChangePassword=()=>{
    agentPasswordChange();
    setOpenModal(false)
}

const logOut=async()=>{
await AsyncStorage.removeItem('token');
setAgentInfo(null);
router.replace('/');
}
    
return(
    <>
    <Stack.Screen options={{title:'agent'}}/>
    <View className="flex-1 bg-[#0f0D23] p-2 ">
       <View className='flex-row justify-center mt-[80]'>
        <Image source={ProfileLogo} className="h-[150] w-[150] " />
       </View>
       <View className='mt-2'>
        <Text className='text-white text-center text-2xl font-bold'>Hope Lising</Text>
       </View>
       <View className=''>
        <Text className='text-balck text-l bg-gray-400 rounded-xl p-2 mt-2 font-bold '>Agent Code : KID-001</Text>
        <Text className='text-balck text-l bg-gray-400 rounded-xl p-2 mt-2 font-bold '>Agent Branch : Kidapawan</Text>
        <Text className='text-balck text-l bg-gray-400 rounded-xl p-2 mt-2 font-bold '>Agent Phone : 099488194563</Text>
        <Text className='text-balck text-l bg-gray-400 rounded-xl p-2 mt-2 font-bold '>Agent Email : januaryhopelising@gmail.com</Text>
        <Text className='text-balck text-l bg-gray-400 rounded-xl p-2 mt-2 font-bold '>Gadget Id : KID-G-001</Text>
        <Text className='text-balck text-l bg-gray-400 rounded-xl p-2 mt-2 font-bold '>Agent Status : Active</Text>
        <Text className='text-balck text-l bg-gray-400 rounded-xl p-2 mt-2 font-bold '>Assign Status : Assigned</Text>

       </View>
       <TouchableOpacity onPress={()=>{setOpenModal(true)}} className='bg-green-500 mt-4 p-3 rounded-md '>
        <Text className='text-center font-bold text-black text-l'>Change Password</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>{logOut()}} className='bg-red-500 mt-4 p-3 rounded-md '>
        <Text className='text-center font-bold text-black text-l'>Sign Out</Text>
       </TouchableOpacity>

    </View>


    <ModalScreen open={openModal} close={()=>{setOpenModal(false)}} newPassValue={newPassword} newPassOnCh={()=>{setNewPassword()}}
        oldPassValue={oldPassword} oldPassOnCh={()=>{setOldPassword()}} submitChanagePassword={()=>{handleChangePassword()}}/>
    </>
)
}