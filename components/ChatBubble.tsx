"use client";

import { askQuestion } from "@/utils/api";
import clsx from "clsx";
import { SendHorizontal } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

type ChatProps = {
  id: string;
  user: string;
  ai: string;
}[];

function Chat({ chat }: { chat: ChatProps }) {
  return (
    <div className='max-h-[35rem] overflow-y-auto'>
      {chat.map((item) => (
        <div key={item.id} className='grid'>
          <div className='max-w-xs my-2 p-3 rounded-lg shadow-md bg-blue-500 text-white text-sm w-fit justify-self-end'>
            {item.user}
          </div>
          {item.ai === "" ? (
            <div className='flex gap-2 p-3'>
              <div className='w-3 h-3 rounded-full animate-pulse bg-blue-600'></div>
              <div className='w-3 h-3 rounded-full animate-pulse bg-blue-600'></div>
              <div className='w-3 h-3 rounded-full animate-pulse bg-blue-600'></div>
            </div>
          ) : (
            <div className='max-w-xs mb-2 p-3 rounded-lg shadow-md bg-blue-500 text-white text-sm w-fit justify-self-start'>
              {item.ai}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ChatBubble() {
  const [showChat, setShowChat] = useState(false);
  const [chat, setChat] = useState<ChatProps>([]);
  const [loading, setLoading] = useState(false);

  async function submitHandler(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJSON = Object.fromEntries(formData.entries());
    const question = String(formJSON.question);
    const id = nanoid();
    setLoading(true);
    setChat((prevState) => [...prevState, { id: id, user: question, ai: "" }]);
    const answer = await askQuestion(question);
    setChat((prevState) =>
      prevState.map((item) => (item.id === id ? { ...item, ai: answer } : item))
    );
    setLoading(false);
  }
  return (
    <div className='w-[27rem]'>
      <div className='w-full'>
        <Card
          className={clsx("rounded-md shadow-xl", showChat ? "null" : "hidden")}
        >
          <CardHeader className='bg-indigo-600 rounded-md'>
            <CardTitle className='text-white'>Chat</CardTitle>
          </CardHeader>
          <CardContent className='pb-2'>
            {chat.length === 0 ? (
              <div>
                <h2 className='text-center text-lg font-semibold p-2'>
                  Welcome to Diary Insights. Chat!
                </h2>
                <p>
                  This chat is here to assist you with any questions or tasks
                  related to your entries. Feel free to ask anything, and
                  I&apos;ll do my best to help you.
                </p>
                <p className='pt-2'>
                  To get started, you can ask questions like:
                </p>
                <ul className='list-disc px-5 pt-2'>
                  <li>What did I enter on [specific date]&nbsp;?</li>
                  <li>Give me a summary of my entries this week.</li>
                  <li>Add a new entry for [specific category].</li>
                </ul>
                <p className='py-2'>
                  Don&apos;t hesitate to explore and make the most of this chat.
                  I&apos;m here to make managing your entries a breeze!
                </p>
              </div>
            ) : (
              <Chat chat={chat} />
            )}
            <CardFooter className='px-0 pb-2'>
              <form onSubmit={submitHandler} className='gap-3 flex w-full'>
                <Input
                  name='question'
                  type='text'
                  disabled={loading}
                  placeholder='Ask a question'
                  className='rounded-3xl border-2 w-full'
                />
                <Button type='submit' disabled={loading} className=''>
                  <SendHorizontal className='w-6 h-6' />
                </Button>
              </form>
            </CardFooter>
          </CardContent>
        </Card>
        <div className='mx-auto pt-2 flex max-w-[550px] items-center justify-end space-x-5'>
          <button
            className='flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#6A64F1] text-white'
            onClick={() => {
              setShowChat((prevState) => !prevState);
            }}
          >
            {showChat ? (
              <span id='cross'>
                <svg
                  width='17'
                  height='17'
                  viewBox='0 0 17 17'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0.474874 0.474874C1.10804 -0.158291 2.1346 -0.158291 2.76777 0.474874L16.5251 14.2322C17.1583 14.8654 17.1583 15.892 16.5251 16.5251C15.892 17.1583 14.8654 17.1583 14.2322 16.5251L0.474874 2.76777C-0.158291 2.1346 -0.158291 1.10804 0.474874 0.474874Z'
                    fill='white'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M0.474874 16.5251C-0.158291 15.892 -0.158291 14.8654 0.474874 14.2322L14.2322 0.474874C14.8654 -0.158292 15.892 -0.158291 16.5251 0.474874C17.1583 1.10804 17.1583 2.1346 16.5251 2.76777L2.76777 16.5251C2.1346 17.1583 1.10804 17.1583 0.474874 16.5251Z'
                    fill='white'
                  />
                </svg>
              </span>
            ) : (
              <span id='chat'>
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 28 28'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M19.8333 14.0002V3.50016C19.8333 3.19074 19.7103 2.894 19.4915 2.6752C19.2728 2.45641 18.976 2.3335 18.6666 2.3335H3.49992C3.1905 2.3335 2.89375 2.45641 2.67496 2.6752C2.45617 2.894 2.33325 3.19074 2.33325 3.50016V19.8335L6.99992 15.1668H18.6666C18.976 15.1668 19.2728 15.0439 19.4915 14.8251C19.7103 14.6063 19.8333 14.3096 19.8333 14.0002ZM24.4999 7.00016H22.1666V17.5002H6.99992V19.8335C6.99992 20.1429 7.12284 20.4397 7.34163 20.6585C7.56042 20.8772 7.85717 21.0002 8.16659 21.0002H20.9999L25.6666 25.6668V8.16683C25.6666 7.85741 25.5437 7.56066 25.3249 7.34187C25.1061 7.12308 24.8093 7.00016 24.4999 7.00016Z'
                    fill='white'
                  />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
