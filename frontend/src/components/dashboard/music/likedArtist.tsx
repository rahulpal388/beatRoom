import { getSaveArtist } from "@/api/artist/getSavedArtist";
import { IArtists } from "@/types/artistType";
import { useEffect, useState } from "react";
import { ArtistCard, ArtistCardContaier } from "./artistCard";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";

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
      <div>
        <ArtistCardContaier>
          {artist.length === 0 ? (
            <MoreArtistCardSkeleton count={6} />
          ) : (
            artist.map((item) => (
              <ArtistCard
                key={item.id}
                name={item.name}
                url={item.perma_url}
                image={item.image}
                type={"artist"}
              />
            ))
          )}
        </ArtistCardContaier>
      </div>
    </>
  );
}
