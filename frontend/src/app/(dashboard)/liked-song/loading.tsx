import { Container } from "@/components/container";
import { CardLoadingCompoent } from "@/ui/cardLoadingContainer";

export default function Loading() {
  return (
    <>
      <Container>
        <div className=" mt-4  md:px-12 px-4">
          <h1 className="  text-4xl">Liked Music</h1>
        </div>
        <div className=" flex flex-col gap-4 ">
          <CardLoadingCompoent number={10} heading="" />
        </div>
      </Container>
    </>
  );
}
