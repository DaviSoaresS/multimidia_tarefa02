'use client'; // Adicione isso se não estiver no arquivo

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Music } from '../dados/music'; 
import { musics } from '../dados/music'; // Importe sua lista de músicas

type HomeContextData = {
    playing: boolean;
    selectedMusic: Music | null;
    configPlayPause: () => void;
    audio: HTMLAudioElement | undefined;
    selectMusic: (music: Music) => void;
    selectNextMusic: () => void; // Função para pular para a próxima música
    selectPreviousMusic: () => void; // Função para voltar à música anterior
    volume: number; // Atualize o tipo de volume para number
    setVolume: (value: number) => void; // Função para atualizar o volume
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);
    const [currentMusicIndex, setCurrentMusicIndex] = useState<number>(0); // Índice da música atual
    const [volume, setVolume] = useState<number>(1); // Volume inicial em 100%

    useEffect(() => {
        if (selectedMusic) {
            const newAudio = new Audio(selectedMusic.urlAudio);
            newAudio.volume = volume; // Define o volume ao criar o áudio
            setAudio(newAudio);
        }
    }, [selectedMusic]);

    const configPlayPause = () => {
        if (playing) {
            pause();
        } else {
            play();
        }
        setPlaying(!playing);
    }

    const play = () => {
        if (!audio) return;
        audio.play();
    }

    const pause = () => {
        if (!audio) return;
        audio.pause();
    }

    const selectMusic = (music: Music) => {
        if (audio) {
            pause()
        }
        setSelectedMusic(music);
        setPlaying(false);
    }

    const selectNextMusic = () => {
        if (audio) {
            audio.pause(); // Pausa a música atual
            audio.currentTime = 0; // Reinicia a música anterior
        }
        
        let nextIndex = currentMusicIndex + 1;
        if (nextIndex >= musics.length) {
            nextIndex = 0; // Volta para a primeira música se estiver na última
        }
        setSelectedMusic(musics[nextIndex]);
        setCurrentMusicIndex(nextIndex);
        setPlaying(false);
    }
    
    const selectPreviousMusic = () => {
        if (audio) {
            audio.pause(); // Pausa a música atual
            audio.currentTime = 0; // Reinicia a música anterior
        }
        
        let prevIndex = currentMusicIndex - 1;
        if (prevIndex < 0) {
            prevIndex = musics.length - 1; // Vai para a última música se estiver na primeira
        }
        setSelectedMusic(musics[prevIndex]);
        setCurrentMusicIndex(prevIndex);
        setPlaying(false);
    }
    

    return (
        <HomeContext.Provider value={{
            playing,
            selectedMusic,
            configPlayPause,
            selectMusic,
            audio,
            selectNextMusic,   // Adiciona a função para pular
            selectPreviousMusic, // Adiciona a função para voltar
            volume, // Adiciona o volume atual
            setVolume // Adiciona a função para atualizar o volume
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
