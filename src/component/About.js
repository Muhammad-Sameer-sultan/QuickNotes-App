// About.js
import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <h2 className="display-4 text-center mb-5">About QuikNotes</h2>
      <div className="row">
        <div className="col-md-8 mx-auto">
          <p className="lead">
            Welcome to QuikNotes, your digital notebook for a seamless note-taking experience.
          </p>
          <p>
            At iNote Book, we believe in the power of organized information. Our platform allows you to log in securely, create, edit, and delete notes effortlessly.
          </p>
          <p className="font-weight-bold">Key Features:</p>
          <ul className="list-group">
            <li className="list-group-item">Secure and private login system</li>
            <li className="list-group-item">Intuitive interface for creating and managing notes</li>
            <li className="list-group-item">Effortless editing and deletion of notes</li>
            <li className="list-group-item">User-friendly navigation</li>
          </ul>
          <p>
            Whether you're a student, professional, or just someone who loves to jot down ideas, iNote Book is designed to cater to your note-taking needs.
          </p>
          <p>
            Our team is dedicated to continuously improving the platform to provide you with the best note-taking experience possible.
          </p>
          <p className="blockquote-footer">
            Thank you for choosing iNote Book. Happy note-taking!
          </p>
          <p>
            If you have any questions, suggestions, or feedback, feel free to contact us at <a href="mailto:info@inotebook.com">info@inotebook.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
