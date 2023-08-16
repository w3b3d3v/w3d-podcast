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
  const audios = await Promise.all(
    fullConversation.reduce((acc, [role, message]) => {
      if (role === "user") {
        acc.push(textToAudio(message, "pt-BR", "MALE", "pt-BR-Wavenet-B"))
      } else {
        acc.push(textToAudio(message, "pt-BR", "FEMALE", "pt-BR-Wavenet-A"))
      }
      return acc
    }, [])
  )
  // Salve o áudio em um arquivo
  await util.promisify(fs.writeFile)(
    "tts_conversation.mp3",
    audios.reduce((acc, audio) => Buffer.concat([acc, audio]), Buffer.alloc(0))
  )
  console.log("Conversão concluída! O arquivo 'tts_conversation.mp3' foi salvo no diretório atual.")
}

const conversationId = process.argv[2]
const url = `https://chat.openai.com/share/${conversationId}`

fetchConversation(url).then(async (conversation) => {
  console.log(conversation)
  await convertConversation(conversation)
})
