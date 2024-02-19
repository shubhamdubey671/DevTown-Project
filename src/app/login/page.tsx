"use client";

import Link from "next/link";
import react, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import{useForm} from "react-hook-form";
import  axios  from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter()
  const [user, setUser] = useState({
    email: "",
    password: "",
   
  });
  const [buttonDisabled , setButtonDisabled]=useState(false)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    if(user.email.length>0 && user.password.length>0){
      setButtonDisabled(false)
    }
    else{
      setButtonDisabled(true)

    }
  },[user])
  const onLogin = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/login",user)
      console.log("Login Success",response.data);
      toast.success("Login Sucess")
      router.push("/profile")
      
      
    } catch (error:any) {
      console.log("Login Failer",error.message);
      toast.error(error.message);
    }

    finally{
      setLoading(false)
    }
  };

  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className=" text-white text-2xl">Login</h1>
      <hr />
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

      <button onClick={onLogin} className="p-2 border border-grey-300 rounded-lg mb-4 focus:outline-none focus:border-grey-600 ">
        Login Here
      </button>
      <Link href="/signup" >Visit Signup Page</Link>
    </div>
  );
}
