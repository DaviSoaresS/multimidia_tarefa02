import React from 'react';
import { Music } from './dados/music'; 

type SidebarProps = {
    musics: Music[];
    onSelectMusic: (music: Music) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ musics, onSelectMusic }) => {
    return (
        <div className="sidebar">
            <h2 className="tituloSidebar">Lista de Músicas</h2>
            <ul>
                {musics.map(music => (
                    <li
                        key={music.name}
                        className="cursor-pointer"
                        onClick={() => onSelectMusic(music)}
                    >
                        <h3 className="nomemusica">{music.name}</h3>
                        <p className="autormusica">{music.author}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
export default Sidebar;
