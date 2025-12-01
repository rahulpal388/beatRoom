import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navBar";
export default function App() {
  return (
    <>
      <div className="  w-screen ">
        <div className="md:px-24 sm:px-12 px-6 py-4">
          <NavBar />
          <Hero />
        </div>
        <Footer />
      </div>
    </>
  );
}
