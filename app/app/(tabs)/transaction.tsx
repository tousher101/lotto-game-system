import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
export default function Transaction(){
    const [drawTimeValue,setDrawTimeValue]=useState("10.30 AM")
        const drawTime=["10.30 AM", "2.00 PM", "5.00 PM","9.00 PM"]
return(
    <>
    <Stack.Screen options={{title:'transaction'}}/>
   
    <View className=" flex-1 bg-[#0f0D23] p-2 ">
        <Text className="text-3xl text-white text-center font-bold mb-3">Transaction Summry</Text>
           <View className='flex-row justify-around items-center'>
                    <Text className='text-white text-xs p-2 bg-green-500 rounded-xl'>Date: Today</Text>
                    {drawTime.map((d,i)=>(
                        <TouchableOpacity key={i} onPress={()=>{setDrawTimeValue(d)}}>
                            <Text className={`text-white p-2 text-xs ${drawTimeValue===d?'bg-red-500':'bg-blue-400'}  rounded-xl`}>{d}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
                <View className="flex-row justify-center">
                    <Text className="text-white bg-red-500 rounded-xl p-2 mt-2 text-xs">Today Draw Result : 324</Text>
                    
                </View>
                
                <View className="rounded-xl overflow-hidden h-[280] m-5">
                    <LinearGradient colors={["#BBCB2E","#FAB95B"]} className="h-[280]" >
                        <Text className="text-center text-xl font-bold mt-5"> Remittance Information</Text>
                        <View className="p-2">
                            <Text className="font-bold">Total Bet Receipt : 50</Text>
                            <View className="ml-6">
                                <Text>L-2 : 30 = ₱ 12000</Text>
                                <Text>S-3 : 15 = ₱ 7500</Text>
                                <Text>RS-3 : 5 = ₱ 500</Text>
                            </View>
                            <Text className="font-bold">Gross Remittance : ₱20000</Text>
                            <Text>(-) Comission (10%): ₱2000 </Text>
                            <Text className="font-bold">Before Net Remitt : ₱18000</Text>
                            <Text>(+) Betting Fee : ₱10</Text>
                            <Text className="font-bold">Net Remittance : ₱18010 </Text>
                            <Text className="font-bold" >Remittance Status : Pending</Text>
                        </View>
                    </LinearGradient>
                </View>

    <View className="overflow-hidden rounded-xl h-[280] mx-5">
        <LinearGradient colors={["#6594B1","#FAEB92"]} className="h-[280]">
            <Text className="text-center text-xl font-bold mt-5"> Payment Information</Text>
            <View className="p-2">
                <Text className="font-bold">Win Bet Receipt</Text>
                    <View className="ml-5">
                        <Text>TRX5425TYVX : S-3: 456 = ₱12000 </Text>
                        <Text>TRX5425TYVX : S-2: 56 = ₱6000 </Text>
                    </View>
                    <Text className="font-bold">Net Payable Amount : ₱18000 </Text>
                    <Text className="font-bold">Payment Status : Pending</Text>

            </View>

        </LinearGradient>
    </View>
                

                
    </View>
     </>
)
}