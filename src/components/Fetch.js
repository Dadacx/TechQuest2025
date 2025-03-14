import token from '../.token.js'
const PromptFetch = async (prompt) => {
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
    console.log(json)
    return json.candidates[0].content.parts[0].text
}
const CharactersFetch = async () => {
    const res = await fetch(`http://192.168.186.71:1122/characters`)
    const json = await res.json()

    return json
}
const AddCharacterFetch = async (character) => {
    const res = await fetch(`http://192.168.186.71:1122/characters`, {
        method: "POST",
        body: JSON.stringify(character),
    })
    const json = await res.json()
    console.log(json)
    return json.candidates[0].content.parts[0].text
}

export { PromptFetch, CharactersFetch, AddCharacterFetch }