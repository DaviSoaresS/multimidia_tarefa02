'use client'; // Adicione isso se não estiver no arquivo

import { useContext, useEffect, useRef, useState } from "react";
import { FaPlay, FaPause, FaForward, FaBackward } from 'react-icons/fa'; // Ícones de avançar/retroceder
import { HomeContext } from "./context/HomeContext";

export default function MusicPlayer() {
  const {
    playing,
    configPlayPause,
    selectNextMusic,
    selectPreviousMusic,
    audio,
    volume,
    setVolume,
  } = useContext(HomeContext);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Atualiza a barra de progresso e o tempo atual
  useEffect(() => {
    if (audio) {
      const updateProgressBar = () => {
        if (progressFillRef.current) {
          const progressPercent = (audio.currentTime / audio.duration) * 100;
          progressFillRef.current.style.width = `${progressPercent}%`;
          setCurrentTime(audio.currentTime); // Atualiza o tempo atual
        }
      };

      const updateDuration = () => {
        setDuration(audio.duration); // Atualiza a duração da música
      };

      audio.addEventListener('timeupdate', updateProgressBar);
      audio.addEventListener('loadedmetadata', updateDuration); // Quando os metadados da música são carregados
      return () => {
        audio.removeEventListener('timeupdate', updateProgressBar);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [audio]);

  // Lida com o clique na barra de progresso para avançar/retroceder na música
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audio || !progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // Posição X do clique em relação à barra
    const width = rect.width;
    const newTime = (clickX / width) * audio.duration; // Calcula o tempo baseado na posição clicada
    audio.currentTime = newTime; // Atualiza o tempo da música
  };

  // Lida com a mudança no volume usando o controle deslizante
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume); // Atualiza o estado do volume no contexto
    if (audio) {
      audio.volume = newVolume; // Atualiza o volume do áudio
    }
  };

  // Formata o tempo em minutos e segundos
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="playerMusic">
      <div 
        className="progress-container"
        onClick={handleProgressClick} // Adiciona o evento de clique
        ref={progressBarRef} // Referência da barra de progresso
        style={{ position: 'relative', cursor: 'pointer', height: '10px', background: '#ddd', borderRadius: '5px', width: '100%' }}
      >
        <div
          ref={progressFillRef} // Referência para a parte preenchida da barra
          style={{ width: '0%', height: '100%', backgroundColor: '#b700ff', borderRadius: '5px' }}
        />
      </div>
      
      <h1 className="text-2xl font-bold mb-4">{playing ? "Playing" : "Paused"}</h1>
      
      {/* Exibe o tempo atual e a duração */}
      <div className="time-display">
        <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
      </div>

      {/* Controles de reprodução */}
      <div className="player-controls flex items-center">
        {/* Controle deslizante de volume à esquerda */}
        <div className="volume-control mr-4">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume} // Sincroniza o controle deslizante com o volume atual
            onChange={handleVolumeChange}
            style={{ width: '100%' }} // Largura do controle deslizante
          />
        </div>

        <button onClick={selectPreviousMusic}>
          <FaBackward className="botaoIdaeVolta" />
        </button>

        <button onClick={configPlayPause}>
          {playing ? 
            <FaPause className="text-[50px]" /> : 
            <FaPlay className="text-[50px]" />
          }
        </button>

        <button onClick={selectNextMusic}>
          <FaForward className="botaoIdaeVolta" />
        </button>
      </div>
    </div>
  );
}
