import React, { useRef } from "react";
import { useContext, useEffect ,useState} from "react";
import noteContext from "./noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

const Note = ({showAlert}) => {
  const notelist = useContext(noteContext);
  const myref=useRef(null);
const navigate = useNavigate();

  // console.log(notelist)
  const [newNote, setnewNote] = useState({title: "",
  description: "",
  tag: ""})

  const [isValid, setisValid] = useState({title:false,description:false})

  const { notes, fetchAllNote ,updateNote} = notelist;

  useEffect(() => {
    
    if(localStorage.getItem('token')){

      fetchAllNote();
    }
    else{
      navigate('/signin')

    }
// eslint-disable-next-line     
  }, []);
  

  const editNote=(id)=>{
    const edit = notes.find((note) => note._id === id);
    return setnewNote(edit);
//     const edit = notes.filter((note)=>{
//       if(note._id===id){
// return note;
//       }
//     })
 
//     // console.log(edit.user)
//    return setnewNote(edit[0])
   
}

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
const checkValidation=()=>{
  const {title,description}=newNote
  if (title.length < 3 || description.length < 5) {
    const updatedIsValid = { ...isValid };

    if (title.length < 5) {
      updatedIsValid.title = true;
    }

    if (description.length < 5) {
      updatedIsValid.description = true;
    }

    setisValid(updatedIsValid);
  } else {
    updateNote(newNote);
    setnewNote({title:"", description: "",tag:""})
    setisValid({title:false,description:false})
    myref.current.click();
    showAlert("primary","Sucess","Note has been updated Successfully")



  }
}


  return (
    <>
      <AddNote showAlert={showAlert}/>
      {/* modal start */}
      {/* Button trigger modal */}


{/* Modal */}
<div className="modal fade " id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Update the note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
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
        
        
      </form>
      </div>
      <div className="modal-footer">
        <button type="button"  ref={myref} className="btn btn-secondary bg-color" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary bg-color"  onClick={()=>{checkValidation()}}>Update</button>
        
      </div>
    </div>
  </div>
</div>

{/* Note item render */}
      <div className="row my-4">
        <h2>Your Notes</h2>
        {notes.length===0 && <span>No Noted Avaiable to show</span>}
        {notes.map((note, index) => note && <NoteItem showAlert={showAlert} notes={note} editNote={editNote} key={index} />)}

     
        {/* {console.log("item",notes)} */}
       
        {/* {notes.map((note, index) => {
          if (note) {
            return <NoteItem notes={note} editNote={editNote} key={index} />;
          }
        })} */}
      </div>
    </>
  );
};

export default Note;
