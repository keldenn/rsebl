"use client";

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [inputText, setInputText] = useState("");
  const [trainingSamples, setTrainingSamples] = useState([]);
  const [message, setMessage] = useState("");

  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessages([...newMessages, { role: "assistant", content: data.reply }]);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const addSample = () => {
    if (inputText.trim()) {
      setTrainingSamples([...trainingSamples, { prompt: inputText, completion: "" }]);
      setInputText("");
    }
  };

  const submitTrainingData = async () => {
    if (trainingSamples.length === 0) {
      setMessage("No training data to submit.");
      return;
    }

    try {
      const res = await fetch("/api/train", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainingSamples }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Training data submitted successfully!");
        setTrainingSamples([]);
      } else {
        setMessage(data.error || "Error submitting training data.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to submit training data.");
    }
  };
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
       <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-center mb-4">Train GPT-4 Model</h2>

        <div className="mb-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter training text..."
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
          <button
            onClick={addSample}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-full"
          >
            Add Training Sample
          </button>
        </div>

        <div className="max-h-40 overflow-y-auto border p-3 rounded-md">
          {trainingSamples.map((sample, index) => (
            <div key={index} className="bg-gray-100 p-2 rounded-md mb-2">
              {sample.prompt}
            </div>
          ))}
        </div>

        <button
          onClick={submitTrainingData}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 w-full"
        >
          Submit Training Data
        </button>

        {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
      </div>
    </div>
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
        <div className="bg-blue-500 text-white text-center p-4 font-semibold text-lg">Chatbot with GPT-4.0</div>
        <div
          ref={chatContainerRef}
          className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 max-w-xs rounded-lg text-white text-sm shadow-md ${
                  msg.role === "user" ? "bg-blue-600" : "bg-custom-1"
                }`}
              >
                <strong>{msg.role === "user" ? "You" : "Bot"}:</strong> {msg.content}
              </div>
            </div>
          ))}
        </div>
        <div className="flex border-t p-3 bg-gray-100">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
