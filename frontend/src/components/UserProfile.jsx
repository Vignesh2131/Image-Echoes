import { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { auth, provider } from "../../firebaseconfig";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const notActiveBtnStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";
  const randomImg =
    "https://source.unsplash.com/1200x600/?nature,photography,cars,space,sports,buildings,anime,movie";

const UserProfile = () => {
   const [user, setUser] = useState();
   const [pins, setPins] = useState();
   const [text, setText] = useState("Created");
   const [activeBtn, setActiveBtn] = useState("created");
   const navigate = useNavigate();
   const { userId } = useParams();
   
   useEffect(() => {
     const query = userQuery(userId);
     client.fetch(query).then((data) => {
       setUser(data[0]);
     });
   }, [userId]);
  
  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading Profile.."/>
  }
  const handleClick =async() => {
    try {
      localStorage.clear();
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      alert("Failed to logout")
   }
  }
  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              className="w-full h-full h-370 2xl:h-510 shadow-lg object-cover"
              src={randomImg}
              alt="banner"
            />
            <img
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              src={user?.image}
              alt="user"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === user._id && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={handleClick}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7 mt-3">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2 ">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No pins found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
