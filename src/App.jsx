/* eslint-disable no-unused-vars */
import "./App.css";
import data from "./contacts.json";
import React,{ useState } from "react";

function App() {
  const [contacts, setContacts] = useState(data.slice(0,5));

  const addRandomContact = () => {
    const newContacts = [...contacts];
    const remainingContacts = data.filter((contact)=>{
      for (let i=0; i<newContacts.length; i++){
        if(newContacts[i].id === contact.id){
          return false;
        }
      }
      return true
    })
    const randomContact = remainingContacts[Math.floor(Math.random()*remainingContacts.length)];
    newContacts.push(randomContact);
    setContacts(newContacts);
  }

  const sortByName = () => {
    const sortedByName = [...contacts].sort((a,b) => a.name.localeCompare(b.name));
    setContacts(sortedByName);
  }

  const sortByPopularity = () =>{
    const sortedByPopularity = [...contacts].sort((a,b)=>b.popularity - a.popularity);
    setContacts(sortedByPopularity)
  }

  const deleteContact = (id) => {
    const newContacts = contacts.filter(contact=> contact.id !== id);
    setContacts(newContacts)
  }

  return (
    <div className="App">
      <h1>LAB | React IronContacts</h1>

      <button onClick={addRandomContact}>Add random contact</button><br/><br/>
      <button onClick={sortByName}>Sort by name</button> &nbsp; &nbsp; 
      {/* &nbsp; for adding a little of space between buttons */}
      <button onClick={sortByPopularity}>Sort by popularity</button>

      <table>
        <thead>
          <tr>
            <th>Picture</th>
            <th>Name</th>
            <th>Popularity</th>
            <th>Won an Oscar</th>
            <th>Won an Emmy</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contactInfo) =>{
            return(
              <tr key={contactInfo.id}>
                <td><img src={contactInfo.pictureUrl}/></td>
                <td>{contactInfo.name}</td>
                <td>{contactInfo.popularity}</td>
                <td>{contactInfo.wonOscar && <p>🏆</p>}</td>
                <td>{contactInfo.wonEmmy && <p>🌟</p>}</td>
                <td><button onClick={()=>deleteContact(contactInfo.id)}>Delete</button></td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
