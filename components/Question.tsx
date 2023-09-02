"use client";

import { askQuestion } from "@/utils/api";
import { useState } from "react";
import { set } from "zod";

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
      <form onSubmit={submitHandler}>
        <input
          type='text'
          disabled={loading}
          placeholder='Ask a question'
          onChange={changeHandler}
          className='border border-black/20 px-4 py-2 text-lg rounded-lg'
        />
        <button
          type='submit'
          disabled={loading}
          className='bg-blue-400 px-4 py-2 rounded-lg text-lg'
        >
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {response && <div>{response}</div>}
    </>
  );
}
