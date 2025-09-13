import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MusicVideoFeature } from "@/components/MVFeature/music-video-feature";
import { NavBar } from "@/components/navBar";
import { SocialFriendFeature } from "@/components/SFFeature/socialFriendFeature";



export default function App() {


  return <>


    <div className="    w-screen bg-background text-forground  dark:bg-foreground  dark:text-background ">
      <div className="md:px-24 sm:px-12 px-6 py-4">

        <NavBar />
        <Hero />
        <MusicVideoFeature />
        <SocialFriendFeature />
      </div>
      <Footer />
    </div>

  </>

}