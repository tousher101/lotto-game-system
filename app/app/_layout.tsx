import { AgentProvider } from '@/context/agentInfo';
import { useFonts } from 'expo-font';
import { Slot } from "expo-router";
import { StatusBar } from "react-native";
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from "react-native-root-toast";
import { SafeAreaView } from "react-native-safe-area-context";
import '../global.css';

export default function RootLayout(){
    const [loaded]=useFonts({
        roboto:require('@/assets/fonts/Roboto-Regular.ttf'),
        robotoBold:require('@/assets/fonts/Roboto-Bold.ttf'),
        monospace:require('@/assets/fonts/Monospace.ttf'),
        monospaceBold:require('@/assets/fonts/MonospaceBold.ttf')
    });
    if(!loaded) return null;
return(
    <AgentProvider>
    <RootSiblingParent>
    <SafeAreaView style={{flex:1}}>
        <StatusBar className="bg-yellow-500" />
        <Slot/>
        <Toast/>
    </SafeAreaView>
    </RootSiblingParent>
    </AgentProvider>
)
}