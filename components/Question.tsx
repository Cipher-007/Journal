"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SendHorizontal } from "lucide-react";

export default function Question() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  function changeHandler(e: React.SyntheticEvent<HTMLInputElement>) {
    setValue(e.currentTarget.value);
  }

  async function submitHandler(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue("");
    setLoading(false);
  }

  return (
    <>
      <form onSubmit={submitHandler} className='gap-5 flex'>
        <Input
          type='text'
          disabled={loading}
          placeholder='Ask a question'
          onChange={changeHandler}
          className='rounded-3xl border-2 w-full'
        />
        <Button type='submit' disabled={loading} className=''>
          <SendHorizontal className='w-5 h-5' />
        </Button>
      </form>
      {loading ? <div>Loading...</div> : null}
      {response && <div>{response}</div>}
    </>
  );
}
