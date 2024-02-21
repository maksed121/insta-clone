"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const ProfileSettings = () => {
  const [profile, setProfile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <div className='bg-gradient-to-r from-violet-500 to-fuchsia-500 px-3 w-screen h-screen flex items-center justify-center text-white'>
      <div className="bg-zinc-700 w-[500px]  rounded-xl p-5">
        <h1 className='text-center'>Profile Settings</h1>
        <div className="relative flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500 py-4 rounded-xl mt-3">
          <div className="flex items-center justify-center rounded-full">
            {profile ? (
              <Image src={profile} width={150} height={150} className='object-cover w-[150px] h-[150px] rounded-full' />
            ) : (

              <div className='w-[150px] h-[150px] rounded-full bg-zinc-400 flex items-center justify-center'>
                <p>No Profile</p>
              </div>
            )}
          </div>
          <div className="mt-[100px] ml-[100px] absolute float-right w-[50px] h-[50px] rounded-full bg-gray-500 flex items-center justify-center">
            <label htmlFor="fileInput" className="text-3xl cursor-pointer">📷</label>
          </div>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <hr className='mt-2' />
        <div className='mt-4'>
          <div>
            <label className='block' htmlFor="">Name</label>
            <input type="text" className='px-4 py-4 rounded-lg w-full bg-gray-600 border-none outline-none' />
          </div>
          <div>
            <label className='block' htmlFor="">Phone</label>
            <input type="number" className='px-4 py-4 rounded-lg w-full bg-gray-600 border-none outline-none' />
          </div>
          <div>
            <label className='block' htmlFor="">Email</label>
            <input type="email" className='px-4 py-4 rounded-lg w-full bg-gray-600 border-none outline-none' />
          </div>

        </div>
        <button className='px-4 py-2 bg-gray-500 mt-3 float-right rounded-xl  text-white'>Upload Profile</button>
      </div>
    </div>
  );
}

export default ProfileSettings;
