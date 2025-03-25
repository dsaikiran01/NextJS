'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [toDoList, setToDoList] = useState<{[key: string] : string}>({});
  const [inputValue, setInputValue] = useState('');
  const [index, setIndex] = useState<number>(0);

  const handleDone = (id: string) => {
    console.log(id);

    const updateList = Object.fromEntries(Object.entries(toDoList).filter(([key]) => key !== id));

    setToDoList(updateList);
  }

  const handleAdd = (listEle: string) => {
    setToDoList(prev => ({...prev, [index]: listEle}));
    setIndex(prevIndex => prevIndex+1);
    setInputValue('');
  }

  const listall = () => {
    // console.log(toDoList);
    const ele = [];
    for(const index in toDoList) {
      ele.push(
      <div
      key={index}
        className="flex items-center justify-between max-w-3xl bg-white p-4 rounded-lg shadow-md mb-3 hover:bg-gray-50 transition duration-200"
      >
        <span className="text-lg">{toDoList[index]}</span>
        <button
          onClick={() => handleDone(index)}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
        >
          Done
        </button>
      </div>
      )
    }
    return ele;
  };

  const handleKeyDown = (e: any) => {
    if(e.key === 'Enter') {
      handleAdd(inputValue)
    }
  }

  useEffect(() => {
    console.log('re-render');
    listall()
  }, [toDoList])


  return (
    <main className="flex flex-col min-h-screen items-center justify-between bg-gray-200 p-6">
      <h1 className="text-center mb-6 text-4xl font-bold text-blue-600">To-Do</h1>

      <div className="space-y-4">
        {listall()}

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-6 max-w-xl">
          <input
            className="w-full md:w-2/3 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task..."
          />
          <button
            className="w-full md:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            onClick={() => handleAdd(inputValue)}
          >
            Add
          </button>
        </div>
      </div>
    </main>
  );
}
