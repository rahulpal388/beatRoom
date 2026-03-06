import { getTrendingAlbum } from "@/api/album/getTrendingAlbum";
import { TopAlbumComponent } from "@/components/dashboard/topAlbum";
import { notFound } from "next/navigation";

export default async function TopAlbum() {
  const language = "hindi";
  const topAlbum = await getTrendingAlbum(30, 1, language);
  if (topAlbum.length === 0) {
    notFound();
  }

  return <TopAlbumComponent topAlbum={topAlbum} />;
}
