import React, { useContext } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import noteContext from "./noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote} = context;
  const { showAlert, notes, editNote } = props;

  //  console.log('cjeck',notes)

  return (
    <>
      <div className="col-6 col-sm-3 my-3">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title">{notes.title}</h5>
              <div>
                <i>
                  <BiSolidEdit
                    className="fs-4 text-success"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => {
                      editNote(notes._id);
                    }}
                  />
                </i>
                <i>
                  <MdDeleteForever
                    className="fs-4 text-danger"
                    onClick={() => {
                      deleteNote(notes._id);
                      showAlert("success","Delete Sucess  ","Note has been Successfully Deleted")
                    }}
                  />
                </i>
              </div>
            </div>
            <p className="card-text">{notes.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
