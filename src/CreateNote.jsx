import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subject, setSubject] = useState('');
  const [collaborators, setCollaborators] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare noteData object
    const noteData = {
        title,
        content,
        subject,
    };

    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT from localStorage

    try {
        const response = await axios.post(
            'http://localhost:3001/notes/createNote',
            noteData, // Send noteData in the request body
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Include token in the Authorization header
                },
            }
        );
        console.log('Note created successfully:', response.data);
        navigate('/notes'); // Navigate to notes list after successful creation
    } catch (error) {
        console.error('Error creating note:', error.response ? error.response.data : error.message);
        alert('Error creating note: ' + (error.response ? error.response.data.message : error.message));
    }
};



  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-green-300">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Create a New Note</h1>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-green-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-green-700">
            Content
          </label>
          <textarea
            id="content"
            placeholder="Write your note content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="5"
            required
          />
        </div>

        {/* Subject */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-green-700">
            Subject
          </label>
          <input
            id="subject"
            type="text"
            placeholder="Subject (e.g., Math, Science)"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Collaborators */}
        <div>
          <label htmlFor="collaborators" className="block text-sm font-medium text-green-700">
            Collaborators
          </label>
          <input
            id="collaborators"
            type="text"
            placeholder="Enter userIds separated by commas"
            value={collaborators}
            onChange={(e) => setCollaborators(e.target.value)}
            className="mt-2 block w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-green-500 mt-2">Add userIds of collaborators (separated by commas).</p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;
