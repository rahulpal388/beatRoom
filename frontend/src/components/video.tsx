import ReactPlayer from "react-player"
import { ReactPlayerProps } from "react-player/types"

export function Video() {

    const onSeeked: ReactPlayerProps["onSeeking"] = (second) => {
        console.log(second)
    }


    const onProgress: ReactPlayerProps["onProgress"] = (state) => {
        const a = state.currentTarget; // e.g. 25
        console.log(a)
    }

    return <>
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
    </>

}

