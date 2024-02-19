"use client";

import Link from "next/link";
import react, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
// import{useForm} from "react-hook-form";
import  axios  from "axios";
import Loader from"../utilities/spinner"
import { toast } from "react-hot-toast";

export default function SignupPage() {

  const router =useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] =useState(false)
  const [loading, setLoading] =useState(false)

  useEffect(()=>{
    if(user.email.length>0 && user.username.length>0&& user.password.length>0)
    {
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)
    }
  },[user])

  const onSignup = async () => {
    try {
      setLoading(true)
     const response = await axios.post("api/users/signup",user)
      console.log(response.data,"Signup Success");
      router.push("/login")

      
    } catch (error:any) {
      toast.error(error.message)
      console.log("Signup Failed",error.message);
      
    }
    finally{
      setLoading(false)
    }
  };

  return (
    <>
    {
      loading?(<Loader/>):(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className=" text-white text-2xl">Signup</h1>
        <hr />
        <label htmlFor="username">Username</label>
        <input
          className="p-2 placeholder:italic placeholder:text-slate-400 placeholder:pl-[18px] text-black first-letter:border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        ></input>
        <label htmlFor="email">Email</label>
        <input
          className="p-2 placeholder:italic placeholder:text-slate-400  placeholder:pl-[18px] text-black first-letter:border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
          id="email"
          type="text"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Email"
        ></input>
        <label htmlFor="password">Password</label>
        <input
          className="p-2 placeholder:italic placeholder:text-slate-400  placeholder:pl-[18px]  text-black first-letter:border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Password"
        ></input>
  
        <button onClick={onSignup} className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 ">
          {buttonDisabled?"No SignUp":"SignUp "}
        </button>
        <Link href="/login" >Visit Login Page</Link>
      </div>
      )
    }
    </>
   
  );
}
