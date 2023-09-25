import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  const { userId } = auth();
  let href = userId ? "/journal" : "/sign-in";
  return (
    <div className='h-screen w-screen flex items-center flex-col bg-black'>
      <header className='h-auto w-full container px-4 md:px-6 pt-52'>
        <div className='grid gap-6 items-center'>
          <div className='flex flex-col justify-center space-y-8 text-center'>
            <div className='space-y-2'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-600'>
                Welcome to Diary Insights
              </h1>
              <p className='max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto'>
                Your Personal Diary, Enhanced by AI.
              </p>
            </div>
          </div>
        </div>
      </header>
      <section className='w-full container px-4 md:px-6 pt-32'>
        <div className='flex flex-row gap-8'>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <div className='p-2 rounded-md  '>
              <svg
                className=' text-white h-6 w-6 opacity-75'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
              </svg>
            </div>
            <h2 className='text-xl font-bold text-white'>
              Intelligent Insights
            </h2>
            <p className='text-zinc-200 dark:text-zinc-100'>
              Diary Insights analyzes your thoughts and provides valuable
              insights, helping you understand your emotions and thoughts
              better.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <div className='p-2 rounded-md'>
              <svg
                className=' text-white h-6 w-6 opacity-75'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10' />
                <path d='m9 12 2 2 4-4' />
              </svg>
            </div>
            <h2 className='text-xl font-bold text-white'>Secure and Private</h2>
            <p className='text-zinc-200 dark:text-zinc-100'>
              Your thoughts are precious, and so is your privacy. Diary Insights
              uses cutting-edge encryption to keep your diary safe from prying
              eyes.
            </p>
          </div>
          <div className='flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg'>
            <div className='p-2 rounded-md'>
              <svg
                className=' text-white h-6 w-6 opacity-75'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <circle cx='12' cy='12' r='10' />
                <path d='M8 14s1.5 2 4 2 4-2 4-2' />
                <line x1='9' x2='9.01' y1='9' y2='9' />
                <line x1='15' x2='15.01' y1='9' y2='9' />
              </svg>
            </div>
            <h2 className='text-xl font-bold text-white'>Mood Tracking</h2>
            <p className='text-zinc-200 dark:text-zinc-100'>
              Easily keep track of your daily moods, helping you identify
              patterns and trends in your emotional well-being.
            </p>
          </div>
        </div>
      </section>
      <section className='pt-20'>
        <Link
          href={href}
          className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Get started
        </Link>
      </section>
    </div>
  );
}
