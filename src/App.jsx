// import { useState } from 'react'
import { useState } from "react";
import "./App.css";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_MY_API_KEY,
  dangerouslyAllowBrowser: true,
});

function App() {
  const [image, setImage] = useState(
    "https://oaidalleapiprodscus.blob.core.windows.net/private/org-iilhHtHcpywI7GgQKwuavDyB/user-FzkJZtRLQXOrBtxm0Sb83wgF/img-0pSYP31TTAMyw57VPwSKR9xa.png?st=2023-09-26T13%3A55%3A20Z&se=2023-09-26T15%3A55%3A20Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-25T23%3A52%3A02Z&ske=2023-09-26T23%3A52%3A02Z&sks=b&skv=2021-08-06&sig=hxJErff02GxrJMM1TjqAjYcdDOu6HE%2BZm6etjZ1BMUI%3D"
  );

  const [isLoading, setIsLoading] = useState(false);
  const [promt, setPrompt] = useState("");
  async function generateImg() {
    try {
      setIsLoading(true)
      const response = await openai.images.generate({
        prompt: promt,
        n: 1,
        size: "256x256",
      });
      setImage(response["data"][0]["url"]);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false)
      console.log(e);
    }
  }

  return (
    <>
      <h1>IMAGE GENERATOR</h1>
      <div>
        <input type="text" placeholder="Enter your Prompt" onChange={(e)=>{setPrompt(e.target.value)}}/>
        <button onClick={generateImg}>Generate</button>
      </div>
      <div style={{width:256,height:256}}>
        {
          isLoading ? (<>Loading...</>):(<img src={image} alt="" />)
        }

      </div>
    </>
  );
}

export default App;
