import { pipeline } from "@xenova/transformers"
import { transcriptionExemple } from "./utils/transcription.js"

export async function transcribe(audio) {
  try {
    //return transcriptionExemple

    console.log("Realizando a transcrição...")

    const transcribe = await pipeline(
      "automatic-speech-recognition",
      "Xenova/whisper-small"
    )

    const transcription = await transcribe(audio, {
      chunk_length_s: 30,
      stride_length_s: 5,
      lenguage: "portuguese",
      task: "transcribe",
    })

    console.log("Transcrição finalizada!")
    return transcription?.text.replace("[Música]", "")
  } catch (error) {
    throw new error(error)
  }
}
