"use client";
import { Dispatch, SetStateAction, useState } from "react";
import { Chat } from "./chat";
import { SongQue } from "./songQue";
import { AskAI } from "./askAi";
import { Button } from "../ui/button";
import {
  BotMessageSquare,
  ListMusic,
  MessageCircle,
  PanelLeftClose,
  PanelRightClose,
} from "lucide-react";

type IChat = "Chat" | "Queue" | "AI";

const btn: IChat[] = ["Chat", "Queue", "AI"];

export function RoomChat() {
  const [chatType, setChatType] = useState<IChat>("Chat");

  return (
    <>
      <div className={` bg-card-foreground text-white flex flex-col h-full  `}>
        <div className="flex py-2 justify-evenly border-b-[1px] border-border ">
          {btn.map((x, i) => (
            <Button
              key={i}
              btnType="Secondary"
              name={x}
              className="text-sm "
              onClick={() => setChatType(x)}
            />
          ))}
        </div>
        <div className="flex-1  ">
          {chatType === "Chat" && <Chat />}
          {chatType === "Queue" && <SongQue />}
          {chatType === "AI" && <AskAI />}
        </div>
      </div>
    </>
  );
}
