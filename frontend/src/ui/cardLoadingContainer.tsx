import { SongCardContaier } from "@/components/dashboard/music/songCardContainer";
import { CardSkeleton } from "./cardSkeleton";

export function CardLoadingCompoent({
  number,
  heading,
}: {
  number: number;
  heading: string;
}) {
  return (
    <>
      <div>
        <div className=" sm:px-12 px-4 py-8 pb-20 ">
          <h1 className="  text-[30px] pb-4 border-b-[1px] border-muted font-medium ">
            {heading}
          </h1>
          <SongCardContaier className=" gap-2 ">
            {Array(number)
              .fill(1)
              .map((_, idx) => (
                <CardSkeleton key={idx} className="w-full" />
              ))}
          </SongCardContaier>
        </div>
      </div>
    </>
  );
}
