import { getArtistInfo } from "@/api/artist/getArtistInfo";
import ArtistComponent from "@/components/dashboard/artist";
import { notFound } from "next/navigation";

export default async function Artist({
  params,
}: {
  params: Promise<{ artistToken: string }>;
}) {
  const { artistToken } = await params;

  const artistInfo = await getArtistInfo(artistToken as string);
  if (!artistInfo) {
    notFound();
  }

  return <ArtistComponent artistInfo={artistInfo} />;
}
