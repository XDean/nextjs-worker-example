'use client';

import {useEffect, useRef, useState} from 'react';

export default function Home() {
  const workerRef = useRef<Worker>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url));
    worker.onmessage = (event: MessageEvent<number>) => {
      setValue(event.data);
    };
    workerRef.current = worker;
    return () => {
      workerRef.current = undefined;
      worker.terminate();
    };
  }, []);

  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-2">
      <button
        className={'border cursor-pointer rounded p-2'}
        onClick={() => {
          workerRef.current?.postMessage(100000);
        }}
      >
        Calculate PI in Worker
      </button>
      <div>
        {value}
      </div>
    </main>
  );
}
