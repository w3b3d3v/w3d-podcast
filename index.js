const textToSpeech = require("@google-cloud/text-to-speech")
const fs = require("fs")
const util = require("util")
const { execSync } = require("child_process")
const fetchConversation = require("./fetch_conversation.js")
require("dotenv").config()

// Crie um cliente para a API Text-to-Speech
const client = new textToSpeech.TextToSpeechClient()

async function textToAudio(text, languageCode, gender, voiceName) {
  const request = {
    input: { text: text },
    voice: {
      languageCode: languageCode,
      name: voiceName,
      ssmlGender: gender,
    },
    audioConfig: { audioEncoding: "MP3" },
  }

  const [response] = await client.synthesizeSpeech(request)
  return response.audioContent
}

async function convertConversation(fullConversation) {
  let audioData = Buffer.alloc(0)

  for (const [role, message] of fullConversation) {
    let audio
    if (role === "user") {
      audio = await textToAudio(message, "pt-BR", "MALE", "pt-BR-Wavenet-B")
    } else {
      audio = await textToAudio(message, "pt-BR", "FEMALE", "pt-BR-Wavenet-A")
    }
    audioData = Buffer.concat([audioData, audio])
  }

  // Salve o áudio em um arquivo
  const writeFile = util.promisify(fs.writeFile)
  await writeFile("tts_conversation.mp3", audioData)
  console.log("Conversão concluída! O arquivo 'tts_conversation.mp3' foi salvo no diretório atual.")
}

const conversationId = process.argv[2]
const url = `https://chat.openai.com/share/${conversationId}`

fetchConversation(url).then(async (conversation) => {
  console.log(conversation)
  await convertConversation(conversation)
})
