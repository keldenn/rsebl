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
        // First process bold text (**text**)
        const processBoldText = (text) => {
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
                        const match = paragraph.match(/^(\d+)\.\s(.+)/);
                        if (match) {
                            return (
                                <div key={`para-${paraIndex}`} className="flex">
                                    <span className="mr-2">{match[1]}.</span>
                                    <span>{processBoldText(match[2])}</span>
                                </div>
                            );
                        }
                    }
                    // Check for bulleted list (•, -, *)
                    else if (/^[•*-]\s.+/.test(paragraph)) {
                        return (
                            <div key={`para-${paraIndex}`} className="flex">
                                <span className="mr-2">•</span>
                                <span>{processBoldText(paragraph.slice(2))}</span>
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
              <Card className="absolute bottom-16 h-[490px] right-0 min-w-[300px] md:min-w-[400px] lg:min-w-[410px] rounded-xl border bg-card text-card-foreground shadow-lg p-4 flex flex-col">
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
                                version={1.0}
                                width="512.000000pt"
                                height="512.000000pt"
                                viewBox="0 0 512.000000 512.000000"
                                preserveAspectRatio="xMidYMid meet"
                                        className="text-dark dark:text-white"
                                >
                                <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                                    fill="currentColor"

                                    stroke="none"
                                >
                                    <path d="M2265 4703 c-632 -85 -1207 -461 -1550 -1014 -201 -324 -315 -722 -315 -1100 l0 -129 -160 0 -160 0 -36 -33 c-46 -42 -56 -105 -26 -152 32 -48 750 -867 759 -865 11 2 730 826 755 865 30 47 20 111 -26 152 l-36 33 -186 0 -187 0 6 158 c14 382 154 701 426 972 277 276 594 414 981 427 140 4 184 2 288 -16 261 -44 484 -145 686 -310 l80 -65 34 40 c18 21 121 141 228 266 l194 228 -73 60 c-175 147 -453 307 -658 378 -127 45 -318 90 -452 107 -147 19 -424 18 -572 -2z" />
                                    <path d="M3970 3090 c-206 -237 -381 -442 -388 -457 -23 -43 -9 -102 32 -140 l36 -33 185 0 186 0 -6 -47 c-49 -368 -178 -637 -425 -884 -226 -226 -479 -356 -795 -411 -100 -17 -146 -19 -280 -15 -294 10 -531 86 -764 242 -81 54 -85 56 -102 38 -10 -10 -112 -128 -228 -263 -194 -228 -208 -246 -193 -263 26 -29 232 -163 332 -216 599 -315 1344 -323 1955 -21 231 114 410 245 595 437 275 283 449 592 544 965 31 122 66 338 66 409 l0 29 160 0 160 0 36 33 c46 41 56 105 26 152 -14 22 -689 801 -751 867 -4 4 -175 -186 -381 -422z" />
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
                                version={1.0}
                                width="512.000000pt"
                                height="512.000000pt"
                                viewBox="0 0 512.000000 512.000000"
                                fill="currentColor"
                                 className="text-dark dark:text-white"
                                preserveAspectRatio="xMidYMid meet"
                                >
                                <g
                                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        
                                    stroke="none"
                                >
                                    <path d="M395 5076 c-170 -41 -316 -188 -355 -356 -28 -120 -7 -261 54 -364 14 -23 419 -435 900 -916 l876 -875 -888 -890 c-956 -958 -930 -929 -967 -1070 -29 -115 -13 -234 47 -347 94 -177 315 -263 549 -214 140 30 103 -3 1054 947 484 483 885 879 890 879 5 0 406 -395 890 -879 816 -815 885 -881 945 -909 207 -96 457 -57 600 94 135 142 166 360 78 543 -29 61 -99 133 -927 958 l-896 891 871 874 c543 544 881 890 897 918 44 78 60 152 55 259 -6 115 -30 185 -93 269 -123 163 -346 232 -540 166 -111 -37 -161 -84 -1029 -953 l-850 -850 -875 872 c-941 936 -918 916 -1056 952 -69 18 -160 18 -230 1z" />
                                </g>
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
