import { getSaveArtist } from "@/api/artist/getSavedArtist";
import { IArtists } from "@/types/artistType";
import { useEffect, useState } from "react";
import { ArtistCard, ArtistCardContaier } from "./artistCard";

export function LikedArtist() {
  const [artist, setArtist] = useState<IArtists[]>([]);
  useEffect(() => {
    const fetchArtist = async () => {
      const response = await getSaveArtist();
      setArtist(response);
    };
    fetchArtist();
  }, []);
  return (
    <>
      {artist.length === 0 ? (
        <div className=" py-[4rem] flex items-center justify-center  ">
          <h1 className=" text-lg "> Artist is empty!</h1>
        </div>
      ) : (
        <ArtistCardContaier>
          {artist.map((item) => (
            <ArtistCard
              key={item.id}
              name={item.name}
              url={item.perma_url}
              image={item.image}
              type={"artist"}
            />
          ))}
        </ArtistCardContaier>
      )}
    </>
  );
}
