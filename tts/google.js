const textToSpeech = require("@google-cloud/text-to-speech")

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

module.exports = textToAudio
