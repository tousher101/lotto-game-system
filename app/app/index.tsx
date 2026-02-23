
import logo from '@/assets/images/stl-logo.jpg'
import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LinearGradient } from 'expo-linear-gradient'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-root-toast'

export default function LoginScreen(){
const [secure,setSecure]=useState(true);
const [loading,setLoading]=useState(false);
const [userName, setUserName]=useState('');
const [password, setPassword]=useState('');
const BASEURI=process.env.EXPO_PUBLIC_BASE_URL;
const router=useRouter();

const fetchLogin=async()=>{
   
    try{
        setLoading(true)
        const res= await fetch(`${BASEURI}/api/auth/agentlogin`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({userName,password})
        });
        const data= await res.json();
        
        
        if(res.ok){Toast.show(data.message || data.msg ||'Login Success!',{
            duration:Toast.durations.SHORT, position:Toast.positions.TOP,backgroundColor:'green'
        }); await AsyncStorage.setItem('token',data.accessToken)} else{
            throw new Error(data.message||data.msg||'Login Failed')
        }
        
    }catch(error){setLoading(false); console.log(error.message);Toast.show(error.message||'Something Went Wrong',{
        position:Toast.positions.TOP,duration:Toast.durations.SHORT,backgroundColor:'red',delay:0,
    })}
   
}

const handleSubmit=()=>{

router.replace('/(tabs)')
}


    return(
         <LinearGradient colors={["#362F4F","#25343F"]} className='flex-1 justify-center px-6'>
            <View className='bg-white/90 p-6 rounded-3xl shadow-xl'>
           <View className=' items-center mb-[15px]'>
            <Image className='h-[60] w-[60] ' source={logo}/>
           </View>
            <Text  className='text-center text-gray-800 text-3xl font-bold'>Welcome Back!</Text>
            <Text className='text-center text-gray-500 text-m mb-6'>Login To Your Account</Text>

            <View className=' flex-row items-center bg-gray-100 rounded-xl px-4 mb-4'>
            <Ionicons name='person-circle-outline' size={20} color='gray'/>
            <TextInput value={userName}onChangeText={(text)=>setUserName(text)} placeholder='Username' className='flex-1 py-4 ml-2'/>
            </View>
            <View className=' flex-row items-center bg-gray-100 rounded-xl px-4 mb-4'>
                <Ionicons name='lock-closed-outline' size={20} color='gray'/>
                <TextInput placeholder='Password' value={password} onChangeText={(text)=>setPassword(text)} secureTextEntry={secure} className='flex-1 py-4 ml-2'/>
                <TouchableOpacity onPress={()=>{setSecure(!secure)}}>
                    <Ionicons name={secure?"eye-off-outline":'eye-outline'} size={20} color='gray'/>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={()=>{handleSubmit()}} className='bg-indigo-600 py-4 rounded-xl items-center'>
                {loading?(<ActivityIndicator color='white'/>):(<Text className=' text-white font-bold text-lg'>Login</Text>)}
            </TouchableOpacity>

     
            </View>
        </LinearGradient>
    )
}