import { Container } from "@/components/container";
import { SongsSection } from "@/components/dashboard/music/songCard";
import { MoreArtistCardSkeleton } from "@/ui/artistCardSkeleton";
import { CardLoadingCompoent } from "@/ui/cardLoadingContainer";
import { CardSkeleton } from "@/ui/cardSkeleton";
import { DisplaySongSkeleton } from "@/ui/displaySongSkeleton";

export default function Loading() {
  return (
    <>
      <Container>
        <DisplaySongSkeleton />
        <div className="mt-12 flex flex-col gap-4 ">
          <CardLoadingCompoent number={10} heading="" />
        </div>
      </Container>
    </>
  );
}
