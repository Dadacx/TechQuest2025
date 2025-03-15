import Chat from './Chat.js'
import testCharacter from '../characters.json'
import '../styles/Nav.css'
import { use, useEffect, useState } from 'react'
import Settings from './Settings.js'
import { CharactersFetch } from './Fetch.js'

const plusGlyph = "➕"

const Nav = () => {
    const [ bookmarks, setBookmarks ] = useState([
        {id: "bookmark-1", name: "Zwykly chat.", workings: ""},
    ])
    // const characters = testCharacter
    const [ characters, setCharacters ] = useState(null)
    const [ selectedCharacter, setSelectedCharacter ] = useState(0)
    const [ activeBookmark, setBookmark ] = useState("bookmark-1")
    useEffect(() => {
        CharactersFetch().then((response) => {
            setCharacters(response)
            setSelectedCharacter(response[0].id)
        })
    }, [])

    useEffect(() => {
        const allButtons = document.querySelectorAll("#bookmarks ul li")
        const activeIndex = parseInt(activeBookmark.split("-")[1])
        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].id == activeBookmark) {
                allButtons[i].style.filter = "brightness(133%)"
            } else {
                allButtons[i].style.filter = `brightness(${(i + 1) > activeIndex ? 50 : 75}%)`
            }
        }
    }, [ activeBookmark ])

    var bookmarkInputLock = false
    const openBookmarkInput = () => {
        if (bookmarkInputLock) return
        const plusik = document.getElementById("plus")
        plusik.innerHTML = `<input type='text' autofocus placeholder='Nazwa zakladki'><hr><textarea placeholder='Dzialanie zakladki'>`
        plusik.style.filter = "brightness(80%)"
        bookmarkInputLock = true
        plusik.onkeyup = (e) => {
            if (e.key == 'Enter') {
                addBookmark(plusik.children[0].value, plusik.children[1].value)
                plusik.innerHTML = plusGlyph
                bookmarkInputLock = false
            }
        }
    }

    const addBookmark = (name, workings) => {
        const lastIndex = parseInt(bookmarks[bookmarks.length-1].id.split("-")[1])
        setBookmarks([...bookmarks, {id: `bookmark-${lastIndex+1}`, name: name, workings: workings}])
        setBookmark(`bookmark-${lastIndex+1}`)
    }

    return (
        <>
            <div id='bookmarks'>
                <ul>
                    {bookmarks.map((v) => {
                        return (
                            <li key={v.id} id={v.id} onClick={() => setBookmark(v.id)}>{v.name}</li>
                        )
                    })}
                    <li id="plus" onClick={() => openBookmarkInput()}>{plusGlyph}</li>
                </ul>
            </div>
            <Settings characters={characters} setCharacters={setCharacters} setSelectedCharacter={setSelectedCharacter} />
            {characters && <Chat character={characters.find(character => character.id === selectedCharacter)} />}
        </>
    )
}

export default Nav
