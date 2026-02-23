import { BluetoothEscposPrinter } from 'react-native-thermal-receipt-printer';

export const tharmanlPrint58= async(data)=>{
  
  const BASEURI=process.env.EXPO_BASE_URL
 
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
            d.betNumber,d.option,d.drawTime,` ₱${d.amount}`
        )
});
    const line= "--------------------------------";
  
    try{
      await  BluetoothEscposPrinter.setTextSize(1,1);
      await  BluetoothEscposPrinter.setAlignment(
        BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.setTextSize(2,2);
      await BluetoothEscposPrinter.printText("STL-Lotto Company\n");
      await  BluetoothEscposPrinter.setTextSize(1,1);
      await BluetoothEscposPrinter.printText('Offical Receipt\n');
      await BluetoothEscposPrinter.printText("\n");
      await BluetoothEscposPrinter.printQRCode(`${BASEURI}/verify/?code=${data.trxId}`,200,
        BluetoothEscposPrinter.ERROR_CORRECTION.L);
      await BluetoothEscposPrinter.printText(line+"\n");
      await BluetoothEscposPrinter.setAlignment(
        BluetoothEscposPrinter.ALIGN.LEFT
      );
      await BluetoothEscposPrinter.printText(`Agent: ${data.agentName}\n`);
      await BluetoothEscposPrinter.printText(`Code: ${data.agentCode}\n`);
      await BluetoothEscposPrinter.printText(`Branch: ${data.branch}\n`);
      await BluetoothEscposPrinter.printText(`DrawTime: ${data.time}${data.timePost}\n`);
      await BluetoothEscposPrinter.printText(`Date: ${new Date(data.createdAt).toLocaleString('en-PH')}\n`);
      await BluetoothEscposPrinter.printText(`Receipt No: ${data.TrxBet}\n`);
      await BluetoothEscposPrinter.printText(line+"\n")
      await  BluetoothEscposPrinter.setAlignment(
        BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.printText('Bet Details\n');
      await BluetoothEscposPrinter.printText(table+'\n');
      await BluetoothEscposPrinter.printText(line+'\n')
      await BluetoothEscposPrinter.setAlignment(
        BluetoothEscposPrinter.ALIGN.RIGHT
      )
      await BluetoothEscposPrinter.printText(pad("TOTAL", 22) + padStart(`₱${data.totalBetAmount}`, 10) + "\n");
        await  BluetoothEscposPrinter.setAlignment(
        BluetoothEscposPrinter.ALIGN.CENTER
      );
      await BluetoothEscposPrinter.printText("\nThank you for betting!\n\n\n")
        

    }catch(error){console.log("Print Error",error)}
};