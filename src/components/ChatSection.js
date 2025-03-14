import '../styles/ChatSection.css';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const ChatSection = ({ character, chatData }) => {
    return (
        <div className="chat-section" onLoad={(e) => e.currentTarget.scrollTop = e.currentTarget.scrollHeight}>
            {chatData.map((chat, index) => {
                return (
                    <div key={index} className={chat.author === 'ai' ? 'message ai-message' : 'message user-message'}>
                        <div className='user-info'>
                            <img width={40} className='avatar' src={chat.author === 'ai' ? character.avatar : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt={chat.author === 'ai' ? character.name : 'You'} />
                            <span className='user-name'>{chat.author === 'ai' ? character.name : 'Ty'}</span>
                        </div>
                        <p>
                        <ReactMarkdown
                            children={chat.text}
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
                                            {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                    ) : (
                                        <code className={className} {...props}>
                                            {children}
                                        </code>
                                    );
                                },
                            }}
                        /></p>
                    </div>
                )
            })}
        </div>
    );
}

export default ChatSection;
