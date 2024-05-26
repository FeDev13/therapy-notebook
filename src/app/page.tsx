"use client";

import React, { useState, useEffect } from 'react';
import localforage from 'localforage';
import { CreateNote } from './components/CreateNote';
import { Note } from './components/Note';

interface NoteItem {
    title: string;
    content: string;
}

export default function Home() {
    const [notes, setNotes] = useState<NoteItem[]>([]);

    // Load notes from local storage when the component mounts
    useEffect(() => {
      localforage.getItem('notes').then((savedNotes) => {
        if (savedNotes) {
            const parsedNotes = JSON.parse(savedNotes as string);
            if (Array.isArray(parsedNotes)) {
                setNotes(parsedNotes);
                console.log("Parsed and set notes:", parsedNotes);
            } else {
                console.error("Saved notes are not an array:", parsedNotes);
            }
        }
    }).catch(error => {
        console.error("Failed to load notes from localforage:", error);
    });
    }, []);

    // Save notes to local storage whenever they are updated
    useEffect(() => {
        try {
            console.log("Saving notes to local storage:", notes); // Debug log
            localforage.setItem('notes', JSON.stringify(notes));
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

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className=' text-3xl'>Notas de terapia</h1>
            <CreateNote onAdd={addNote} />
            <div className=' flex mt-8 justify-between w-[70%]'>
               {notes.map((noteItem, index) => (
                <Note key={index} title={noteItem.title} content={noteItem.content} />
            ))} 
            </div>
            
        </main>
    );
}
