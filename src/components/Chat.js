import { useState, useRef, useEffect } from 'react';
import '../styles/Chat.css';
import PromptFetch from './Fetch';
import ChatSection from './ChatSection';

const Chat = ({ character }) => {
    const [prompt, setPrompt] = useState(null);
    const [chatData, setChatData] = useState([]);
    const [isWelcome, setIsWelcome] = useState(true);
    const textareaRef = useRef(null);
    const inputBoxRef = useRef(null);

    useEffect(() => {
        adjustHeight();
    }, []);

    useEffect(() => {
        if (prompt) {
            console.log("prompt", prompt);
            PromptFetch(prompt).then((response) => {
                console.log(response)
                setChatData([...chatData, { text: response, author: 'ai' }]);
            });
        }
    }, [prompt]);
    
    function sendPrompt() {
        const prompt = textareaRef.current.value;
        // setPrompt(prompt);
        // inputBoxRef.current.classList.add('input-box-down')
        // document.getElementById('chat-box').classList.
        setIsWelcome(false);
        var data = [...chatData]
        data.push({ text: prompt, author: 'user' })
        data.push({ text: prompt+" (AI)", author: 'ai' })
        setChatData(data);
        // setChatData([...chatData, { text: prompt, author: 'user' }]);
        textareaRef.current.value = '';

        // setChatData([...chatData, { text: prompt+" (AI)", author: 'ai' }]);
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
                ></textarea>
                <div className="send-btn" onClick={sendPrompt}>
                    <div className='send-btn-icon'></div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
