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
              const response = await fetch("http://127.0.0.1:8000/chat/", {
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
                setMessages((prev) => [...prev, { sender: 'bot', text: botReply }]);
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
            {/* Bot Avatar (shown on the left) */}
            {msg.sender !== 'user' && (
                <Avatar className='border w-8 h-8'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="Bot Avatar" />
                    <AvatarFallback>Bot</AvatarFallback>
                </Avatar>
            )}
    
            {/* Message Bubble */}
            <div
                className={`flex flex-col gap-2 rounded-lg px-3 py-2 text-xs ${
                    msg.sender === 'user' ? 'ml-auto bg-custom-1 text-white ' : 'bg-gray-200 dark:bg-gray-800'
                }`}
                style={{ display: 'inline-block', maxWidth: '55%', wordBreak: 'break-word' }}
            >
                {msg.text}
            </div>
    
            {/* User Avatar (shown on the right) */}
            {msg.sender === 'user' && (
                <Avatar className='border w-8 h-8'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="User Avatar" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            )}
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
                💬
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
                            ⟳
                        </Button>

                        <Button
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() => {
                                setIsOpen(false);
                           
                            }}
                            aria-label="Close chat"
                        >
                            ✖
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
