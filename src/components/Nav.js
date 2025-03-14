import Chat from './Chat.js'
import testCharacter from '../characters.json'
import '../styles/Nav.css'
import { useEffect, useState } from 'react'

const Nav = () => {
    const characters = testCharacter
    const [ activeBookmark, setBookmark ] = useState("bookmark-1")
    useEffect(() => {
        const allButtons = document.querySelectorAll("#bookmarks ul li")
        var activeIndex = parseInt(activeBookmark.split("-")[1])
        console.log(activeIndex)
        for (var i = 0; i < allButtons.length; i++) {
            if (allButtons[i].id == activeBookmark) {
                allButtons[i].style.filter = "brightness(133%)"
            } else {
                allButtons[i].style.filter = `brightness(${i < activeIndex ? ((activeIndex - i) * 8)*10 : 50}%)`
            }
        }
            //forEach((n) => {n.style.filter = "brightness(50%)"})
        //document.getElementById(activeBookmark).style.filter = "brightness(133%)"
    }, [ activeBookmark ])
    return (
        <>
            <div id='bookmarks'>
                <ul>
                    <li id="bookmark-1" onClick={() => setBookmark("bookmark-1")}>Velit ultrices.</li>
                    <li id="bookmark-2" onClick={() => setBookmark("bookmark-2")}>Convallis congue.</li>
                    <li id="bookmark-3" onClick={() => setBookmark("bookmark-3")}>Aliquet leo.</li>
                    <li id="bookmark-4" onClick={() => setBookmark("bookmark-4")}>Id natoque.</li>
                    <li id="bookmark-5" onClick={() => setBookmark("bookmark-5")}>Tincidunt morbi.</li>
                </ul>
            </div>
            <Chat character={characters[0]} />
        </>
    )
}

export default Nav
