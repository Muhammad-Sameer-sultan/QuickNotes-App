import { useState } from "react";
import NoteContext from "./noteContext";



const NotesState = (props) => {
  const [notes, setnotes] = useState([]);
  const host = "http://localhost:5000";

// fetchAll notes
  const fetchAllNote=async()=> {
    // api
       const response = await fetch(
         `${host}/api/notes/fetchallnotes`,
         {
           method: "GET",
           headers: {
             "Content-Type" :"application/json",
             "auth-token": localStorage.getItem('token')
   
           },
         }
         );
         const data =await response.json()
        //  console.log("mydara",data)
     
         setnotes(data)

       // console.log(notes)
     }

// add New notes
  const addNewNote=async(title,description,tag)=> {
 // api
    const response = await fetch(
      `${host}/api/notes/addnote`,
      {
        method: "POST",
        headers: {
          "Content-Type" :"application/json",
          "auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
      }
      );
      let newNote= await response.json()
      // console.log(newNote)
    setnotes(notes.concat(newNote));
    
  }

  const deleteNote = async(id) => {
    // delte using api
    const response = await fetch(
      `${host}/api/notes/deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type" :"application/json",
          "auth-token": localStorage.getItem('token')

        }

      }
      );
      const json = await response.json();
      console.log('delete the note with id ', id )  
      console.log(json)
      
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNote);
  };

  const updateNote = async (updatedData) => {
    // api
    const response = await fetch(
      `${host}/api/notes/updatenote/${updatedData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type" :"application/json",
          "auth-token": localStorage.getItem('token')

        },
        body: JSON.stringify({
          title: updatedData.title,
  description: updatedData.description,
  tag: updatedData.tag,
        })
      }
      );
      const json=await  response.json();
      console.log(",uid",json)
    const newNode = notes.map((node) => {
      return node._id === updatedData._id ? { ...node, ...updatedData } : node;
    });
    console.log('update success')
    setnotes(newNode)
  };

  return (
    <NoteContext.Provider
      value={{ notes, setnotes, addNewNote, deleteNote, updateNote,fetchAllNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NotesState;
