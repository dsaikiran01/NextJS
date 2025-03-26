"use client"

import { useState } from "react"

export default function HomePage() {
  const [result, setResult] = useState('0');
  const [expression, setExpression] = useState('');

  const handleButtonClick = (value: String) => {
    if (value === '=') {
      try {
        // evaluate the entries
        let revalRes = eval(expression).toString();
        setResult(revalRes);
        setExpression(revalRes);
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      // clear the input and output
      setResult('0');
      setExpression('');
    } else {
      setExpression(prevExpression => prevExpression + value);
    }
  }

  const buttons: String[] = [
    '/', '*', '-', '+',
    '7', '8', '9', 'C',
    '4', '5', '6', '=',
    '1', '2', '3', '.',
    '0'
  ];


  return (
    <main className="flex flex-col min-h-screen items-center p-24">
      <h1 className="text-4xl font-bold mb-10">Calculator</h1>

      <div className="bg-white p-6 rounded-1g">
        <input
          type="text"
          className="w-full mb-2 text-3xl border-b-2 border-gay-400 focus:outline-none"
          value={expression}
          readOnly
        />

        <input
          type="text"
          className="w-full mb-2 text-4xl font-bold mb-4 focus-outline"
          value={result}
          readOnly
        />

        <div className="grid grid-cols-4 gap-2">
          {buttons.map((btn) => {
            return (<button
              key={btn}
              className="text-4xl bg-gray-300 p-2 rounded-lg"
              onClick={() => handleButtonClick(btn)}
            >{btn}</button>)
          })}
        </div>
      </div>
    </main>
  )
}