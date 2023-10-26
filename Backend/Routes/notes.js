const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

//Route 01--> get all the Notes using: "/api/auth/getuser" . Login required
router.get(
  "/fetchallnotes",
  fetchuser,
  async (req, res) => {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  }
);

//Route 02--> Add the new  Notes using: "/api/auth/addnote" . Login required
router.post(
  "/addnote",
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a descriptioin tile").isLength({ min: 5 }),
  ],
  fetchuser,
  async (req, res) => {
     const {title,description,tag}=req.body;
     try {
   // check validation for error
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
    console.log("erroe")
     return res.status(400).json({ errors: errors.array() });
   }
   // save note
   const notes= new Notes({title,description,tag,user:req.user.id})
   const saveNotes=await notes.save();
   res.json([saveNotes]) 
} catch (error) {
   console.log(error);
   res.status(500).send("Internal server error");
 }
   
  }
);

//Route 03--> update the  Notes using: "/api/auth/update note" . Login required
router.put(
   "/updatenote/:id",
   fetchuser,
   async (req, res) => {
    try {
      const {title,description,tag}=req.body;
      const newNote={};
      if(title){newNote.title=title}
      if(description){newNote.description=description}
      if(tag){newNote.tag=tag}
      // find the note to be updated
      let note=await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not Found")}
      if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
      note= await Notes.findByIdAndUpdate(req.params.id,{$set: newNote},{new: true})
      res.json({note})

    } catch (error) {
      res.status(500).send("Internal server error");
    }
     
   })

//Route 04--> update the  Notes using:Delete  "/api/note/deletenote" . Login required
router.delete(
   "/deletenote/:id",
   fetchuser,
   async (req, res) => {
    try {
      // find the note to be updated
      let note=await Notes.findById(req.params.id)
      // if user note exist send error
      if(!note){return res.status(404).send("Not Found")}
      // check the authorize user
      if(note.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}
      note= await Notes.findByIdAndDelete(req.params.id)
      res.json({"Sucess":"Note has been Deleted successfully ",note:note})
    } catch (error) {
      res.status(500).send("Internal server error");
    }
    
      

   })
module.exports = router;
