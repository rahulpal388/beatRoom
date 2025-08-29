import { Hero } from "@/components/hero";
import { NavBar } from "@/components/navBar";



export default function App() {


  return <>

    <div className=" px-24 py-4 bg-background h-screen w-screen text-white ">
      <NavBar />
      <Hero />
    </div>

  </>

}