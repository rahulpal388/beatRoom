import { Container } from "@/components/container";
import { SongsSection } from "@/components/dashboard/music/songCard";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { CardSkeleton } from "@/ui/cardSkeleton";
import { DisplaySongSkeleton } from "@/ui/displaySongSkeleton";

export default function PlaylistLoading() {
  return (
    <>
      <Container>
        <DisplaySongSkeleton />
        <div className="mt-12 flex flex-col gap-4 ">
          <SongsSection heading="You Might Like">
            {Array(8)
              .fill(1)
              .map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
          </SongsSection>
          <SongsSection heading="Trending Playlist">
            {Array(8)
              .fill(1)
              .map((_, idx) => (
                <CardSkeleton key={idx} />
              ))}
          </SongsSection>
        </div>

        <SongsSection heading="Artists">
          <MoreArtistCardSkeleton count={6} />
        </SongsSection>
      </Container>
    </>
  );
}
