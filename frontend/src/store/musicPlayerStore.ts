import { getSongUrl, SongUrlResponseType } from "@/api/song/getSongUrl";
import { create } from "zustand";

type MusicPlayerStore = {
  audioEl: HTMLAudioElement | null;
  isPlaying: boolean;
  progress: number;
  url: string | undefined;
  isBuffering: boolean;
  currentPlayedTime: number;
  songDuration: number;
  action: MusicPlayerStoreActions
};

type MusicPlayerStoreActions = {
  play(): void;
  pause(): void;
  setCurrentTime(progress: number): void;
  setProgress(): void;
  setAudioRef(ref: HTMLAudioElement): void;
  setUrl(url: string): void
  setBuffering(value: boolean): void;
  setPlaying(value: boolean): void;
  playSong(encrypted_media_url: string): Promise<SongUrlResponseType>;
  setCurrentPlayedTime(): void;
}

export const useMusicPlayerStore = create<MusicPlayerStore>((set, get) => ({
  audioEl: null,
  progress: 0,
  url: undefined,
  isBuffering: false,
  isPlaying: false,
  currentPlayedTime: 0,
  songDuration: 0,
  action: {
    pause: () => {
      const audio = get().audioEl;
      if (!audio) return;
      audio.pause();
      set({
        isPlaying: false
      })
    },
    play: () => {
      const audioEl = get().audioEl;
      if (!audioEl) return;
      audioEl.play();
      set({
        isPlaying: true,
        songDuration: Math.round(audioEl.duration)
      })
    },
    setCurrentTime: (progress) => {
      const audio = get().audioEl;
      if (!audio) return;

      const newAudioCurrentTime = (progress * audio.duration) / 100;
      audio.currentTime = newAudioCurrentTime
      set({
        progress
      })
    },
    setAudioRef: (ref => {
      set({
        audioEl: ref
      })
    }),
    setUrl: (newUrl => {
      const { audioEl, url, action } = get();
      if (!audioEl || url === newUrl) return;
      if (url !== newUrl) {

        audioEl.src = newUrl;
        action.play();
        set({
          url: newUrl,

        })
      }

    }),
    setBuffering: (value => {
      set({
        isBuffering: value
      })
    }),
    setPlaying: (value => {
      set({
        isPlaying: value
      })
    }),
    setProgress: (() => {
      const audio = get().audioEl;
      if (!audio) return;

      const progress = (audio.currentTime / audio.duration) * 100

      set({
        progress: audio.currentTime === audio.duration ? 0 : progress
      })
    }),
    playSong: (async (encrypted_media_url) => {
      const { setBuffering, setPlaying } = get().action
      setPlaying(true)
      setBuffering(true);
      const response = await getSongUrl(encrypted_media_url);
      const setUrl = get().action.setUrl;
      if (response.success) {
        setUrl(response.url);
        return response
      }

      return response

    }),
    setCurrentPlayedTime: (() => {
      const audioEl = get().audioEl;
      if (!audioEl) return;
      const currentTime = audioEl.currentTime;
      set({
        currentPlayedTime: currentTime
      })
    })
  }
}));
