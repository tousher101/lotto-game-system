import { Text, View } from "react-native";
import QRCode from 'react-native-qrcode-svg';

export default function SummaryDetails(){
    const data=[{betNumber:"521", option:"S-3", drawTime:"9.00 PM",amount:"100"},
        {betNumber:"21", option:"L-3", drawTime:"9.00 PM",amount:"100"}
    ];
    const pad= (text,length)=>{return text.toString().padEnd(length," ")};
    const padStart=(text,length)=>{return text.toString().padStart(length," ")};
    const formatRaw=(bet,opt,draw,amt)=>
        pad(bet,8)+
        pad(opt,6)+
        pad(draw,8)+
        padStart(` ₱${amt}`,10)+"\n";



    let table=""
    table+=
    pad("Num",8)+
    pad("Opt",6)+
    pad("Draw",8)+
    padStart("Amt",10)+"\n";

    data.forEach((d)=>{
        table+=formatRaw(
            d.betNumber,d.option,d.drawTime,d.amount
        )
});
    return(
        <View className="flex-1 justify-center items-center bg-[#0f0D23] p-2 ">
            <View className="flex-1 bg-white  max-w-[384px]">
                <Text  className="text-center font-bold text-2xl mt-5">Bet Slip</Text>
                <View className="flex-row justify-center items-center mt-5">
                        <QRCode value="TRX-8796VB2E5MN" size={150} color="black" backgroundColor="white"/>
                </View>
                <View className="p-3">
                    <Text className="font-mono">Agent Name: Hope Lising</Text>
                    <Text className="font-mono" >Agent Code: KID-001</Text>
                    <Text className="font-mono">Branch: Kidapawan</Text>
                    <Text className="font-mono">Drew Time: 9.00 PM</Text>
                    <Text className="font-mono">Date: 02-20-2026 4:49PM</Text>
                    <Text className="font-mono">Receipt No:TRX-8796VB2E5MN</Text>
                    <Text></Text>
                    <Text className="text-center text-xl font-monobold">Betting Details</Text>
                <Text>---------------------------------------------------------------------</Text>
                    <View>
                        <Text className="font-mono text-[14px]">
                            {table}
                        </Text>
                    </View>
                 
                    <Text>---------------------------------------------------------------------</Text>
                    <Text className="text-right font-monobold">Total Amount: ₱200</Text>
                </View>
                <Text className="text-center font-monobold">Thank you for betting</Text>
            </View>
            
        </View>
    )
}