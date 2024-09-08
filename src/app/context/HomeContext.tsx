'use client'

import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Music } from '../dados/music'; 

type HomeContextData = {
    playing: boolean;
    selectedMusic: Music | null;
    configPlayPause: () => void;
    audio: HTMLAudioElement | undefined;
    selectMusic: (music: Music) => void;
}

export const HomeContext = createContext({} as HomeContextData);

type ProviderProps = {
    children: ReactNode;
}

const HomeContextProvider = ({ children }: ProviderProps) => {
    const [playing, setPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement>();
    const [selectedMusic, setSelectedMusic] = useState<Music | null>(null);

    useEffect(() => {
        if (selectedMusic) {
            const newAudio = new Audio(selectedMusic.urlAudio);
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
        setSelectedMusic(music);
        setPlaying(false); 
    }

    return (
        <HomeContext.Provider value={{
            playing,
            selectedMusic,
            configPlayPause,
            selectMusic,
            audio
        }}>
            {children}
        </HomeContext.Provider>
    )
}

export default HomeContextProvider;
