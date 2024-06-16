import { useCallback, useState, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const [copied, setCopied] = useState(false);
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@~#$%^&*()_+{}[];:><?/";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
      setpassword(pass);
    }
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="relative w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-gray-800 bg-gray-800">
          <h1 className="text-white text-center"> Password-Generator</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4 text-center my-3">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
              onClick={copyPasswordToClipboard}
            >
              copy
            </button>
            {copied && (
              <div className="absolute bg-gray-700 text-white text-sm px-2 py-1 rounded mt-7 right-0">
                Copied!
              </div>
            )}
            <input
              ref={passwordRef}
              type="text"
              value={password}
              readOnly
              className="hidden" // Hide the input element
            />
          </div>
          <div className="flex text-sm gap-x-2 flex-col text-white">
            <div className="flex items-center gap-x-1 mt-2">
              <input
                type="range"
                min={4}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length : {length}</label>
            </div>
            <div className="flex items-center gap-x-1 mt-2">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1 mt-2">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="characterInput"
                onChange={() => {
                  setCharAllowed((prev) => !prev);
                }}
              />
              <label>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
