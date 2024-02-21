"use client"
import Link from 'next/link'
import { useEffect, useState } from "react";
import Image from 'next/image'
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Signup = () => {

  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigation = useRouter();

  useEffect(() => {
    if (localStorage.getItem("login")) {
      navigation.replace("/dashboard");
    }
  }, []);

  const handlecreate = async () => {
    const request = await fetch("http://localhost/PHP%20CODE/API/auth/sign_up.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        phone,
        email,
        password
      }),
    });

    const response = await request.json();
    if (response.code == 201) {
      toast.success(response.message);
      localStorage.setItem("login", response.user_id);
      navigation.replace("/dashboard");
    } else {
      toast.error(response.message);
    }


  };
  return (
    <div className='w-full h-screen flex items-center justify-center bg-gradient-to-r from-violet-500 to-fuchsia-500'>
      <div className='bg-black max-w-[400px] p-8 space-y-2 rounded-lg'>
        <h2 className="text-center text-white font-bold mb-4">
          Log in with your Instagram account
        </h2>
        <input
          type="text"
          className=" text-white w-full px-3 bg-[#1e1e1e] py-4 outline-none rounded-lg border border-[#353535]"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);

          }}

        />
        <input
          type="email"
          className=" text-white w-full px-3 bg-[#1e1e1e] py-4 outline-none rounded-lg border border-[#353535]"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);

          }}

        />
        <input
          type="number"
          className="text-white w-full px-3 bg-[#1e1e1e] py-4 outline-none rounded-lg border border-[#353535]"
          placeholder="Phone"
          onChange={(e) => {
            setPhone(e.target.value);

          }}

        />
        <input
          type="password"
          className="text-white w-full px-3 bg-[#1e1e1e] py-4 outline-none rounded-lg border border-[#353535]"
          placeholder="Password"
          onChange={(e) => {
            setPassword(e.target.value);

          }}

        />
        <button onClick={handlecreate} className='bg-blue-500 w-full px-3 py-4 rounded-lg font-bold text-white'>
          Create an account
        </button>
        <h2 className="text-center text-white font-bold mb-4">
          Already have an account ?{" "} <Link className="text-blue-400" href={"/"}>
            Login
          </Link>
        </h2>
      </div>
      <Image
        src={"/frame.png"}
        width={200}
        height={200}
        alt="QR"
        className="w-[200px] absolute right-0 bottom-0 m-5 p-3 hover:scale-110 transition-all duration-500 hidden md:block"
      />
    </div>

  )
}

export default Signup