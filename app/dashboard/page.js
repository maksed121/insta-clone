"use client"
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Post from '../components/Post';
import Threads from '../components/Threads';



const Dashboard = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <>
      <Navbar />
      <Post refresh = {refresh} setRefresh= {setRefresh}/>
      <Threads refresh= {refresh} setRefresh= {setRefresh} />
      
    </>
  );
};

export default Dashboard;
