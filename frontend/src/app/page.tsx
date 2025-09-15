import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MusicVideoFeature } from "@/components/MVFeature/music-video-feature";
import { NavBar } from "@/components/navBar";
import { SocialFriendFeature } from "@/components/SFFeature/socialFriendFeature";



export default function App() {


  return <>


    <div className="    w-screen ">
      <div className="md:px-24 sm:px-12 px-6 py-4">
        <video
          src="https://aac.saavncdn.com/726/4e018130b83b4c0abbd7f41b6e5c6794_12.mp4"
          autoPlay
          controls
          style={{ width: 0, height: 0 }} // hide video
        />

        <NavBar />
        <Hero />
        <MusicVideoFeature />
        <SocialFriendFeature />
      </div>
      <Footer />
    </div >

  </>

}