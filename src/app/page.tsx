"use client"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faCheck, faRotateRight } from '@fortawesome/free-solid-svg-icons';

const smallLetters = 'abcdefghijklmnopqrstuvwxyz';
const capitalLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const digits = '0123456789';
const specialChars = '@#$%^&*()_-+=/~';

export default function Home() {
  const [pswd, setPswd] = useState<string>('');
  const [isCapitalLetter, setIsCapitalLetter] = useState<boolean>(true);
  const [isDigit, setIsDigit] = useState<boolean>(false);
  const [isSpecialChar, setIsSpecialChar] = useState<boolean>(false);

  const [pswdLen, setPswdLen] = useState<number>(16);

  const [copyIcon, setCopyIcon] = useState(faCopy);

  const generatePswd = () => {
    let dict = smallLetters;
    if (isCapitalLetter) dict += capitalLetters;
    if (isDigit) dict += digits;
    if (isSpecialChar) dict += specialChars;

    let pswdStr = '';
    const dictLen = dict.length;
    for (let i = 0; i < pswdLen; i++) {
      let pos = Math.floor(Math.random() * dictLen);
      pswdStr += dict[pos];
    }

    setPswd(pswdStr);
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pswd)
    setCopyIcon(faCheck);
    setTimeout(() => {
      setCopyIcon(faCopy);
    }, 2000);
  }

  useEffect(() => {
    generatePswd();
    console.log(pswdLen);
  }, [pswdLen, isCapitalLetter, isDigit, isSpecialChar]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10 px-4">

      {/* Navigation Section */}
      <nav className="w-full text-center mb-6">
        <h1 className="text-4xl font-semibold text-gray-800">Random Password Generator</h1>
      </nav>

      {/* Password Display Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <input
          className="text-center w-full sm:w-2/3 p-3 border-2 border-gray-300 rounded-md bg-gray-50 text-gray-600 font-medium"
          value={pswd}
          id="password"
          disabled
        />
        <div className="flex space-x-4 mt-4 sm:mt-0">
          <button
            className="relative inline-flex items-center justify-center px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={copyToClipboard}
          >
            <span
              id="buttonText"
              className="absolute transition-all duration-300 text-xl"
            >
              {/* <i className="copy-icon fas fa-copy"></i> */}
              <FontAwesomeIcon icon={copyIcon} className="text-xl" />
            </span>
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition duration-300"
            onClick={generatePswd}
          >
            <FontAwesomeIcon icon={faRotateRight} className="text-xl" />
          </button>
        </div>
      </div>

      {/* Range and Length Section */}
      <div className="flex flex-col items-center mt-6 space-y-4 w-full max-w-md">
        <div className="flex justify-between w-full px-6">
          <span className="text-lg font-semibold text-gray-700">12</span>
          <input className="text-lg font-bold text-gray-700 text-center w-12 border-2 border-gray-300" value={pswdLen} readOnly />
          <span className="text-lg font-semibold text-gray-700">72</span>
        </div>
        <input
          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer focus:outline-none"
          type="range"
          id="characterCount"
          value={pswdLen}
          min={12}
          max={72}
          step={1}
          onChange={(e) => setPswdLen(Number(e.target.value))}
        />
      </div>

      <div className="mt-6 w-full max-w-lg">
        <ul className="flex flex-col items-center sm:flex-row justify-center w-full space-y-4 sm:space-y-0 sm:space-x-12">
          <li className="flex items-center space-x-4">
            <input
              className="h-5 w-5 text-blue-500"
              type="checkbox"
              checked
              name="small-letters"
            />
            <label className="text-gray-700" htmlFor="small-letters">abc</label>
          </li>
          <li className="flex items-center space-x-4">
            <input
              className="h-5 w-5 text-blue-500"
              type="checkbox"
              defaultChecked={isCapitalLetter}
              name="capital-letters"
              onClick={() => setIsCapitalLetter(prev => !prev)}
            />
            <label className="text-gray-700" htmlFor="capital-letters">ABC</label>
          </li>
          <li className="flex items-center space-x-4">
            <input
              className="h-5 w-5 text-blue-500"
              type="checkbox"
              name="digits"
              onClick={() => setIsDigit(prev => !prev)}
            />
            <label className="text-gray-700" htmlFor="digits">012</label>
          </li>
          <li className="flex items-center space-x-4">
            <input
              className="h-5 w-5 text-blue-500"
              type="checkbox"
              name="special-characters"
              onClick={() => setIsSpecialChar(prev => !prev)}
            />
            <label className="text-gray-700" htmlFor="special-characters">$@&</label>
          </li>
        </ul>

      </div>
    </div>
  );
}
