import { useState } from "react";
import "./App.css";
import { request } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { RingSpinner } from "react-spinners-kit"; // Import RingSpinner dari library yang sesuai

function App() {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      const content = document.getElementById("content").value;
      const ai = await request(content);
      setData(ai);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto ">
      <h1 className="text-4xl text-blue-300">
        GenerateAI{" "}
        <span className="text-white text-sm font-bold">re</span>
      </h1>
      <form className="flex flex-col gap-4 py-4 w-full">
        <input
          placeholder="Ask me anything..."
          className="py-2 px-4 text-md rounded-md"
          id="content"
          type="text"
          font-poppins
        />
        <button
          onClick={handleSubmit}
          type="button"
          className="bg-teal-400 py-2 px-4 font-bold text-black rounded-md font-poppins"
          disabled={isLoading}
        >
          {isLoading ? "Load..." : "GET CODE"}
        </button>
      </form>
      <div className="max-w-xl w-full mx-auto">
        {data ? (
          <SyntaxHighlight
            language="swift"
            style={darcula}
            wrapLongLines={true}
          >
            {data}
          </SyntaxHighlight>
        ) : null}
      </div>
    </main>
  );
}

export default App;
