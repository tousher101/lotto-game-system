import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Toast from "react-native-root-toast";

const drawTimes = ["2PM", "5PM", "8PM"];

const betOptions = ["L-2", "S-3", "RS-3"];

const dummyResults = 452;

export default function Index() {
  const [selectedDraw, setSelectedDraw] = useState("2PM");
  const [selectedBet, setSelectedBet] = useState("L-2");
  const [amount,setAmount]=useState('');
  const [numbers, setNumbers] = useState([]);
  const [betList, setBetList] = useState([]);
  const [inputMode,setInputMode]=useState('numbers')

  const maxDigits = selectedBet === "L-2" ? 2 : 3;
  const maxAmount= selectedAmount===100

  const handleNumber = (num) => {
    if (numbers.length < maxDigits) {
      setNumbers([...numbers, num]);
    }
  };

  const handleDelete = () => {
    if(amount.length>0){setAmount(p=>p.slice(0,-1))}else{
    setNumbers(p=>p.slice(0,-1))}
  };

  const handleAdd = () => {
    if (numbers.length===0||!amount||!selectedBet||!selectedDraw){ Toast.show('All fields required',
      {position:Toast.positions.TOP,duration:Toast.durations.LONG,backgroundColor:'red'}
    ); return  } 
    if(amount>100){ Toast.show('Max: bet amount is  ₱100',
      {position:Toast.positions.TOP,duration:Toast.durations.LONG,backgroundColor:'red'}
    ); return }
     
    setBetList(p=>[...p,{ 
    id: Date.now().toString(),
    numbers: numbers.join(''),
    amount,
    selectedBet,
    selectedDraw}]);
    setNumbers([]);
    setAmount('')
    }
  const screenWidth= Dimensions.get("window").width
  const BUTTON_SIZE=screenWidth/4-20

  return (
    <>
    <Stack.Screen options={{title:'Home'}}/>
    <View className="flex-1 bg-[#0f0D23] p-2 relative ">

      {/* Draw Time + Result */}
      <Text className="text-yellow-400  text-center text-sm font-bold">Drew Time</Text>
      <View className="flex-row justify-evenly items-center mb-2 mt-2">
        {drawTimes.map((time) => (
          <TouchableOpacity
            key={time}
            onPress={() => setSelectedDraw(time)}
            className={`px-4 py-2 rounded-full ${
              selectedDraw === time ? "bg-blue-600" : "bg-slate-700"
            }`}
          >
            <Text className="text-white text-xs font-bold">{time}</Text>
          </TouchableOpacity>
        ))}
      </View>


      {/* Bet Option */}
      <Text className="text-yellow-400 text-center text-sm font-bold">Betting Option</Text>
      <View className="flex-row justify-evenly mb-2 mt-2">
        {betOptions.map((opt) => (
          <TouchableOpacity
            key={opt}
            onPress={() => {
              setSelectedBet(opt);
              setNumbers([]);
            }}
            className={`px-4 py-2 rounded-full ${
              selectedBet === opt ? "bg-green-500" : "bg-slate-700"
            }`}
          >
            <Text className="text-white text-xs font-bold">{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text className="text-yellow-400 text-center text-sm mb-2 font-bold">Draw Result</Text>
      <View className="flex-row justify-evenly" >
        {drawTimes.map((d,i)=>(
          <View key={i} >
            <Text className="text-white text-xs bg-green-500 rounded-2xl px-2 py-1">{d} - {dummyResults}</Text>
          </View>
        ))}
      </View>

      {/* Number Boxes */}
     <View className="flex-row justify-center content-center items-center mt-2">
      <TouchableOpacity onPressIn={()=>setInputMode('numbers')}>
      <View className="flex-row justify-center content-center items-center mt-2">
        {Array.from({ length: maxDigits }).map((_, i) => (
        
          <View
            key={i}
            className="h-10 w-10 mx-2 bg-slate-800 rounded-2xl items-center justify-center border border-blue-500"
          >
            <Text className="text-white text-xl">
              {numbers[i] ?? ""}
            </Text>
            
          </View>
      
           
        ))}
      </View>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => setInputMode("amount")}>
        <View className="bg-gray-500 px-6 py-3 rounded-xl w-[150] ">
          <Text className="text-white ">₱ {amount||0}</Text>
        </View>
        </TouchableOpacity>
      </View>


      {/* Calculator Keypad */}
     
    <View className="flex-row flex-wrap justify-center">
  {[1,2,3,4,5,6,7,8,9,0].map((n) => (
    <TouchableOpacity
      key={n}
      onPress={() => inputMode==='numbers'? handleNumber(n):setAmount(prev=>prev+n)}
      style={{width:BUTTON_SIZE,height:BUTTON_SIZE}}
      className="m-2 bg-blue-600 rounded-2xl items-center justify-center"
    >
      <Text className="text-white text-2xl">{n}</Text>
    </TouchableOpacity>
  ))}

    {/* ADD */}
  <TouchableOpacity
    onPress={handleAdd} style={{width:BUTTON_SIZE,height:BUTTON_SIZE}}
    className=" m-2 bg-yellow-500 rounded-2xl items-center justify-center"
  >
    <Text className="font-bold text-lg">ADD</Text>
  </TouchableOpacity>

  {/* DELETE */}
  <TouchableOpacity
    onPress={handleDelete} style={{width:BUTTON_SIZE,height:BUTTON_SIZE}}
    className=" m-2 bg-red-500 rounded-2xl items-center justify-center"
  >
    <Text className="text-white text-xl">⌫</Text>
  </TouchableOpacity>


</View>

    <View className=" flex-row bg-slate-700 py-2 justify-between ">
        <Text className="flex-1 text-white text-center text-xs">Bet Number</Text>
        <Text className="flex-1 text-white text-center text-xs">Bet Option</Text>
        <Text className="flex-1 text-white text-center text-xs">Draw Time</Text>
        <Text className="flex-1 text-white text-center text-xs">Bet Amount</Text>
        <Text className="flex-1 text-white text-center text-xs">Action</Text>
       
        
    </View>
    <View className="max-h-[140]">
    <ScrollView>
    {betList.map((item,index)=>(
        <View key={index} className="flex-row py-2 items-center justify-between" >
            <Text className="flex-1 text-white text-center">{item.numbers}</Text>
            <Text className="flex-1 text-white text-center">{item.selectedBet}</Text>
            <Text className="flex-1 text-white text-center">{item.selectedDraw}</Text>
             <Text className="flex-1 text-white text-center">₱{item.amount}</Text>

               <TouchableOpacity
              onPress={() =>
                setBetList(betList.filter((b) => b.id !== item.id))
              }
            className="mr-5">
              <Text className="text-red-400">Delete</Text>
            </TouchableOpacity>
            

        </View>
        
    ))}
    </ScrollView>
    </View>
    

      <View className="bottom-[60] right-0 left-0 absolute">
      <TouchableOpacity className="mt-4 bg-green-600 py-2 rounded-2xl items-center">
        <Text className="text-white text-lg font-bold">PLACE BET</Text>
      </TouchableOpacity>
      </View>
    
    </View>
    </>
      
    
  );
}
