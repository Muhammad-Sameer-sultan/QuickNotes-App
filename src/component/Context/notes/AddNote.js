import React, { useContext, useState } from 'react'
import noteContext from "./noteContext";
// import NotesState from './NotesState'


const AddNote = (prop) => {
    const {showAlert}=prop
    const [newNote, setnewNote] = useState({title:"", description: "",tag:""})
    const context = useContext(noteContext);
    const { addNewNote } = context;
    // const {addNewNote}=notes;
    // console.log(showAlert)

    const [isValid, setisValid] = useState({title:false,description:false})

    const addNoteHandler = (e) => {
      e.preventDefault();

      const { title, description, tag } = newNote;
    
      if (title.length < 3 || description.length < 5) {
        showAlert("danger","Failed to Add Note", "Invalid Data ")
        const updatedIsValid = { ...isValid };
    
        if (title.length < 5) {
          updatedIsValid.title = true;
        }
    
        if (description.length < 5) {
          updatedIsValid.description = true;
        }
    
        setisValid(updatedIsValid);
      } else {
        
        addNewNote(title, description, tag);
        setnewNote({title:"", description: "",tag:""})
        setisValid({title:false,description:false})
        showAlert("success","success", "Note has been added Successfully")
        // prop.showAlert("sucess","sucess", "Note has been added Successfully")


      }
    };
    

    const onChangeHandler=(e)=>{
      const { title, description} = newNote;

      if (title.length >= 3 || description.length >= 5) {
        const updatedIsValid = { ...isValid };
    
        if (title.length >= 3) {
          updatedIsValid.title = false;
        }
    
        if (description.length >= 5) {
          updatedIsValid.description = false;
        }
    
        setisValid(updatedIsValid);
      } 
        setnewNote({...newNote,[e.target.name]:e.target.value})
    }

  return (
    <div className="container my-3">
      <h2>Add Your Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" name="title" className="form-label">
            Add Title
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            onChange={onChangeHandler}
            value={newNote.title}
            required
            minLength="5"
          />
           {isValid.title && (
    <span className="text-danger">Title must be at least 3 characters long</span>
  )}
          
        </div>
        <div className="mb-3">
          <label htmlFor="description" name="description" className="form-label">
           Add Description
          </label>
          <input
            type="text"
            name='description'
            className="form-control"
            id="description"
            onChange={onChangeHandler}
            value={newNote.description}
            required
            minLength="5"
          />
        {isValid.description && (
    <span className="text-danger">Description must be at least 5 characters long</span>
  )}
        </div>
        <div className="mb-3">
          <label htmlFor="tag" name="tag" className="form-label">
           Add Tag
          </label>
          <input
            type="text"
            name='tag'
            className="form-control"
            id="tag"
            onChange={onChangeHandler}
            value={newNote.tag}
          />
        </div>
        
        <button type="submit" className="btn btn-primary" onClick={addNoteHandler}>
          Add Note
        </button>
      </form>
      
    </div>
  )
}

export default AddNote