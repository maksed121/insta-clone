import React from "react";
import { IoClose } from "react-icons/io5";
import { BsFacebook, BsWhatsapp } from "react-icons/bs";
import { GrInstagram } from "react-icons/gr";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

const Modal = ({ modal, setModal }) => {
  const message = encodeURIComponent(
    `${modal.content.content}\nPosted By: ${modal.content.name}\nDownload thread to connect with your friends`
  );

  return (
    <div className="w-screen h-screen backdrop-blur absolute top-0">
      <div className="w-[500px] p-3 pb-5 rounded-lg bg-white text-black absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4">
        <div className="flex justify-between items-center">
          <h2 className="text-md font-bold">Share this post</h2>
          <IoClose
            size={30}
            onClick={() => {
              setModal({ show: false, content: null });
            }}
          />
        </div>

        <div className="share-items flex justify-center gap-3 mt-[30px]">
          <div className="icons p-2 rounded-lg bg-gray-300 w-[75px] h-[75px] flex items-center justify-center">
            <BsFacebook size={40} color="#1877F2" />
          </div>
          <div className="icons p-2 rounded-lg bg-gray-300 w-[75px] h-[75px] flex items-center justify-center">
            <GrInstagram size={40} color="#F56040" />
          </div>
          <Link
            href={`whatsapp://send?text=${message}`}
            data-action="share/whatsapp/share"
            className="icons p-2 rounded-lg bg-gray-300 w-[75px] h-[75px] flex items-center justify-center"
          >
            <BsWhatsapp size={40} color="#25d366" />
          </Link>
          <div className="icons p-2 rounded-lg bg-gray-300 w-[75px] h-[75px] flex items-center justify-center">
            <FaXTwitter size={40} />
          </div>
        </div>

        <p className="text-center mt-4 font-bold">
          Click the icon to share this post
        </p>
      </div>
    </div>
  );
};

export default Modal;
