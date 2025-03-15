import { useState, useRef, useEffect } from 'react';
import '../styles/Chat.css';
import { PromptFetch, AddHistoryFetch } from './Fetch';
import ChatSection from './ChatSection';

const Chat = ({ character, chatData, setChatData, setHistory, isWelcome, setIsWelcome }) => {
    const [prompt, setPrompt] = useState(null);
    const textareaRef = useRef(null);
    const inputBoxRef = useRef(null);

    useEffect(() => {
        adjustHeight();
    }, []);

    useEffect(() => {
        setIsWelcome(true);
        setChatData([]);
    }, [character]);

    useEffect(() => {
        if (prompt) {
            console.log("prompt", prompt);
            PromptFetch(prompt).then((response) => {
                console.log(response)
                setChatData([...chatData, { text: response, author: 'ai' }]);
                const promptJSON = {
                    Prompt: prompt.replace(character.behaviour, "").trim(),
                    Odp: response,
                    Assistant: character.id
                }
                AddHistoryFetch(promptJSON).then((response2) => {
                    if (response2) {
                        console.log(response2);
                        setHistory((prevHistory) => [...prevHistory, promptJSON]);
                    }
                });
                setPrompt(null);
            });
        }
    }, [prompt]);

    function sendPrompt() {
        const promptValue = textareaRef.current.value;

        if (promptValue.trim() !== '') {
            //             console.log(`${promptValue}
            // ${character.behaviour}`);
            setPrompt(`${promptValue}
${character.behaviour}`);
            setIsWelcome(false);
            setChatData([...chatData, { text: promptValue, author: 'user' }]);
            textareaRef.current.value = '';
            textareaRef.current.focus();
            adjustHeight();
        }
    }

    function adjustHeight() {
        const textarea = textareaRef.current;
        const inputBox = inputBoxRef.current;

        if (textarea && inputBox) {
            textarea.style.height = "20px"
            textarea.style.height = textarea.scrollHeight + 'px';
            inputBox.style.height = 31 + textarea.scrollHeight + 'px';
        }
    }

    return (
        <div className="chat-box">
            {isWelcome ? <h1>Witaj, nazywam się {character.name}.<br /> Jak mogę ci pomóc?</h1> :
                <ChatSection character={character} chatData={chatData} />}
            <div className={isWelcome ? 'input-box' : 'input-box input-box-down'} ref={inputBoxRef}>
                <textarea
                    className='chat-input'
                    placeholder="Jak mogę pomóc?"
                    ref={textareaRef}
                    onInput={adjustHeight}
                    onKeyUp={(event) => {
                        if (event.key === 'Enter') {
                            console.log('Enter został naciśnięty!');
                            sendPrompt();
                        }
                    }}
                ></textarea>
                <div className="send-btn" onClick={sendPrompt}>
                    <div className='send-btn-icon'></div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
