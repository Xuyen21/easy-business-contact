import React, { useState, useEffect } from "react";
import { NOTE_API } from "../../utils/constants";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";

export default function Notes({ personId }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [newNoteContent, setNewNoteContent] = useState("");
  const [isEditingNote, setIsEditingNote] = useState(null); // Track the ID of the note being edited
  const [editNoteContent, setEditNoteContent] = useState(""); // Content of the note being edited

  const GET_NOTES_API = `${NOTE_API}${personId}`;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(GET_NOTES_API);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
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
    };
    setLoading(true);
    setError(null);

    if (!newNoteContent.trim()) {
      alert("No note was added");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(NOTE_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendContent),
      });
      const data = await response.json();
      if (response.ok) {
        fetchData();
        setIsAddingNote(false);
        setNewNoteContent("");
      } else {
        alert(`Error saving note: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setError(err);
      alert(`Error saving note: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAddNote = () => {
    setIsAddingNote(false);
    setNewNoteContent("");
  };

  const handleDeleteNote = async (noteId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${NOTE_API}${noteId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchData(); // Refresh notes after deletion
      } else {
        const data = await response.json();
        alert(`Error deleting note: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setError(err);
      alert(`Error deleting note: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (note) => {
    setIsEditingNote(note.id);
    setEditNoteContent(note.content);
  };

  const handleEditNoteChange = (event) => {
    setEditNoteContent(event.target.value);
  };

  const handleSaveEdit = async (noteId) => {
    setLoading(true);
    setError(null);

    if (!editNoteContent.trim()) {
      alert("Note content cannot be empty.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${NOTE_API}${noteId}`, {
        method: "PUT", // Or PATCH, depending on your API
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: editNoteContent }),
      });
      const data = await response.json();
      if (response.ok) {
        fetchData(); // Refresh notes after editing
        setIsEditingNote(null);
        setEditNoteContent("");
      } else {
        alert(`Error updating note: ${JSON.stringify(data)}`);
      }
    } catch (err) {
      setError(err);
      alert(`Error updating note: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingNote(null);
    setEditNoteContent("");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-6 h-full w-full mb-30">
      <Button onClick={handleAddNoteClick} disabled={loading}>
        <AddIcon /> Add Note
      </Button>

      <div>
        {!notes.length && !isAddingNote && (
          <p className="text-gray-600">No notes available.</p>
        )}
      </div>

      {isAddingNote && (
        <div>
          <textarea
            value={newNoteContent}
            onChange={handleNewNoteChange}
            placeholder="Enter your note..."
            className="w-full h-24 p-2 border border-gray-300 rounded-md mt-5"
          />
          <div className="flex justify-end gap-2 mt-4">
            <Button onClick={handleSaveNote} disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
            <Button onClick={handleCancelAddNote} disabled={loading}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {notes.map((note) => (
        <div key={note.id} className="bg-white p-4 rounded-lg shadow-md mt-4">
          {isEditingNote === note.id ? (
            <div>
              <textarea
                value={editNoteContent}
                onChange={handleEditNoteChange}
                className="w-full h-24 p-2 border border-gray-300 rounded-md mb-2"
              />
              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => handleSaveEdit(note.id)}
                  disabled={loading}
                >
                  {loading ? "Saving..." : "Save Edit"}
                </Button>
                <Button onClick={handleCancelEdit} disabled={loading}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between">
              <p className="text-gray-800">{note.content}</p>
              <div>
                <Button
                  onClick={() => handleEditClick(note)}
                  disabled={loading}
                >
                  <EditIcon /> Edit
                </Button>
                <Button
                  onClick={() => handleDeleteNote(note.id)}
                  disabled={loading}
                >
                  <DeleteOutlineIcon /> Delete
                </Button>
              </div>
            </div>
          )}
          <small>Date: {formatDate(note.date)}</small>
        </div>
      ))}

      {loading && <p className="mt-4 text-gray-500">Loading notes...</p>}
      {error && <p className="mt-4 text-red-500">Error: {error.message}</p>}
    </div>
  );
}
