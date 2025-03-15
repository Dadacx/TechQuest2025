import token from '../.token.js'
const host = `http://192.168.18.71:1122`
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
    const res = await fetch(`${host}/characters`)
    const json = await res.json()

    return json
}
const AddCharacterFetch = async (character) => {
    const res = await fetch(`${host}/characters`, {
        method: "POST",
        body: JSON.stringify(character),
    })
    const response = await res.text()
    console.log(response)
    return res.ok ? response : null
}
const HistoryFetch = async () => {
    const res = await fetch(`${host}/history`)
    const json = await res.json()

    return json
}
const AddHistoryFetch = async (history) => {
    const res = await fetch(`${host}/history`, {
        method: "POST",
        body: JSON.stringify(history),
    })
    const response = await res.text()
    console.log(response)
    return res.ok ? response : null
}
const BookmarksFetch = async () => {
    const res = await fetch(`${host}/bookmarks`)
    const json = await res.json()

    return json
}
const AddBookmarkFetch = async (bookmark) => {
    const res = await fetch(`${host}/bookmarks`, {
        method: "POST",
        body: JSON.stringify(bookmark),
    })
    const response = await res.text()
    console.log(response)
    return res.ok ? response : null
}

export { PromptFetch, CharactersFetch, AddCharacterFetch, HistoryFetch, AddHistoryFetch, BookmarksFetch, AddBookmarkFetch };