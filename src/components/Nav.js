import Chat from './Chat.js'
import testCharacter from '../characters.json'
import '../styles/Nav.css'
import { use, useEffect, useState } from 'react'
import Settings from './Settings.js'
import History from './History.js'
import delete_icon from '../images/delete-icon.svg'
import { CharactersFetch, HistoryFetch, BookmarksFetch, AddBookmarkFetch, RemoveBookmarkFetch } from './Fetch.js'

const plusGlyph = "➕"

const Nav = () => {
    const [bookmarks, setBookmarks] = useState([
        { id: "bookmark-1", Nazwa: "Zwykly chat.", workings: null },
    ])
    const [plusikHTML, setPlusikHTML] = useState(plusGlyph)
    // const characters = testCharacter
    const [characters, setCharacters] = useState(null)
    const [history, setHistory] = useState([])
    const [chatData, setChatData] = useState([]);
    const [isWelcome, setIsWelcome] = useState(true);
    const [additionalPrompt, setAdditionalPrompt] = useState(null)
    const [selectedCharacter, setSelectedCharacter] = useState(0)
    const [activeBookmark, setBookmark] = useState("bookmark-1")
    useEffect(() => {
        CharactersFetch().then((response) => {
            setCharacters(response)
            setSelectedCharacter(response[0].id)
        })
        HistoryFetch().then((response) => {
            setHistory(response.reverse())
        })
        BookmarksFetch().then((response) => {
            var newBookmarks = bookmarks
            var lastIndex = parseInt(bookmarks[bookmarks.length - 1].id.split("-")[1])
            for (var i = 0; i < response.length; i++) {
                const curr = response[i]
                newBookmarks.push(
                    { Nazwa: curr.Nazwa, workings: curr.Workings, id: `bookmark-${lastIndex + 1}` }
                )
                lastIndex += 1
            }
            setBookmarks(newBookmarks)
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
    }, [activeBookmark])
    useEffect(() => {
        setChatData([])
        setIsWelcome(true)
        setAdditionalPrompt(bookmarks.find(bookmark => bookmark.id === activeBookmark).workings)
    }, [activeBookmark])

    var bookmarkInputLock = false
    const openBookmarkInput = () => {
        if (bookmarkInputLock) return
        const plusik = document.getElementById("plus")
        const anulacja = () => {
            setPlusikHTML(plusGlyph)
        }
        setPlusikHTML(
            <>
                <input type='text' autoFocus placeholder='Nazwa zakladki' />
                <textarea placeholder='Dzialanie zakladki'></textarea>
            </>
        )
        plusik.style.filter = "brightness(80%)"
        bookmarkInputLock = true
        plusik.onkeyup = (e) => {
            if (e.key == 'Enter') {
                addBookmark(plusik.children[0].value, plusik.children[1].value)
                setPlusikHTML(plusGlyph)
                bookmarkInputLock = false
                AddBookmarkFetch({ Nazwa: plusik.children[0].value, workings: plusik.children[1].value }).then((response) => {
                    if (response) {
                        console.log(response);
                    }
                });
            } else if (e.key == 'Escape') {
                setPlusikHTML(plusGlyph)
                bookmarkInputLock = false
            }
        }
    }

    const addBookmark = (name, workings) => {
        const lastIndex = parseInt(bookmarks[bookmarks.length - 1].id.split("-")[1])
        var bookmarkJSON = { Nazwa: name, workings: workings, id: `bookmark-${lastIndex + 1}` }
        setBookmarks([...bookmarks, bookmarkJSON])
    }
    return (
        <>
            <div id='bookmarks'>
                <ul>
                    {bookmarks.map((v) => {
                        return (
                            <div className="bookmarks-box">
                                <div className="image">
                                    <img className="delete_image" src={delete_icon} alt="delete_icon"
                                        onClick={() => RemoveBookmarkFetch(v.Nazwa).then(r => {
                                            if (r) setBookmarks(bookmarks.filter(x => x.Nazwa !== v.Nazwa));
                                        })}
                                    />
                                </div>
                                <li key={v.id} id={v.id} onClick={() => setBookmark(v.id)} title={v.workings}>
                                    {v.Nazwa}
                                </li>
                            </div>
                        );
                        
                    })}
                    <li id="plus" onClick={() => openBookmarkInput()} title='Dodaj nową zakładke'>{plusikHTML}</li>
                </ul>
            </div>
            <Settings characters={characters} setCharacters={setCharacters} setSelectedCharacter={setSelectedCharacter} />
            <History characters={characters} history={history} setChatData={setChatData} setIsWelcome={setIsWelcome} />
            {characters && <Chat character={characters.find(character => character.id === selectedCharacter)} setHistory={setHistory}
                chatData={chatData} setChatData={setChatData} isWelcome={isWelcome} setIsWelcome={setIsWelcome}
                additionalPrompt={additionalPrompt} />}
        </>
    )
}

export default Nav
