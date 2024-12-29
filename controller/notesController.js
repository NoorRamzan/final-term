const Note= require('../models/notesSchema')
const User = require('../models/userSchema')



// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content, subject } = req.body;

        if (!title || !content || !subject) {
            return res.status(400).json({ success: false, error: 'Title, content, and subject are required.' });
        }

        const createdBy = req.user ? req.user._id : null; // Ensure user is authenticated

        if (!createdBy) {
            return res.status(400).json({ success: false, error: 'User is not authenticated.' });
        }

        const note = new Note({
            title,
            content,
            subject,
            createdBy
        });

        await note.save();

        res.status(201).json({ success: true, message: 'Note created successfully!', note });
    } catch (err) {
        console.error('Error creating note:', err);
        res.status(500).json({ success: false, error: 'Failed to create note', details: err.message });
    }
};


// Get a note by its noteId
// router.get('/:noteId', async (req, res) => {
//     try {
//         const note = await Note.findOne({ noteId: req.params.noteId }).populate('createdBy lastEditedBy collaborators');

//         if (!note) {
//             return res.status(404).json({ error: 'Note not found' });
//         }

//         res.status(200).json(note);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to retrieve note' });
//     }
// });

// // Update a note
// router.put('/:noteId', async (req, res) => {
//     try {
//         const { title, content, subject, lastEditedBy, collaborators } = req.body;

//         const note = await Note.findOne({ noteId: req.params.noteId });

//         if (!note) {
//             return res.status(404).json({ error: 'Note not found' });
//         }

//         // Update the note fields
//         note.title = title || note.title;
//         note.content = content || note.content;
//         note.subject = subject || note.subject;
//         note.lastEditedBy = lastEditedBy || note.lastEditedBy;
//         note.collaborators = collaborators || note.collaborators;
//         note.lastEditedAt = Date.now(); // Update the last edited timestamp

//         await note.save();

//         res.status(200).json({ message: 'Note updated successfully!', note });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to update note' });
//     }
// });

// // Delete a note
// router.delete('/:noteId', async (req, res) => {
//     try {
//         const note = await Note.findOneAndDelete({ noteId: req.params.noteId });

//         if (!note) {
//             return res.status(404).json({ error: 'Note not found' });
//         }

//         res.status(200).json({ message: 'Note deleted successfully!' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to delete note' });
//     }
// });

// // Get all notes created by a specific user
// router.get('/user/:userId', async (req, res) => {
//     try {
//         const notes = await Note.find({ createdBy: req.params.userId }).populate('createdBy lastEditedBy collaborators');

//         if (notes.length === 0) {
//             return res.status(404).json({ error: 'No notes found for this user' });
//         }

//         res.status(200).json(notes);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to retrieve notes' });
//     }
// });

// // Get all notes in a specific subject
// router.get('/subject/:subject', async (req, res) => {
//     try {
//         const notes = await Note.find({ subject: req.params.subject }).populate('createdBy lastEditedBy collaborators');

//         if (notes.length === 0) {
//             return res.status(404).json({ error: 'No notes found in this subject' });
//         }

//         res.status(200).json(notes);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Failed to retrieve notes' });
//     }
// });

module.exports = {createNote}






