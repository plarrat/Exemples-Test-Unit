import axios from "axios";
import { useState, useEffect } from "react";

export function sum(a,b){
  return a + b ;
}

export async function getUsers(){
  let datas = await axios.get("https://jsonplaceholder.typicode.com/users");
  return datas.data;
}

function App() {
  const[users, setUsers] = useState([]);
  
  useEffect(()=>{
    
  }, [])

  async function getUsers2(){
    let datas = await axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(datas.data);
}

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mon application de test</h1>
        <hr />

        <button onClick={getUsers2}>Cliquez moi</button>
      </header>
      <main>
        <table>
          <tbody>
          {
            users.map(user=>{
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
