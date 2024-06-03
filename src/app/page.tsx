"use client";

import React, { useState, useEffect } from "react";
import localforage from "localforage";
import { CreateNote } from "./components/CreateNote";
import { Note } from "./components/Note";

interface NoteItem {
  title: string;
  content: string;
}

export default function Home() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>("");
  const [editContent, setEditContent] = useState<string>("");

  // Load notes from local storage
  useEffect(() => {
    localforage
      .getItem("notes")
      .then((savedNotes) => {
        if (savedNotes) {
          const parsedNotes = JSON.parse(savedNotes as string);
          if (Array.isArray(parsedNotes)) {
            setNotes(parsedNotes);
            console.log("Parsed and set notes:", parsedNotes);
          } else {
            console.error("Saved notes are not an array:", parsedNotes);
          }
        }
      })
      .catch((error) => {
        console.error("Failed to load notes from localforage:", error);
      });
  }, []);

  // Save notes to local storage
  useEffect(() => {
    try {
      console.log("Saving notes to local storage:", notes); // Debug log
      localforage.setItem("notes", JSON.stringify(notes));
    } catch (error) {
      console.error("Failed to save notes to local storage:", error);
    }
  }, [notes]);

  const addNote = (title: string, content: string) => {
    const newNote = { title, content };
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      console.log("Updated notes after add:", updatedNotes); // Debug log
      return updatedNotes;
    });
  };

  const deleteNote = (index: number) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((_, i) => i !== index);
      localforage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const editNote = (index: number, title: string, content: string) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      updatedNotes[index].title = title;
      updatedNotes[index].content = content;
      localforage.setItem("notes", JSON.stringify(updatedNotes));
      return updatedNotes;
    });
    setEditIndex(null);
  };

  const startEditing = (index: number) => {
    setEditIndex(index);
    setEditTitle(notes[index].title);
    setEditContent(notes[index].content);
};

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className=" text-3xl">Notas de terapia</h1>
      <CreateNote onAdd={addNote} />
      <div className=" grid grid-cols-1 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-3 justify-between w-[70%]">
      {notes.map((noteItem, index) => (
                editIndex === index ? (
                    <div key={index} className="border p-4 mb-4 w-full max-w-md bg-yellow-200 rounded-lg top-25 absolute text-center">
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="my-4"
                        />
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                        />
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4" onClick={() => editNote(index, editTitle, editContent)}>Guardar cambios</button>
                        <button className= "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => setEditIndex(null)}>Cancelar</button>
                    </div>
                ) : (
                    <Note
                        key={index}
                        title={noteItem.title}
                        content={noteItem.content}
                        onDelete={() => deleteNote(index)}
                        onEdit={() => startEditing(index)}
                    />
                )
            ))}
      </div>
    </main>
  );
}
