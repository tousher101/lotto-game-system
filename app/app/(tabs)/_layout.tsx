import homeLogo from '@/assets/images/home.png';
import summaryLogo from '@/assets/images/summary-check.png';
import transactionLogo from '@/assets/images/transaction.png';
import personLogo from '@/assets/images/user.png';
import { Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from 'react-native';

const TabIcon = ({img, title, focused}:any)=>{
  if(focused) {
  return(
      
          <ImageBackground className='bg-yellow-500  rounded-full  flex-row  flex-1 justify-center items-center  mt-3 min-w-[85px] overflow-hidden min-h-[40px]'>
            <Image className='h-[20px] w-[20px] mr-[5px]' source={img}  />
           <Text className='font-semibold text-xs'>{title}</Text>
          </ImageBackground>
          
  )
} else{
  return(
  <View className='size-full justify-center items-center mt-4 rounded-full'>
    <Image source={img}  className='size-6' />
  </View>
)

}

}



const _layout = () => {
  return (
    <Tabs screenOptions={{tabBarShowLabel:false, tabBarItemStyle:{width:'100%', height:'100%', justifyContent:'center', alignItems:'center'},
    tabBarStyle:{
      backgroundColor:'#E2E8CE',
      borderRadius: 50,
      marginHorizontal:10,
      marginBottom:5,
      height:50,
      position:'absolute',
      overflow:'hidden',
      borderWidth:1,
      borderColor:'#0f0D23'
    }
    }}>
      <Tabs.Screen name='index' options={{headerShown:false, title:'Home',
        tabBarIcon:({focused})=>(
          <TabIcon img={homeLogo} title={'Home'} focused={focused}/>
        )
        
      }}/>
      <Tabs.Screen name='summary/index' options={{headerShown:false,title:'summary', tabBarIcon:({focused})=>(
        <TabIcon img={summaryLogo} title={'Betting'} focused={focused}/>
        
      )}}/>
      <Tabs.Screen
    name="summary/[id]"
    options={{
      href: null, headerShown:false
    }}/>
      <Tabs.Screen name='transaction' options={{headerShown:false, title:'Transaction', tabBarIcon:({focused})=>(
        <TabIcon img={transactionLogo} title={'Report'} focused={focused} />

      )}}/>
       <Tabs.Screen name='agent' options={{headerShown:false, title:'agent', tabBarIcon:({focused})=>(
      <TabIcon img={personLogo} title={'Profile'} focused={focused}/>

       )}}/>
    
    </Tabs>
  )
}

export default _layout
