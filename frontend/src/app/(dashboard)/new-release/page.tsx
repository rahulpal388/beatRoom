import { getNewReleasedSong } from "@/api/song/newReleasedSong";
import { NewReleasedComponent } from "@/components/dashboard/newRelease";
import { notFound } from "next/navigation";

export default async function NewReleased() {
  const newRelease = await getNewReleasedSong(20, 1);
  if (newRelease.length === 0) {
    notFound();
  }

  return <NewReleasedComponent newRelease={newRelease} />;
}
