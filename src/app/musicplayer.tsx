'use client'

import { useContext, useEffect, useRef } from "react";
import { FaPlay, FaPause } from 'react-icons/fa';
import { HomeContext } from "./context/HomeContext";

export default function MusicPlayer() {
  const {
    playing,
    configPlayPause,
    audio
  } = useContext(HomeContext);

  const progressBarRef = useRef<HTMLProgressElement>(null);

  // Atualiza a barra de progresso
  useEffect(() => {
    if (audio) {
      const updateProgressBar = () => {
        if (progressBarRef.current) {
          progressBarRef.current.value = (audio.currentTime / audio.duration) * 100;
        }
      };
      audio.addEventListener('timeupdate', updateProgressBar);
      return () => {
        audio.removeEventListener('timeupdate', updateProgressBar);
      };
    }
  }, [audio]);

  return (
    <div className="playerMusic">
         <div className="progress-container">
        <progress ref={progressBarRef} className="progress-bar" max={100} value={0} />
      </div>
      <h1 className="text-2xl font-bold mb-4">{playing ? "Playing" : "Paused"}</h1>
      <button onClick={() => configPlayPause()} className="mb-4">
        {playing ? 
          <FaPause className="text-[50px] text-[tomato]" /> : 
          <FaPlay className="text-[50px]" />
        }
      </button> 
    </div>
  )
}
