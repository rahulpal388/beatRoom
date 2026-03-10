import serverApiFunction from "@/api/baseServerUrlAxios";
import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { NewReleasedComponent } from "@/components/dashboard/newRelease";
import { notFound } from "next/navigation";

export default async function NewReleased() {
  const serverAPI = await serverApiFunction();
  const newRelease = await getNewReleasedSong(serverAPI, 20, 1);
  if (newRelease.length === 0) {
    notFound();
  }

  return <NewReleasedComponent newRelease={newRelease} />;
}
