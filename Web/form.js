 import { server } from "./server.js"

const form = document.querySelector("#form")
const  input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
   event.preventDefault()
   content.classList.add("placeholder")

   const videoURL = input.value 
    //console.log("URL DO VÍDEO; " , videoURL)

    if(!videoURL.includes("shorts")){
       return content.textContent = "Esse vídeo não é um Short."
    }

    const [_, params] = videoURL.split("/shorts/")
    const [videoID] = params.split("?si")
    
    content.textContent = "Obtendo o texto do áudio..."

   const transcription = await server.get("/summary/" + videoID)

    content.textContent = "Realizando o resumo..."
    
    const summary = await server.post("/summary" , {
      text: transcription.data.result
    })

    content.textContent = summary.data.result //posso colocar ali outra rota através do transcripition
    content.classList.remove("placeholder")
})