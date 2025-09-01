import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navBar";



export default function App() {


  return <>

    <div className=" px-24 py-4  h-screen w-screen  bg-background dark:bg-foreground text-white ">
      <NavBar />
      <Hero />
    </div>

  </>

}