import { Container } from "@/components/container";
import { SongsSection } from "@/components/dashboard/music/songCard";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { CardSkeleton } from "@/ui/cardSkeleton";
import { DisplaySongSkeleton } from "@/ui/displaySongSkeleton";

export default function Loading() {
  return (
    <>
      <Container>
        <div className="mt-12 flex flex-col gap-4 ">
          <SongsSection heading="New Release">
            {Array(10)
              .fill(1)
              .map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
          </SongsSection>
          <SongsSection heading="Trending Song">
            {Array(10)
              .fill(1)
              .map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
          </SongsSection>
          <SongsSection heading="Top Playlist">
            {Array(10)
              .fill(1)
              .map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
          </SongsSection>
          <SongsSection heading="Top Artists">
            <MoreArtistCardSkeleton count={10} />
          </SongsSection>
        </div>
      </Container>
    </>
  );
}
