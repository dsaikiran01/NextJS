'use client'

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import data from './questions';

export default function Home() {
  const router = useRouter();

  const [qno, setQno] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const formRef = useRef(null);

  const quesDataLen = Object.keys(data).length;

  const handleSubmit = (e) => {
    // e.preventDefault();
    console.log(e);
    const formData = new FormData(formRef.current);
    const selectedOption = formData.get("option");
    console.log(typeof selectedOption);

    if (qno !== quesDataLen - 1) {
      setQno(prev => prev + 1);
    }

    if (data[qno]['correct'] == selectedOption) {
      setScore(prev => prev + 1);
    }

    if (qno === quesDataLen - 1) {
      // final submit, evaluate
      let finalQuesScore = 0;
      if (data[qno]['correct'] == selectedOption) {
        finalQuesScore = 1;
      }
      router.push(`/finalScore?score=${score + finalQuesScore}`);
    }
  }

  return (
    <div>
      <main className="p-6 max-w-3xl mx-auto">
        <p className="text-xl mb-4">Current score: <span className="font-bold">{score}</span></p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center">
            <p className="text-green-500 font-semibold">Correct: +1</p>
          </div>
          <div className="flex items-center justify-end">
            <p className="text-red-500 font-semibold">Wrong: 0</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <p className="text-xl mb-4">{data[qno].question}</p>

          <form ref={formRef} action={handleSubmit}>
            <ul className="space-y-4">
              <li className="flex items-center">
                <input
                  type="radio"
                  id="option-1"
                  name="option"
                  value={1}
                  className="h-5 w-5 mr-2"
                />
                <label htmlFor="option-1" className="text-lg text-gray-700">{data[qno]["option-1"]}</label>
              </li>

              <li className="flex items-center">
                <input
                  type="radio"
                  id="option-2"
                  name="option"
                  value={2}
                  className="h-5 w-5 mr-2"
                />
                <label htmlFor="option-2" className="text-lg text-gray-700">{data[qno]["option-2"]}</label>
              </li>

              <li className="flex items-center">
                <input
                  type="radio"
                  id="option-3"
                  name="option"
                  value={3}
                  className="h-5 w-5 mr-2"
                />
                <label htmlFor="option-3" className="text-lg text-gray-700">{data[qno]["option-3"]}</label>
              </li>

              <li className="flex items-center">
                <input
                  type="radio"
                  id="option-4"
                  name="option"
                  value={4}
                  className="h-5 w-5 mr-2"
                />
                <label htmlFor="option-4" className="text-lg text-gray-700">{data[qno]["option-4"]}</label>
              </li>
            </ul>

            <div className="mt-6 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                {qno === quesDataLen - 1 ? "Submit" : "Next"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>

  );
}
