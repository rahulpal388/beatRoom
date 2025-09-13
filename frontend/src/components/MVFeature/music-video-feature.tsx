
import { AiSong } from "./ai-song";
import { MVCard } from "./MVCard";
import { PlaySong } from "./play-song";
import { SongQueue } from "./song-que-card";

const Card: {
    element: React.ReactNode,
    heading: string,
    description: string
}[] = [
        {
            element: <PlaySong />,
            heading: "Play Songs",
            description: "Stream your favorite tracks directly from YouTube and Spotify. With BeatRoom’s seamless playback, you and your friends can enjoy high-quality music anytime, anywhere."
        },
        {
            element: <SongQueue />,
            heading: "Song Queue",
            description: "Keep the vibe going with a smart queue system. Add songs to the lineup, rearrange tracks, and let everyone contribute to the perfect playlist without interrupting the flow."
        },
        {
            element: <AiSong />,
            heading: "AI Song Request",
            description: "Meet your personal DJ powered by AI. Just ask, and it will play the perfect track, build playlists for your mood, or surprise you with fresh recommendations."
        }
    ]


export function MusicVideoFeature() {

    return (
        <div className="mt-24 ">
            <h1 className="lg:text-4xl xm:text-3xl text-2xl text-center dark:text-background text-foreground font-bold font-heading ">Music & Video Feature</h1>
            <div className="grid md:grid-cols-3  md:gap-12 gap-8 mt-12 ">
                {Card.map((x, i) => (
                    <MVCard key={i} heading={x.heading} description={x.description} element={x.element} />
                ))}
            </div>
        </div>
    )

}

