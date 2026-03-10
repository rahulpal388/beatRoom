import { saveUserPlaylist } from "@/api/playlist/saveUserPlaylist";
import { IValue, useModal } from "@/context/modalContext";
import { useToastNotification } from "@/context/toastNotificationContext";
import { useQueueStore } from "@/store/queueStore";
import { useSongStore } from "@/store/songStore";
import { Button } from "@/ui/button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export type ICreatePlaylist = {
  title: string;
  subtitle: string;
};

export function CreateNewPlaylist({ value }: { value: IValue }) {
  const { register, handleSubmit } = useForm<ICreatePlaylist>();
  // const { currentSong, queueSongs } = useQueue();
  const queueSongId = useQueueStore((s) => s.queueSong);
  const currentIdx = useQueueStore((s) => s.currentIdx);
  const songs = useSongStore((s) => s.songs);
  const currentSong = songs[queueSongId[currentIdx]];
  const queueSongs = queueSongId.map((x) => songs[x]);
  const { removeModal } = useModal();
  const { toastMessage } = useToastNotification();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit: SubmitHandler<ICreatePlaylist> = async (data) => {
    setIsLoading(true);
    const response =
      value === "saveCurrent"
        ? await saveUserPlaylist(data.title, data.subtitle, [currentSong])
        : await saveUserPlaylist(data.title, data.subtitle, queueSongs);

    if (response) {
      toastMessage({
        message: "Playlist Created",
        type: "success",
      });
    } else {
      toastMessage({
        message: "Error Creating Playlist",
        type: "error",
      });
    }
    setIsLoading(false);
    removeModal();
  };
  return (
    <>
      <div>
        <div className=" text-center ">
          <h1 className=" text-xl font-medium ">Create New Playlist</h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" mt-4 flex flex-col gap-4 "
        >
          <div>
            <label
              htmlFor="title"
              className="text-lg font-heading text-text-heading cursor-pointer "
            >
              Title
            </label>
            <input
              className="mt-1 px-2 py-px rounded w-full border-[1px] border-card-border focus:border-primary outline-none  h-8 "
              type="text"
              id="title"
              placeholder="Enter title "
              {...register("title", { required: true })}
            />
          </div>
          <div>
            <label
              htmlFor="subtitle"
              className="text-lg font-heading text-text-heading cursor-pointer "
            >
              Subtitle
            </label>
            <input
              className="mt-1 px-2 py-px rounded w-full border-[1px] border-card-border focus:border-primary outline-none  h-8 "
              type="text"
              id="subtitle"
              placeholder="Enter subtitle "
              {...register("subtitle", { required: true })}
            />
          </div>
          <Button
            type="submit"
            btnType="Primary"
            name={isLoading ? "Submitting......" : "Submit"}
          />
        </form>
      </div>
    </>
  );
}
