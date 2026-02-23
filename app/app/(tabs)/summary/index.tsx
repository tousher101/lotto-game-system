import detailsLogo from '@/assets/images/search.png';
import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";


export default function Summary(){
    const [drawTimeValue,setDrawTimeValue]=useState("10.30 AM")
    const drawTime=["10.30 AM", "2.00 PM", "5.00 PM","9.00 PM"]

    const handleDetails=()=>{
        router.push(`/summary/${1}`)
    }
return(
    <>
    <View className="flex-1 bg-[#0f0D23] p-2  ">
        <View className='mb-3'>
        <Text className="text-white text-center text-3xl font-bold  font-sans mb-3">Betting Summary</Text>
        <View className='flex-row justify-around items-center'>
            <Text className='text-white text-xs p-2 bg-green-500 rounded-xl'>Date: Today</Text>
            {drawTime.map((d,i)=>(
                <TouchableOpacity key={i} onPress={()=>{setDrawTimeValue(d)}}>
                    <Text className={`text-white p-2 text-xs ${drawTimeValue===d?'bg-red-500':'bg-blue-400'}  rounded-xl`}>{d}</Text>
                </TouchableOpacity>
            ))}
        </View>

        </View>
            <ScrollView contentContainerStyle={{paddingBottom:55}} showsVerticalScrollIndicator={false}>
                <View className="bg-[#ACBFA4] flex-row justify-between p-3 rounded-xl items-center mt-1 mb-1">
                    <Text >Bet Id Number</Text>
                    <TouchableOpacity onPress={handleDetails}>
                    <Image source={detailsLogo} className="h-[25] w-[25]"/>
                    </TouchableOpacity>
                
                </View>
            </ScrollView>

       
    </View>
    </>
    
)
}