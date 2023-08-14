const axios = require("axios")
const cheerio = require("cheerio")

async function fetchConversation(url) {
  try {
    const response = await axios.get(url)
    const html = response.data
    const $ = cheerio.load(html)

    const messages = $(
      "div.empty\\:hidden, div.markdown.prose.w-full.break-words.dark\\:prose-invert.light p"
    )

    // Inicializa um array para armazenar a conversa
    let conversation = []

    messages.each((index, element) => {
      if ($(element).hasClass("empty:hidden")) {
        conversation.push(["user", $(element).text().trim()])
      } else {
        let assistantMessage = $(element).text().trim()

        // Se a próxima mensagem ainda for do assistente, concatene-a
        while (
          $(element).next().hasClass("markdown prose w-full break-words dark:prose-invert light")
        ) {
          element = $(element).next()[0]
          assistantMessage += "\n" + $(element).text().trim()
        }

        conversation.push(["assistant", assistantMessage])
      }
    })

    return conversation
  } catch (error) {
    console.error("Erro ao obter a conversa:", error)
    return []
  }
}

module.exports = fetchConversation
