import { Container } from "@/components/container";
import {
  ArtistCardSkeleton,
  MoreArtistCardSkeleton,
} from "@/ui/artistCardSkeleton";

export default function Loading() {
  return (
    <>
      <div className="  sm:px-12 px-4 py-8 pb-20 ">
        <Container>
          <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium  ">
            Top Artists
          </h1>
          <MoreArtistCardSkeleton count={10} />
        </Container>
      </div>
    </>
  );
}
