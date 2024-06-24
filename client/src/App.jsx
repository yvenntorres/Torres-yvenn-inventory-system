import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if(username == '' || password == ''){
      setErrorMessage("Username and Password is required!")
      setShowMessage(true);
    }

    else {
      const response = await login(username, password);

      if(response) {
        navigate("/inventory");
      }
      else {
        setErrorMessage('Invalid username or password!')
      }

      setShowMessage(true);
    }

  }

  return (
    <>
    <div className="w-screen h-screen bg-rose-300 p-52 flex justify-center items-center">
      <div className="border-2 p-5 border-black rounded-lg bg-rose-100 w-[400px] h-[400px]">
        <div className="text-5xl font-sans p-5 m-10 text-black text-center font-bold">LOGIN</div>
        
        {
          showMessage &&
          (
            <div className="m-2 text-center rounded text-red-700">
              { errorMessage }
            </div>
          )
        }

        <div className="flex gap-5 m-5 px-6"> 
          <div className="text-lg text-md font-mono text-black font-semibold">Username:</div>
          <input value={username} onChange={(e) => setUsername(e.target.value)} className="rounded border font-semibold border-pink-300" type="text" />
        </div>

        <div className="flex gap-5 m-5 px-5"> 
          <div className="text-lg text-md px-1 font-mono text-black font-semibold">Password:</div>
          <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded border border-pink-300 w-[195px]" type="password" />
        </div>

        <div className="flex justify-center">
          <button onClick={handleLogin} className="rounded-lg shadow-2xl shadow-pink-500 bg-white text-pink-800 p-2 m-2 w-[100px] hover:bg-black hover:text-white hover:shadow-white hover:cursor-pointer">LOGIN</button>
        </div>
      </div>
    </div>
    
    </>
  )
}

export default App
