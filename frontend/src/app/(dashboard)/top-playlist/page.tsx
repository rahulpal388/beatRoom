import { getTopPlaylist } from "@/api/playlist/getTopPlaylist";
import { TopPlaylistComponent } from "@/components/dashboard/topPlaylist";
import { notFound } from "next/navigation";

export default async function TopPlaylist() {
  const topPlaylist = await getTopPlaylist(50, 1);
  if (topPlaylist.length === 0) {
    notFound();
  }

  return <TopPlaylistComponent topPlaylist={topPlaylist} />;
}
