import { Hero } from "@/components/hero";
import { MusicVideoFeature } from "@/components/MVFeature/music-video-feature";
import { NavBar } from "@/components/navBar";



export default function App() {


  return <>

    <div className=" md:px-24 sm:px-12 px-6 py-4  h-screen w-screen  bg-black text-white  ">
      <NavBar />
      <Hero />
      <MusicVideoFeature />
    </div>

  </>

}