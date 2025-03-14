import Chat from './Chat.js'
import testCharacter from '../characters.json'
import '../styles/Nav.css'
import { useEffect, useState } from 'react'

const Nav = () => {
    const characters = testCharacter
    const [ bookmarks, setBookmarks ] = useState([
        {id: "bookmark-1", name: "Zwykly chat."},
        {id: "bookmark-2", name: "KotAI."},
    ])
    const [ activeBookmark, setBookmark ] = useState("bookmark-1")
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
    const addBookmark = (name) => {
        const lastIndex = parseInt(bookmarks[bookmarks.length-1].id.split("-")[1])
        setBookmarks([...bookmarks, {id: `bookmark-${lastIndex+1}`, name: name}])
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
                    <li id="plus" onClick={() => addBookmark("Nowe")}>+</li>
                </ul>
            </div>
            <Chat character={characters[0]} />
        </>
    )
}

export default Nav
