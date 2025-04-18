import React, { useState, useEffect } from 'react';
import { NOTE_API } from '../../utils/constants';
import AddIcon from '@material-ui/icons/Add';
import Button from '@mui/material/Button';

export default function Notes({ personId }) {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNoteContent, setNewNoteContent] = useState('');

    const GET_NOTES_API = `${NOTE_API}${personId}`;


    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(GET_NOTES_API);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            console.log('Fetched notes:', jsonData); // Log the fetched notes
            setNotes(jsonData);

        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [GET_NOTES_API]);

    const handleAddNoteClick = () => {
        setIsAddingNote(true);
    };
    const handleNewNoteChange = (event) => {
        setNewNoteContent(event.target.value);
    };
    const handleSaveNote = async () => {
        let sendContent = {
            person_id: personId,
            content: newNoteContent,
        }
        setLoading(true);
        setError(null);

        if (!newNoteContent.trim()) {
            alert('No note was added');
            return;
        }
        // send data to backend
        const response = await fetch(NOTE_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sendContent),

        })
        const data = await response.json();
        if (response.ok) {

            fetchData() // This will update the notes state
            setIsAddingNote(false);
            setNewNoteContent('');
        }
        else {
            alert('Error:', data);
        }

    }

    const handleCancelAddNote = () => {
        setIsAddingNote(false);
        setNewNoteContent('');
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    };

    return (
        <div className="bg-gray-100 rounded-lg shadow-md p-6 h-full w-full">

            <Button onClick={handleAddNoteClick}>
                <AddIcon></AddIcon>Add Note
            </Button>

            <div>
                {!notes.length || isAddingNote && <p className="text-gray-600">No notes available.</p>}
            </div>
            {isAddingNote && (
                <div>
                    <textarea
                        value={newNoteContent}
                        onChange={handleNewNoteChange}
                        placeholder="Enter your note..."
                        className='w-full h-24 p-8 border border-gray-300 rounded-md mt-5'
                    />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button onClick={handleSaveNote} disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
                        <Button onClick={handleCancelAddNote} disabled={loading}>
                            Cancel </Button>
                    </div>
                </div>
            )}

            {notes.map((note, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-md mt-4">
                    <p className="text-gray-800">{note.content}</p>
                    <small>Date: {formatDate(note.date)}</small>
                </div>
            ))}

        </div>

    )

}