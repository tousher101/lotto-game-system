import profileLogo from '../public/User-2.gif'
import Image from 'next/image'
import { useUserInfo } from '../context/userInfoContext'

export default function UserProfileModal({cancelModal, logOut}){
  const {userInfo}=useUserInfo()

    return(
         <div className="fixed top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-50  " >
          <div className="grid justify-items-center center content-center items-center bg-[#FCFCF7] p-[15px] rounded-2xl w-[350px] text-center text-black relative" >
              <p className='text-2xl font-bold'>Profile</p>
                <div className="flex justify-center rounded-4xl mt-[25px]">
                  <Image src={profileLogo} height={80} width={80} alt='profile-photo' className='rounded-xl'/>
                </div>
                <div className='text-m font-semibold mt-[20px]'>
                    <h1>{userInfo.name}</h1>
                    <h2>{userInfo.email}</h2>
                    <h3>{userInfo.phone}</h3>
                    <h3>{userInfo.role}</h3>
                    <h3>{userInfo.userName}</h3>
                </div>
           <div className="flex items-center gap-2 text-white mt-[25px]">
            <button onClick={cancelModal} className=' h-[40px] w-[90px]  bg-green-500 rounded-xl  cursor-pointer'>Cancel</button>
              <button onClick={logOut} className=' h-[40px] w-[90px]  bg-red-500 rounded-xl  cursor-pointer'>Logout</button>
           </div>
              
          </div>
          <div>
           
          </div>
        
      </div>
    )
}