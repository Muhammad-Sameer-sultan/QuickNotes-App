import React from "react";
import Note from "./Context/notes/Note";



const Home = ({showAlert}) => {
 
  return (
    <>
    {/* <AddNote/> */}
    
    <Note showAlert={showAlert}/>
    </>
  );
};

export default Home;
