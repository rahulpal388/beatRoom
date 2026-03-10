import serverApiFunction from "@/api/baseServerUrlAxios";
import { getTopPlaylist } from "@/api/playlist/getTopPlaylist";
import { TopPlaylistComponent } from "@/components/dashboard/topPlaylist";
import { notFound } from "next/navigation";

export default async function TopPlaylist() {
  const serverAPI = await serverApiFunction();
  const topPlaylist = await getTopPlaylist(serverAPI, 50, 1);
  if (topPlaylist.length === 0) {
    notFound();
  }

  return <TopPlaylistComponent topPlaylist={topPlaylist} />;
}
