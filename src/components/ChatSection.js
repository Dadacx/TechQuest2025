import '../styles/ChatSection.css';

const ChatSection = ({ character, chatData }) => {
    return (
        <div className="chat-section" onLoad={() => console.log("changed")}>
            {chatData.map((chat, index) => {
                return (
                    <div key={index} className={chat.author === 'ai' ? 'message ai-message' : 'message user-message'}>
                        <div className='user-info'>
                            <img width={40} className='avatar' src={chat.author === 'ai' ? character.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt={chat.author === 'ai' ? character.name : 'You'} />
                            <span className='user-name'>{chat.author === 'ai' ? character.name : 'Ty'}</span>
                        </div>
                        <span>{chat.text}</span>
                    </div>
                )
            })}
        </div>
    );
}

export default ChatSection;
