import React from 'react';
import { BsArrowLeft } from "react-icons/bs";
import video from "../assets/video.mp4";
import { useNavigate } from 'react-router-dom';

function Player() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="max-w-xl w-full mx-auto">
        <div className="flex items-center justify-between mb-4">
          <BsArrowLeft onClick={() => navigate(-1)} className="text-white text-2xl cursor-pointer" />
        </div>
        <div className="relative w-full">
          <video src={video} className="w-full rounded-lg shadow-md" autoPlay loop controls muted></video>
        </div>
      </div>
    </div>
  );
}

export default Player;
