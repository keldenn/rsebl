'use client';

import { useState, useEffect, useRef } from 'react';
import React from 'react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avater";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Chatbot() {
const [messages, setMessages] = useState([
    { sender: 'bot', text: "Kuzuzangpo la! I am RSEBot, your virtual assistant at the Royal Securities Exchange of Bhutan." }
]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false); 
    const [isOpen, setIsOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // const formatMessage = (message) => {
    //     // Check if the message has a numbered list (ordered list)
    //     const orderedListRegex = /^\d+\.\s/;
    //     const unorderedListRegex = /^[•-]\s/;
    
    //     if (orderedListRegex.test(message)) {
    //         // Split the message into an ordered list
    //         const listItems = message.split('\n').filter(item => orderedListRegex.test(item)).map(item => item.replace(orderedListRegex, '').trim());
    //         return (
    //             <ol className="list-decimal pl-5 space-y-2 text-xs">
    //                 {listItems.map((item, index) => (
    //                     <li key={index} >{item}</li>
    //                 ))}
    //             </ol>
    //         );
    //     } else if (unorderedListRegex.test(message)) {
    //         // Split the message into an unordered list
    //         const listItems = message.split('\n').filter(item => unorderedListRegex.test(item)).map(item => item.replace(unorderedListRegex, '').trim());
    //         return (
    //             <ul className="list-disc pl-5 space-y-2 text-xs">
    //                 {listItems.map((item, index) => (
    //                     <li key={index}>{item}</li>
    //                 ))}
    //             </ul>
    //         );
    //     } else {
    //         // Return message as plain text if no lists
    //         return <p className="text-xs">{message}</p>;
    //     }
    // };
    const formatMessage = (message) => {
        // Process bold text (**text**)
        const processBoldText = (text) => {
            if (typeof text !== 'string') return text;
            const parts = text.split(/(\*\*.+?\*\*)/g);
            return parts.map((part, i) => {
                if (part.startsWith('**') && part.endsWith('**')) {
                    return <strong key={`bold-${i}`}>{part.slice(2, -2)}</strong>;
                }
                return part;
            });
        };
    
        // Split message into paragraphs
        const paragraphs = message.split('\n').filter(p => p.trim() !== '');
    
        return (
            <div className="space-y-2 text-xs">
                {paragraphs.map((paragraph, paraIndex) => {
                    // Check for numbered list (1., 2., etc.)
                    if (/^\d+\.\s.+/.test(paragraph)) {
                        const text = paragraph.replace(/^\d+\.\s/, '');
                        return (
                            <div key={`para-${paraIndex}`} className="flex">
                                <span>{processBoldText(text)}</span>
                            </div>
                        );
                    }
                    // Check for bulleted list (•, -, *)
                    else if (/^[•*-]\s.+/.test(paragraph)) {
                        const text = paragraph.slice(2);
                        return (
                            <div key={`para-${paraIndex}`} className="flex">
                                <span>{processBoldText(text)}</span>
                            </div>
                        );
                    }
                    // Regular paragraph
                    else {
                        return (
                            <p key={`para-${paraIndex}`} className="whitespace-pre-wrap">
                                {processBoldText(paragraph)}
                            </p>
                        );
                    }
                })}
            </div>
        );
    };

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;
    
        const userMessage = { sender: 'user', text: input };
        const currentInput = input;
        setInput('');
        setMessages((prev) => [...prev, userMessage]);
        setIsLoading(true);
    
        try {
            const shouldStream = currentInput.length > 100;
    
            if (shouldStream) {
                const response = await fetch("http://127.0.0.1:5000/chat/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: currentInput, stream: true }),
                });
    
                const reader = response.body.getReader();
                let partialResponse = '';
                setMessages((prev) => [...prev, { sender: 'bot', text: '' }]);
    
                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
    
                    const chunk = new TextDecoder().decode(value);
                    partialResponse += chunk;
    
                    setMessages((prev) => [
                        ...prev.slice(0, -1),
                        { sender: 'bot', text: partialResponse }
                    ]);
                }
            } else {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: currentInput, stream: false })
                });
                const { response: botReply } = await response.json();
                const formattedMessage = formatMessage(botReply); // Format the response message
                setMessages((prev) => [...prev, { sender: 'bot', text: formattedMessage }]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Error: Unable to get response.' }]);
        }
    
        setIsLoading(false);
    };

    useEffect(() => {
        const hasSeenMessage = Cookies.get('hasSeenMessage');
        if (!hasSeenMessage) {
            setShowMessage(true);
            Cookies.set('hasSeenMessage', 'true', { expires: 1 }); // Expires in 7 days
            // console.log(showMessage)
        }
        if(isOpen && hasSeenMessage){
            setShowMessage(false);
        }
    }, [isOpen]);
    const Message = React.memo(({ msg }) => (
        <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} items-start gap-3`}>
            {msg.sender !== 'user' && (
                <Avatar className='border w-8 h-8'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Bot Avatar" />
                    <AvatarFallback>Bot</AvatarFallback>
                </Avatar>
            )}
            
            <div
                className={`flex flex-col gap-2 rounded-lg px-3 py-2 ${
                    msg.sender === 'user' ? 'ml-auto bg-custom-1 text-white' : 'bg-gray-200 dark:bg-gray-800'
                }`}
                style={{ display: 'inline-block', maxWidth: '55%', wordBreak: 'break-word' }}
            >
                {typeof msg.text === 'string' ? formatMessage(msg.text) : msg.text}
            </div>
        </div>
    ));
    
    
    

    const LoadingAnimation = () => (
        <div className="flex  items-center">
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="text-custom-1"
                animate={{ y: [-3, 3, -3] }} // Bouncing effect
                transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2, ease: "easeInOut" }}
            >
                ●
            </motion.span>
        ))}
    </div>
    );
    const resetChat = () => {
        setMessages([]);  // Clear chat history
        setInput('');     // Clear input field
    };
    
    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">

        {!isOpen && showMessage && (
            
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-2 bg-white text-gray-800 px-4 py-2 text-sm rounded-lg shadow-md border border-gray-300"
            >
                How can we assist you today?
            </motion.div>
        )}
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="h-12 w-12 rounded-full bg-custom-1 hover:bg-custom-2 text-white dark:text-custom-1 shadow-lg flex items-center justify-center"
                aria-label="Open chat"
            >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 60 60"
            width="100"
            height="100"
            fill="currentColor"
            className="text-white"
            >
            <g>
                <path d="M26,9.586C11.664,9.586,0,20.09,0,33c0,4.499,1.418,8.856,4.106,12.627c-0.51,5.578-1.86,9.712-3.813,11.666   c-0.304,0.304-0.38,0.768-0.188,1.153C0.276,58.789,0.625,59,1,59c0.046,0,0.093-0.003,0.14-0.01   c0.349-0.049,8.432-1.213,14.317-4.585c3.33,1.333,6.874,2.009,10.544,2.009c14.336,0,26-10.503,26-23.414S40.337,9.586,26,9.586z" />
                <path d="M55.894,37.042C58.582,33.27,60,28.912,60,24.414C60,11.503,48.337,1,34,1c-8.246,0-15.968,3.592-20.824,9.42   C17.021,8.614,21.38,7.586,26,7.586c15.439,0,28,11.4,28,25.414c0,5.506-1.945,10.604-5.236,14.77   c4.946,1.887,9.853,2.6,10.096,2.634c0.047,0.006,0.094,0.01,0.14,0.01c0.375,0,0.724-0.211,0.895-0.554   c0.192-0.385,0.116-0.849-0.188-1.153C57.753,46.753,56.403,42.619,55.894,37.042z" />
            </g>
            </svg>

            </Button>

            {isOpen && (
              <Card className="absolute bottom-16 right-0 
      h-[78vh] max-h-[690px]  // Sets height to 80% of viewport with a maximum of 690px
      w-[90vw] max-w-[490px]  // Sets width to 90% of viewport with a maximum of 450px
      md:max-w-[500px]        // At md breakpoint, max-width becomes 500px
      lg:max-w-[600px]        // At lg breakpoint, max-width becomes 610px
      rounded-xl border bg-card text-card-foreground shadow-lg p-4 flex flex-col">
                {/* Header */}
                <div className="flex flex-row items-center pb-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className='border'>
                            <AvatarImage src="/logo.svg" alt="User Avatar" />
                            <AvatarFallback>R</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm font-semibold">RSEB BOT</p>
                            <p className="text-xs text-muted-foreground hidden sm:block">Royal Securities Exchange of Bhutan</p>
                        </div>
                    </div>

                    {/* Button container - Ensures both buttons stay aligned to the right */}
                    <div className="ml-auto flex space-x-2">
                        <Button
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={resetChat}
                            aria-label="Reset chat"
                        >
                           <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            version="1.1"
                            width={256}
                            height={256}
                            viewBox="0 0 256 256"
                            xmlSpace="preserve"
                            // strokeWidth="9"  // Adjust this value to make thicker
                            >
                            <g
                                style={{
                                stroke: "none",
                                strokeWidth: 99,
                                strokeDasharray: "none",
                                strokeLinecap: "butt",
                                strokeLinejoin: "miter",
                                strokeMiterlimit: 10,
                                fill: "none",
                                fillRule: "nonzero",
                                opacity: 1
                                }}
                                transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
                            >
                                <path
                                d="M 78.761 56.581 c -1.518 -0.669 -3.286 0.021 -3.955 1.535 C 69.602 69.925 57.902 77.555 45 77.555 c -15.098 0 -27.825 -10.331 -31.491 -24.295 l 1.872 1.858 c 1.177 1.165 3.075 1.16 4.243 -0.017 c 1.167 -1.177 1.16 -3.076 -0.016 -4.243 l -8.05 -7.988 c -0.015 -0.015 -0.034 -0.024 -0.049 -0.039 c -0.134 -0.128 -0.278 -0.244 -0.434 -0.345 c -0.056 -0.036 -0.115 -0.062 -0.173 -0.094 c -0.124 -0.069 -0.249 -0.134 -0.382 -0.186 c -0.071 -0.027 -0.144 -0.045 -0.217 -0.067 c -0.124 -0.037 -0.249 -0.07 -0.38 -0.091 c -0.087 -0.014 -0.174 -0.02 -0.262 -0.026 C 9.588 42.016 9.519 42 9.445 42 c -0.051 0 -0.099 0.013 -0.149 0.015 c -0.043 0.002 -0.085 -0.006 -0.128 -0.002 c -0.05 0.005 -0.096 0.023 -0.146 0.03 c -0.124 0.018 -0.244 0.042 -0.362 0.074 c -0.082 0.022 -0.162 0.046 -0.241 0.075 c -0.12 0.044 -0.234 0.097 -0.346 0.155 c -0.072 0.037 -0.143 0.072 -0.212 0.115 c -0.112 0.07 -0.215 0.151 -0.316 0.234 c -0.058 0.048 -0.118 0.091 -0.173 0.143 c -0.118 0.113 -0.222 0.239 -0.321 0.37 c -0.023 0.031 -0.053 0.055 -0.076 0.087 l -0.019 0.027 c 0 0 0 0 0 0 l -6.426 9.304 c -0.941 1.363 -0.6 3.232 0.764 4.174 c 0.52 0.359 1.114 0.531 1.702 0.531 c 0.952 0 1.889 -0.452 2.471 -1.295 l 1.887 -2.732 c 3.81 17.279 19.237 30.25 37.644 30.25 c 15.279 0 29.134 -9.035 35.296 -23.019 C 80.964 59.02 80.276 57.249 78.761 56.581 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(0,0,0)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                                />
                                <path
                                d="M 88.705 33.2 c -1.363 -0.941 -3.232 -0.6 -4.174 0.763 l -1.887 2.732 C 78.835 19.416 63.408 6.445 45 6.445 c -15.278 0 -29.133 9.036 -35.296 23.019 c -0.668 1.516 0.019 3.287 1.535 3.955 c 1.517 0.668 3.287 -0.019 3.955 -1.535 C 20.399 20.075 32.099 12.445 45 12.445 c 15.098 0 27.825 10.332 31.49 24.296 l -1.872 -1.858 c -1.176 -1.167 -3.075 -1.16 -4.243 0.016 c -1.167 1.176 -1.159 3.076 0.017 4.243 l 8.05 7.988 c 0.043 0.043 0.095 0.074 0.141 0.115 c 0.099 0.087 0.197 0.176 0.308 0.25 c 0.06 0.04 0.127 0.067 0.19 0.103 c 0.107 0.061 0.211 0.125 0.325 0.172 c 0.075 0.031 0.155 0.047 0.232 0.072 c 0.108 0.035 0.214 0.076 0.327 0.099 c 0.193 0.039 0.391 0.06 0.591 0.06 c 0.092 0 0.185 -0.004 0.276 -0.013 c 0.05 -0.005 0.096 -0.023 0.145 -0.03 c 0.125 -0.018 0.246 -0.042 0.365 -0.075 c 0.081 -0.022 0.16 -0.045 0.238 -0.074 c 0.121 -0.044 0.236 -0.097 0.349 -0.156 c 0.071 -0.037 0.141 -0.071 0.209 -0.113 c 0.113 -0.071 0.217 -0.152 0.319 -0.236 c 0.057 -0.047 0.117 -0.089 0.171 -0.141 c 0.118 -0.113 0.221 -0.238 0.32 -0.368 c 0.024 -0.032 0.054 -0.056 0.077 -0.089 l 6.445 -9.332 C 90.41 36.01 90.068 34.142 88.705 33.2 z"
                                style={{
                                    stroke: "none",
                                    strokeWidth: 1,
                                    strokeDasharray: "none",
                                    strokeLinecap: "butt",
                                    strokeLinejoin: "miter",
                                    strokeMiterlimit: 10,
                                    fill: "rgb(0,0,0)",
                                    fillRule: "nonzero",
                                    opacity: 1
                                }}
                                transform=" matrix(1 0 0 1 0 0) "
                                strokeLinecap="round"
                                />
                            </g>
                            </svg>

                        </Button>
                        {/* CLOSE CHAT */}
                        <Button
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                                setIsOpen(false);
                           
                            }}
                            aria-label="Close chat"
                        >
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            fill="none"
                            >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
                                fill="#0F1729"
                            />
                            </svg>

                        </Button>
                   
                    </div>
                </div>


                {/* Chat Messages Container (Scrollable) */}
                <div className="flex-1 overflow-y-auto space-y-4 p-3 border rounded-lg">
                    {messages.map((msg, index) => <Message key={index} msg={msg} />)}

                    {isLoading && (
                <div className="flex justify-start items-center gap-3">
                    {/* Bot Avatar (shown on the left) */}
                    <Avatar className='border w-8 h-8'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="Bot Avatar" />
                        
                        <AvatarFallback>B</AvatarFallback>
                    </Avatar>

                    {/* Loading animation */}
                    <div className="flex max-w-[55%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-gray-200 dark:bg-gray-800">
                        <LoadingAnimation />
                    </div>
                </div>
            )}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Field (Fixed at Bottom) */}
                <form className="flex items-center space-x-2 pt-3" onSubmit={sendMessage}>
                    <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-1"
                        aria-label="Message input"
                    />
                   <Button 
                    type="submit" 
                    className="h-9 w-9 p-0 bg-custom-1 hover:bg-custom-2" 
                    aria-label="Send message"
                    disabled={!input.trim() || isLoading}  // Disable when input is empty or isLoading is true
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.0"
                    width="18"
                    height="18"
                    viewBox="0 0 512.000000 512.000000"
                    preserveAspectRatio="xMidYMid meet"
                    className="fill-current text-white dark:text-white" // Add this for color handling in light/dark mode
                    >
                    <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="currentColor" stroke="none">
                        <path d="M4828 5071 c-51 -27 -606 -316 -1233 -644 -627 -327 -1675 -875 -2330 -1216 -654 -342 -1200 -632 -1213 -644 -30 -27 -52 -77 -52 -117 0 -40 34 -105 64 -125 35 -23 1367 -477 1382 -471 7 3 199 164 426 358 227 195 850 727 1383 1182 534 456 981 838 995 850 l24 21 -24 -30 c-14 -17 -504 -608 -1090 -1314 -586 -705 -1066 -1286 -1068 -1289 -1 -6 2146 -745 2255 -777 51 -14 139 30 167 83 20 39 610 4015 602 4057 -8 43 -50 94 -93 111 -57 24 -96 17 -195 -35z"/>
                        <path d="M1870 845 c0 -561 -1 -549 56 -594 66 -52 155 -47 211 11 40 43 596 799 590 804 -4 4 -845 294 -853 294 -2 0 -4 -232 -4 -515z"/>
                    </g>
                    </svg>

                </Button>
                </form>
                <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                    Powered by <span className="font-semibold">Royal Securities Exchange of Bhutan</span>
                </div>
            </Card>

            )}
        </div>
    );
}
