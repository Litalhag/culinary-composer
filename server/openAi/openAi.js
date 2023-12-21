const { OpenAI } = require('openai')

let openaiInstance = null

const getOpenAiInstance = () => {
  if (!openaiInstance) {
    const configuration = {
      apiKey: process.env.OPENAI_API_KEY,
    }
    openaiInstance = new OpenAI(configuration)
  }
  return openaiInstance
}

module.exports = getOpenAiInstance
