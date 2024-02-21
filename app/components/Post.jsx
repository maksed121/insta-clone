"use client";

import { FaUserCircle } from "react-icons/fa";

import React, { useState } from "react";
import { toast } from "react-toastify";

const Post = ({ refresh, setRefresh }) => {
  const [content, setContent] = useState("");

  const handlePost = async () => {
    const user_id = localStorage.getItem("login");
    const request = await fetch("http://localhost/PHP%20CODE/API/posts/create.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: user_id,
        content: content,
      }),
    });

    const response = await request.json();
    if (response.code == 201) {
      toast.success(response.message);
    }
    setContent("");
    setRefresh(!refresh);
  };

  return (
    <div className="w-[45%] m-auto mb-3 pt-[80px]">
      <div className="flex gap-3 items-center border-b border-gray-700 pb-3">
        <FaUserCircle size={40} color="white" />
        <input
          type="text"
          placeholder="Start a thread..."
          className="bg-transparent outline-none flex-1 text-white"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button
          onClick={handlePost}
          className="px-5 py-2 rounded-full bg-white text-[13px] text-black font-bold"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Post;
