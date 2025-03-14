import '../styles/ChatSection.css';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const ChatSection = ({ character, chatData, aiThinking }) => {
    return (
        <div className="chat-section" onLoad={(e) => e.currentTarget.scrollTop = e.currentTarget.scrollHeight}>
            {chatData.map((chat, index) => {
                return (
                    <div key={index} className={chat.author === 'ai' ? 'message ai-message' : 'message user-message'}>
                        <div className='user-info'>
                            <img width={40} className='avatar' src={chat.author === 'ai' ? chat.character?.avatar || character.avatar :
                                'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt={chat.author === 'ai' ? character.name : 'You'} />
                            <span className='user-name'>{chat.author === 'ai' ? chat.character?.name || character.name : 'Ty'}</span>
                        </div>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || "");
                                    return !inline && match ? (
                                        <SyntaxHighlighter
                                            style={dracula}
                                            language={match[1]}
                                            PreTag="div"
                                        >
                                            {String(children).replace(/\n$/, "\n")}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                                p({ children }) {
                                    return <p style={{ whiteSpace: 'pre-line' }}>{children}</p>;
                                }
                            }}
                        >
                            {chat.text}
                        </ReactMarkdown>
                    </div>
                );
            })}
            {aiThinking && <div className={'message ai-message'}>
                <div className='user-info'>
                    <img width={40} className='avatar' src={character.avatar} alt={character.name} />
                    <span className='user-name'>{character.name}</span>
                </div>
                <p>Myślę...</p>
            </div>}
        </div>
    );
}

export default ChatSection;
