import { ArtistCard } from "@/components/dashboard/music/artistCard";
import { getTopArtist } from "@/api/artist/getTopArtist";
import { Container } from "@/components/container";
import { notFound } from "next/navigation";

export default async function TopArtists() {
  const topArtist = await getTopArtist(20, 1);
  if (topArtist.length === 0) {
    notFound();
  }
  return (
    <>
      <div className="  sm:px-12 px-4 py-8 pb-20 ">
        <Container>
          <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium  ">
            Top Artists
          </h1>

          <div className=" mt-4 grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7  ">
            {topArtist.map((artist) => (
              <ArtistCard
                key={artist.id}
                name={artist.name}
                url={artist.perma_url}
                image={artist.image}
                type={"artist"}
              />
            ))}
          </div>
        </Container>
      </div>
    </>
  );
}
