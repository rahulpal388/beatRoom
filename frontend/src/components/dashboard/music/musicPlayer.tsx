// "use client";
// import { useCurrentSongDetail } from "@/context/currentSong";
// import { useQueue } from "@/context/queueContext";
// import { BASE_URL } from "@/lib/baseUrl";
// import axios from "axios";
// import { useEffect, useRef, useState } from "react";

// export function MusicPlayer() {
//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const [songUrl, setSongUrl] = useState<string | null>(null);
//   const { isPlaying, playerRef, setProgressValue, setIsPlaying } =
//     useCurrentSongDetail();
//   const { prevSong, nextSong } = useQueue();
//   useEffect(() => {
//     if (isPlaying) {
//       console.log("playing");
//       const player = playerRef.current;
//       if (!player) {
//         return;
//       }
//       player.play();
//       intervalRef.current = setInterval(() => {
//         // change the progressbar
//         const progress = (player.currentTime / player.duration) * 100;
//         setProgressValue(progress);
//       }, 1000);
//     }

//     if (!isPlaying && intervalRef.current) {
//       playerRef.current?.pause();
//       clearInterval(intervalRef.current);
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isPlaying, currentSong, songUrl]);

//   useEffect(() => {
//     const fetchUrl = async () => {
//       const responseUrl = await axios.post(`${BASE_URL}/song/play`, {
//         id: currentSong.more_info.encrypted_media_url,
//       });
//       setSongUrl(responseUrl.data.song_url);
//     };

//     fetchUrl();
//   }, [currentSong]);

//   // useEffect(() => {
//   //   if (!songUrl || !playerRef.current) {
//   //     return;
//   //   }
//   // playerRef.current.play();
//   // setIsPlaying(true);
//   // }, [songUrl]);

//   useEffect(() => {
//     if (!("mediaSession" in navigator)) return;

//     navigator.mediaSession.setActionHandler("nexttrack", () => {
//       nextSong();
//     });

//     navigator.mediaSession.setActionHandler("previoustrack", () => {
//       console.log("move the song backward");
//       prevSong();
//     });
//   }, []);

//   return (
//     <>
//       <video
//         ref={playerRef}
//         src={`${songUrl}`}
//         className=" h-0 w-0"
//         onPause={() => {
//           setIsPlaying(false);
//         }}
//         onPlay={() => {
//           setIsPlaying(true);
//         }}
//         onEnded={() => {
//           console.log("song end");
//           setProgressValue(0);
//         }}
//       />
//     </>
//   );
// }
