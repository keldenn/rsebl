"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function Chat() {
  const [messages, setMessages] = useState([
    { text: "Hi, how can I help you today?", sender: "agent" },
    { text: "Hey, I'm having trouble with my account.", sender: "user" },
    { text: "What seems to be the problem?", sender: "agent" },
    { text: "I can't log in.", sender: "user" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Toggle chat visibility

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-12 w-12 rounded-full bg-primary text-white shadow-lg"
      >
        💬
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="absolute bottom-16 right-0 w-80 rounded-xl border bg-card text-card-foreground shadow-lg p-4">
          <div className="flex flex-row items-center pb-4">
            <div className="flex items-center space-x-4">
              <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
                <Image
                  className="aspect-square h-full w-full"
                  alt="User Avatar"
                  src="/avatars/01.png"
                  width={40}
                  height={40}
                />
              </span>
              <div>
                <p className="text-sm font-medium leading-none">Sofia Davis</p>
                <p className="text-sm text-muted-foreground">m@example.com</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="ml-auto h-9 w-9 rounded-full"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </Button>
          </div>

          <div className="space-y-4 pb-4 max-h-64 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
                  msg.sender === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form className="flex items-center space-x-2" onSubmit={sendMessage}>
            <Input
              id="message"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="h-9 w-9 p-0">
              →
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
