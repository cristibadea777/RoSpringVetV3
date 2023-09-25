import { useState } from "react";
import "./App.css";
import LoginRegister from "./components/LoginRegister/LoginRegister";
import Titlu from "./components/Titlu/Titlu";

function App() {
  
  //#232B2B #1e1e1e #11574a

  const [viewLoginRegister, setViewLoginRegister] = useState(true)

  return (
    <div className="container-principal">
      <Titlu 
        viewLoginRegister
      />
      {viewLoginRegister && (
        <LoginRegister/>
      )}
    </div>
  )
}
export default App;
