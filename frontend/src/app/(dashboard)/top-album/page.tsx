import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";
import serverApiFunction from "@/api/baseServerUrlAxios";
import { TopAlbumComponent } from "@/components/dashboard/topAlbum";
import { notFound } from "next/navigation";

export default async function TopAlbum() {
  const serverAPI = await serverApiFunction();
  const language = "hindi";
  const topAlbum = await getTrendingAlbum(serverAPI, 30, 1, language);
  if (topAlbum.length === 0) {
    notFound();
  }

  return <TopAlbumComponent topAlbum={topAlbum} />;
}
