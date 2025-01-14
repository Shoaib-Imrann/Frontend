import { useState, useCallback, useEffect, useRef } from "react";
import { Copy, RotateCcw, Check, Plus, Minus } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+~`|}";

    for (let i = 1; i <= length; i++) {
      const char =
        window.crypto.getRandomValues(new Uint32Array(1))[0] % str.length;
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    toast.success("Copied");
    // passwordRef.current?.select();
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // const incrementLength = () => setLength((prev) => Math.min(prev + 1, 30));
  // const decrementLength = () => setLength((prev) => Math.max(prev - 1, 8));

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            backgroundColor: "#333",
            color: "#fff",
          },
        }}
      />
      {/* <div className="shadow-sm py-3  fixed top-0 left-0 w-full bg-white z-10">
        <h1 className="tracking-wide text-2xl font-semibold text-center uppercase text-zinc-950">
          Password Gen
        </h1>
      </div> */}
      <div className="h-screen flex flex-col items-center justify-center bg-[#fafafa]">
        <h1 className="hidden md:block absolute top-5 tracking-wide right-0 left-0 text-4xl font-semibold font-sans text-center text-gray-400">
          PASSWORD GEN
        </h1>
        <div className="w-full max-w-sm md:max-w-[26rem] mx-auto px-6 pb-6 pt-6 md:pt-8 bg-white rounded-2xl shadow-lg space-y-9 ">
          <h1 className="md:hidden tracking-wide text-2xl font-semibold text-center uppercase text-[#212121]">
            Password Gen
          </h1>
          <div className="space-y-8">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={password}
                className="flex-grow pl-4 pr-1 py-[11px] bg-white border rounded-lg font-mono text-base focus:outline-none"
                placeholder="Generated Password"
                readOnly
                ref={passwordRef}
              />
              <button
                onClick={copyPasswordToClipboard}
                className="py-4 px-3.5 bg-[#212121] text-white rounded-lg hover:bg-zinc-950 transition-colors"
              >
                {isCopied ? <Check size={17} /> : <Copy size={17} />}
              </button>
            </div>

            <div className="space-y-5 ">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Length: {length}</span>
              </div>
              <div className="flex items-center space-x-4 mb-8">
                {/* <button
                onClick={decrementLength}
                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <Minus size={16} />
              </button> */}
                <input
                  type="range"
                  min={8}
                  max={30}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-[6px] bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #000 0%, #000 ${
                      ((length - 7) * 100) / 24
                    }%, #e5e7eb ${((length - 7) * 100) / 24}%, #e5e7eb 100%)`,
                  }}
                />
                {/* <button
                onClick={incrementLength}
                className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
              >
                <Plus size={16} />
              </button> */}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Include Numbers</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={numberAllowed}
                    onChange={() => setNumberAllowed((prev) => !prev)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#212121] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Include Symbols</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={charAllowed}
                    onChange={() => setCharAllowed((prev) => !prev)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#212121] after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={generatePassword}
            className="w-full flex justify-center items-center px-3 h-[45px] bg-[#212121] text-white rounded-xl text-sm font-medium hover:bg-zinc-950 transition-colors"
          >
            <RotateCcw size={16} className="mr-2 " />
            Regenerate
          </button>
        </div>
      </div>
    </>
  );
}
