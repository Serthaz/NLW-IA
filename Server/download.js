import ytdl from "ytdl-core"
import fs from "fs"


//const fs = require('fs')
export const download = (videoId) => new Promise((resolve, reject) => {
  
  const videoURL = "https://youtube.com/shorts/" + videoId
  console.log("Downloading:", videoId)

  ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
    .on("info", (info) => {
      const seconds = info.formats[0].approxDurationMs / 1000

      if (seconds > 60) {
        throw new Error("A duração do vídeo é maior que 1 minuto")
      }
    })
    .on("end", () => {
      console.log("Download is Finish!")
      resolve()
    })
    .on("error", (error) => {
      console.log("Download faliure!!", error)
      reject(error)
    })
    .pipe(fs.createWriteStream("./temp/audio.mp4"))
})

//export function download(){}
