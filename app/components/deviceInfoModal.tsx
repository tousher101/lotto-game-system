import { useEffect, useState } from "react";
import { Modal, Text, View } from "react-native";
import DeviceInfo from 'react-native-device-info';

export default function DeviceIdScreen({open}){
    const [deviceId, setDeviceId]=useState('');
    const [deviceModel, setDeviceModel]=useState('');
    const [deviceBrand, setDeviceBrand]=useState('');
  

    const loadId= async()=>{
        const id= await DeviceInfo.getUniqueId();
        setDeviceId(id); setDeviceModel(DeviceInfo.getModel()); setDeviceBrand(DeviceInfo.getBrand())
    }

    useEffect(()=>{
        loadId();
    },[])

 
    return(
        <Modal
         visible={open}
        transparent
        animationType="fade">
            <View>
                <Text className="text-2xl text-center font-bold">Device Information</Text>
                <Text>Device Brand : {deviceBrand} </Text>
                <Text>Device Model : {deviceModel} </Text>
                <Text>Device Id  : {deviceId}</Text>
            </View>

        </Modal>
    )
}