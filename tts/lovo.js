require("dotenv").config()
const axios = require("axios")

// Função para converter texto em fala
async function textToSpeech(text) {
  const url = "https://api.genny.lovo.ai/api/v1/tts"
  const headers = {
    "X-API-KEY": process.env.LOVO_API_KEY,
    "Content-Type": "application/json",
  }
  const data = {
    text: text,
    speaker: "63b409c6241a82001d51c728",
    // Você pode especificar outros parâmetros aqui, como o ID do falante, se desejar
  }

  try {
    const response = await axios.post(url, data, { headers: headers })
    console.log(response.data)
    const jobId = response.data.id

    // Consulte o status do trabalho até que ele seja concluído
    let jobResult = null
    while (!jobResult) {
      const jobStatusResponse = await axios.get(`https://api.genny.lovo.ai/api/v1/tts/${jobId}`, {
        headers: headers,
      })
      if (jobStatusResponse.data.status === "done") {
        jobResult = jobStatusResponse.data
      } else {
        // Aguarde um pouco antes de consultar novamente
        await new Promise((resolve) => setTimeout(resolve, 2000))
      }
    }

    console.log(jobResult.data[0].urls[0])
  } catch (error) {
    console.error("Erro ao converter texto em fala:", error)
  }
}

// Teste a função
textToSpeech("Testando a API da Lovo!")
