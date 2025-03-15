import '../styles/History.css';
import { useState, useEffect } from 'react';

const History = ({ characters, history, setChatData, setIsWelcome }) => {
    const [showHistory, setShowHistory] = useState(false);
    useEffect(() => {
        document.addEventListener('click', handleHistoryClose);

        return () => {
            document.removeEventListener('click', handleHistoryClose);
        }
    }, []);
    const handleHistoryClose = (e) => {
        if (!e.target.closest('.history-container')) {
            setShowHistory(false);
        }
    }
    console.log(history)
    return (<>
        <div className="history-container">
            <div className="history-icon" onClick={() => setShowHistory(!showHistory)}></div>
            {showHistory && <div className='history-content'>
                <h2>Historia</h2>
                <div className='history-list'>
                    {history && history.map((item, index) => (
                        <div key={index} className="history-item">
                            <p className="history-prompt" onClick={() => {
                                setIsWelcome(false);
                                const character = characters.find(character => character.id === item.Assistant)
                                var tempData = [
                                    { text: item.Prompt, author: 'user', character: character },
                                    { text: item.Odp, author: 'ai', character: character }
                                ]
                                setChatData((prevChatData) => [...prevChatData, ...tempData]);
                            }}>({characters.find(character => character.id === item.Assistant).name}) {'>'} {item.Tytul || item.Prompt}</p>
                            {/* <p className="history-odp">{item.Odp}</p> */}
                        </div>
                    ))}
                </div>
            </div>}
        </div>
    </>
    );
};

export default History;