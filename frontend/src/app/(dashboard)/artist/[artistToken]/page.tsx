import { getArtistInfo } from "@/api/artist/getArtistInfo";
import serverApiFunction from "@/api/baseServerUrlAxios";
import ArtistComponent from "@/components/dashboard/artist";
import { notFound } from "next/navigation";

export default async function Artist({
  params,
}: {
  params: Promise<{ artistToken: string }>;
}) {
  const serverAPI = await serverApiFunction();
  const { artistToken } = await params;

  const artistInfo = await getArtistInfo(serverAPI, artistToken as string);
  if (!artistInfo) {
    notFound();
  }

  return <ArtistComponent token={artistToken} artistInfo={artistInfo} />;
}
