import ReactPlayer from "react-player"
import { ReactPlayerProps } from "react-player/types"
import { YTVideoSuggestion } from "./yt_video_suggestion";



type VideoInfo = {
    title: string;
    url: string;
    thumbnailUrl: string;
    publishedAgo: string;
};

const videos: VideoInfo[] = [
    {
        title: "Analyzing the 10 GREATEST Thumbnails of All Time",
        url: "https://www.youtube.com/watch?v=q_M68Asg7Q4",
        thumbnailUrl: "https://img.youtube.com/vi/q_M68Asg7Q4/hqdefault.jpg",
        publishedAgo: "7 months ago",
    },
    {
        title: "How To Make Better Thumbnails in 2025",
        url: "https://www.youtube.com/watch?v=Ddb2vx-Oa3M",
        thumbnailUrl: "https://img.youtube.com/vi/Ddb2vx-Oa3M/hqdefault.jpg",
        publishedAgo: "3 months ago",
    },
    {
        title: "YouTube trends you should already be doing by now",
        url: "https://www.youtube.com/watch?v=qG3sV9b71aw",
        thumbnailUrl: "https://img.youtube.com/vi/qG3sV9b71aw/hqdefault.jpg",
        publishedAgo: "Last month",
    },
    // Add more up to 10 similarly...
    {
        title: "Title 4",
        url: "https://www.youtube.com/watch?v=VIDEO_ID4",
        thumbnailUrl: "https://img.youtube.com/vi/Ddb2vx-Oa3M/hqdefault.jpg",
        publishedAgo: "X time ago",
    },
    {
        title: "Title 5",
        url: "https://www.youtube.com/watch?v=VIDEO_ID5",
        thumbnailUrl: "https://img.youtube.com/vi/Ddb2vx-Oa3M/hqdefault.jpg",
        publishedAgo: "X time ago",
    },
    {
        title: "Title 6",
        url: "https://www.youtube.com/watch?v=VIDEO_ID6",
        thumbnailUrl: "https://img.youtube.com/vi/Ddb2vx-Oa3M/hqdefault.jpg",
        publishedAgo: "X time ago",
    },
    {
        title: "Title 7",
        url: "https://www.youtube.com/watch?v=VIDEO_ID7",
        thumbnailUrl: "https://img.youtube.com/vi/Ddb2vx-Oa3M/hqdefault.jpg",
        publishedAgo: "X time ago",
    },
    {
        title: "Title 8",
        url: "https://www.youtube.com/watch?v=VIDEO_ID8",
        thumbnailUrl: "https://img.youtube.com/vi/Ddb2vx-Oa3M/hqdefault.jpg",
        publishedAgo: "X time ago",
    },
    {
        title: "Title 9",
        url: "https://www.youtube.com/watch?v=VIDEO_ID9",
        thumbnailUrl: "https://img.youtube.com/vi/Ddb2vx-Oa3M/hqdefault.jpg",
        publishedAgo: "X time ago",
    }
];



export function YTVideo() {

    const onSeeked: ReactPlayerProps["onSeeking"] = (second) => {
        console.log(second)
    }


    const onProgress: ReactPlayerProps["onProgress"] = (state) => {
        const a = state.currentTarget; // e.g. 25
        console.log(a)
    }

    return <>
        <div className=" max-w-[45rem] flex-1 flex flex-col ">

            <div className="flex-1">
                <div className="h-full w-full">
                    <ReactPlayer
                        src="https://youtu.be/-YlmnPh-6rE?si=8SqO0ZVufyZRhioq"
                        style={{
                            width: "100%",
                            height: "100%"
                        }}
                        onPlay={() => {
                            console.log("video playing")
                        }}
                        onPause={() => {
                            console.log("video paused")
                        }}
                        onSeeking={onSeeked}
                        onProgress={onProgress}
                        onTimeUpdate={(e) => {
                            // console.log(e)
                        }}

                        controls
                    />
                </div>
            </div>
            <div className="flex-1 grid grid-cols-3  gap-2 py-4 px-4 overflow-y-scroll  ">
                {videos.map((x, i) => (
                    <YTVideoSuggestion key={i} title={x.title} thumbnailUrl={x.thumbnailUrl} />
                ))}
            </div>
        </div>

    </>

}

