
import { auth, provider } from "../../firebaseconfig"
import {signInWithPopup} from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'

const Login = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      localStorage.setItem('user', JSON.stringify(data.user.providerData[0]))
      const { displayName, photoURL } = data.user;
      const googleId = data.user.providerData[0].uid;
      const doc = {
        _id:googleId,
        _type: 'user',
        userName: displayName,
        image:photoURL,
      }
      client.createIfNotExists(doc)
        .then(() => {
        navigate('/',{replace:true})
      })
    })
  }

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="sharemelogo" width="130px" />
          </div>
          <div className="shadow-2xl">
            <button type='button' className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none' onClick={handleClick}>
             <FcGoogle className='mr-4'/> Sign in with Google
         </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login