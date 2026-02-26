import { SearchBar } from "@/components/dashboard/music/SearchBar";



export default function SearchPage() {

    return (
        <>
            <div className=" py-6  ">
                <div className=" lg:hidden ">
                    <SearchBar />
                </div>
                <div className=" mt-8 max-lg:hidden  flex w-full  items-center justify-center ">
                    <p className=" font-semibold text-xl  ">Mobile Only Page</p>
                </div>
            </div>
        </>

    )
}