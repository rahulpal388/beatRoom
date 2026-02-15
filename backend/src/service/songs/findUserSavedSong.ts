// import { songModel } from "../../db/schema/song.js";
// import { userModel } from "../../db/schema/user.js";



// export default async function findUserSavedSong(userId: string) {

//     const songId = await userModel
//         .findOne({ userId })
//         .select("likes.songs")

//     const song = await songModel.find({
//         _id: { $in: songId?.songs }
//     })

//     console.log(song)

//     return song || [];

// }