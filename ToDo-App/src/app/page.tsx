'use client'

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [toDoList, setToDoList] = useState<{ [key: string]: string }>({});
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [index, setIndex] = useState<number>(0);
  const [editingIndex, setEditingIndex] = useState<string | null>(null);

  const handleDone = (id: string) => {
    console.log(id);

    const updateList = Object.fromEntries(Object.entries(toDoList).filter(([key]) => key !== id));

    setToDoList(updateList);
  }

  const handleAdd = () => {
    if (editingIndex === null) {
      setToDoList(prev => ({ ...prev, [index]: inputValue }));
      setIndex(prevIndex => prevIndex + 1);
      setInputValue('');
    } else {
      setToDoList(prev => ({ ...prev, [editingIndex]: editValue }));
      setEditingIndex(null);
    }
  }

  const editEvent = (index: string) => {
    setEditingIndex(index);
    setEditValue(toDoList[index]);
  }

  const listall = () => {
    // console.log(toDoList);
    const ele = [];
    for (const index in toDoList) {
      ele.push(
        <div
          key={index}
          className="flex items-center justify-between max-w-3xl bg-white p-4 rounded-lg shadow-md mb-3 hover:bg-gray-50 transition duration-200"
        >
          <input
            className="text-lg"
            value={editingIndex === index ? editValue : toDoList[index]}
            onChange={e => setEditValue(e.target.value)}
            disabled={editingIndex !== index}

          />
          <div
            className="flex flex-col gap-1"
          >
            {editingIndex === index ? (
              <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200"
              >
                Save
              </button>
            ) :
              (
                <button
                  onClick={() => editEvent(index)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                  Edit
                </button>
              )}
            <button
              onClick={() => handleDone(index)}
              className={
                editingIndex !== index ?
                  "bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200" :
                  "bg-gray-500 text-gray-400 px-4 py-2 rounded-md"}
              disabled={editingIndex === index}
            >
              Done
            </button>
          </div>
        </div>
      )
    }
    return ele;
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleAdd()
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
            onClick={() => handleAdd()}
          >
            Add
          </button>
        </div>
      </div>
    </main>
  );
}
