import token from '../.token.js'
const Prompt = async (prompt) => {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${token}`, {
        method: "POST",
        body: 
            `{
                "contents": [{
                    "parts":[{"text": "${prompt}"}]
                }]
            }`
    })
    const json = await res.json()

    return json.candidates[0].content.parts[0].text
}

export default Prompt
