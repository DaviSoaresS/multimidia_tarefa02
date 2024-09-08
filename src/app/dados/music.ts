export type Music = {
    name: string;
    author: string;
    //description: string;
    urlAudio: string;
    image: string;
}

export const musics: Music[] = [
    {
        name: "VELUDO MARROM",
        author: "Liniker",
       // description: "musica 01",
        urlAudio: "musicas/VELUDO MARROM.mp3",
        image: "./imagens/CajuLiniker.jpeg"
    },
    {
        name: "SUMMER RENAISSANCE",
        author: "Beyoncé",
       // description: "musica 02",
        urlAudio: "musicas/SUMMER RENAISSANCE.mp3",
        image: "./imagens/Beyonce.jpg"
    },
    {
        name: "Gimme! Gimme! Gimme! (A Man After Midnight)",
        author: "ABBA",
       // description: "musica 03",
        urlAudio: "/musicas/ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3",
        image: "./imagens/ABBA.jpeg"
    },
    {
        name: "After The Storm",
        author: "Kali Uchis(feat. Bootsy Collins & Tyler, The Creator)",
       // description: "musica 03",
        urlAudio: "/musicas/Kali Uchis - After The Storm ft. Tyler, The Creator, Bootsy Collins.mp3",
        image: "./imagens/kali-uchis.jpg"
    }
];
