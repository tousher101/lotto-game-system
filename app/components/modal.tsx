import { Ionicons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ModalScreen({open,close, newPassValue,newPassOnCh,oldPassValue,oldPassOnCh,submitChanagePassword}) {
    const [secure, setSecure]=useState(true)
  

  return (
   

      <Modal
        visible={open}
        transparent
        animationType="fade"
      >
        <View className="flex-1 bg-black/40 items-center justify-center">

          <View className="bg-white w-[85%] p-5 rounded-2xl">
            <Text className="text-center font-bold text-xl mb-5">Change Password</Text>

              <View className=' flex-row items-center bg-gray-100 rounded-xl px-4 mb-4'>
                <Ionicons name='lock-closed-outline' size={20} color='gray'/>
                <TextInput value={oldPassValue} onChangeText={oldPassOnCh} placeholder='Enter Old Password'  secureTextEntry={secure} className='flex-1 py-4 ml-2'/>
                <TouchableOpacity onPress={()=>{setSecure(!secure)}}>
                    <Ionicons name={secure?"eye-off-outline":'eye-outline'} size={20} color='gray'/>
                </TouchableOpacity>
            </View>

            <View className=' flex-row items-center bg-gray-100 rounded-xl px-4 mb-4'>
                <Ionicons name='lock-closed-outline' size={20} color='gray'/>
                <TextInput value={newPassValue} onChangeText={newPassOnCh} placeholder='Enter New Password'  secureTextEntry={secure} className='flex-1 py-4 ml-2'/>
                <TouchableOpacity onPress={()=>{setSecure(!secure)}}>
                    <Ionicons name={secure?"eye-off-outline":'eye-outline'} size={20} color='gray'/>
                </TouchableOpacity>
            </View>

            <View className="flex-row justify-end gap-3">

              <TouchableOpacity onPress={()=>{close()}}>
                <Text className="text-gray-500 font-bold">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>{submitChanagePassword()}} className="bg-green-500 px-4 py-2 rounded-lg">
                <Text className="text-white font-bold">Confirm</Text>
              </TouchableOpacity>

            </View>

          </View>

        </View>
      </Modal>

  );
}