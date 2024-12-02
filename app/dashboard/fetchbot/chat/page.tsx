"use client";

import { useState, useRef, useEffect } from "react";
import { Message } from "@/types/message";
import { Send } from "lucide-react";
import Image from "next/image";
import { useChat } from "ai/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className="flex w-full items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Fetchbot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="flex flex-col gap-4">
              {messages.map((message, idx) => {
                const isLastMessage = idx === messages.length - 1;
                return (
                  <div
                    key={idx}
                    ref={isLastMessage ? lastMessageRef : null}
                    className={`flex ${
                      message.role === "assistant"
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <div
                      className={`flex gap-3 max-w-[80%] ${
                        message.role === "assistant"
                          ? "flex-row"
                          : "flex-row-reverse"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <Image
                          src="/logo.png"
                          className="h-8 w-8 rounded-full"
                          alt="FetchBot Assistant"
                          width={32}
                          height={32}
                        />
                      )}
                      <div
                        className={`rounded-lg p-4 ${
                          message.role === "assistant"
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <p className="text-sm font-medium mb-1">
                          {message.role === "assistant" ? "Fetch:" : "You:"}
                        </p>
                        <p>{message.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Image
                      src="/logo.png"
                      className="h-8 w-8 rounded-full"
                      alt="FetchBot Assistant"
                      width={32}
                      height={32}
                    />
                    <div className="rounded-lg p-4 bg-muted text-muted-foreground">
                      <p className="text-sm font-medium mb-1">Fetch:</p>
                      <p>Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message"
              className="flex-grow"
            />
            <Button type="submit" size="icon" disabled={!input || isLoading}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}
