"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handler = () => {
    router.push("/login");
  };
  return (
    <>
      <div className=" h-screen w-full flex justify-center items-center	">
        <button
          className=" h-auto w-auto	 bg-sky-500/100 p-2.5  rounded-md"
          onClick={handler}
        >
          Login
        </button>
      </div>
    </>
  );
}
