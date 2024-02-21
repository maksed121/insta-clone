"use client";
import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { FiSend, FiHeart, FiMessageSquare, FiTrash } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import Moment from "react-moment";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import Comments from "./Comments";
import Modal from "./Modal";

const Threads = ({ refresh, setRefresh }) => {
  const [threads, setThreads] = useState(null);
  const [commentBox, setCommentBox] = useState({ id: null, isOpen: false });
  const [modal, setModal] = useState({ show: false, content: null });
  const user_id = localStorage.getItem("login");

  const getData = async () => {
    const request = await fetch("http://localhost/PHP%20CODE/API/get/feeds.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id }),
    });
    const response = await request.json();
    setThreads(response.data);
  };

  const handleLike = async (id) => {
    const request = await fetch("http://localhost/PHP%20CODE/API/likes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: user_id, post_id: id }),
    });
    const response = await request.json();
    setRefresh(!refresh);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const request = await fetch("http://localhost/PHP%20CODE/API/posts/delete.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ post_id: id }),
        });
        const response = await request.json();
        if (response.code == 200) {
          toast.success(response.message);
          setRefresh(!refresh);
        } else {
          toast.error(response.message);
        }
      }
    });
  };

  useEffect(() => {
    getData();
  }, [refresh]);

  return (
    <>
      {!threads && (
        <div className="flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      )}
      {threads?.map((item, index) => {
        return (
          <div className="w-[45%] m-auto text-white" key={index}>
            <div className="flex gap-3 items-start border-b border-gray-700 py-2">
              <FaUserCircle size={40} color="white" className="min-w-[45px]" />
              <div className="text">
                <p className="text-[13px] font-bold">{item.name}</p>
                <p className="text-[15px]">{item.content}</p>
                <div className="actions flex gap-1 items-center mt-2">
                  <div
                    className="icons h-[30px] w-[30px] p-1 rounded-full flex items-center justify-center hover:bg-zinc-800"
                    onClick={() => {
                      handleLike(item.post_id);
                    }}
                  >
                    {item.is_liked ? (
                      <FaHeart size={20} color="red" />
                    ) : (
                      <FiHeart size={20} />
                    )}
                  </div>
                  <span className="text-[12px]">{item.likes}</span>
                  <div
                    className="icons h-[30px] w-[30px] p-1 rounded-full flex items-center justify-center hover:bg-zinc-800"
                    onClick={() => {
                      setCommentBox({ id: item.post_id, isOpen: true });
                    }}
                  >
                    <FiMessageSquare size={20} />
                  </div>
                  <span className="text-[12px]">{item.comments}</span>
                  <div
                    className="icons h-[30px] w-[30px] p-1 rounded-full flex items-center justify-center hover:bg-zinc-800"
                    onClick={() => {
                      setModal({ show: true, content: item });
                    }}
                  >
                    <FiSend size={20} />
                  </div>
                  {item.user_id == user_id && (
                    <div
                      className="icons h-[30px] w-[30px] p-1 rounded-full flex items-center justify-center bg-zinc-800"
                      onClick={() => {
                        handleDelete(item.post_id);
                      }}
                    >
                      <FiTrash size={17} color="red" />
                    </div>
                  )}
                </div>
              </div>
              <div className="right flex gap-2 ml-auto">
                <p className="text-[13px] whitespace-nowrap">
                  <Moment fromNow ago>
                    {item.created_at}
                  </Moment>{" "}
                  ago
                </p>
                <HiDotsHorizontal />
              </div>
            </div>
            {commentBox.isOpen && commentBox.id == item.post_id && (
              <Comments
                postId={item.post_id}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            )}
          </div>
        );
      })}
      {modal.show && <Modal modal={modal} setModal={setModal} />}
    </>
  );
};

export default Threads;
