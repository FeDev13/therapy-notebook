 "use client";
 
 import { ChangeEvent, useState } from "react"

 interface NoteProps {
    onAdd: (title:string, content:string) => void
 }
 
 export const CreateNote:React.FC<NoteProps> = (props) => {
    const [title, setTitle] = useState<string>("")
    const [content, setContent] = useState<string>("")

    const handleTitle = (e:ChangeEvent<HTMLInputElement>) => {
        const title = e.target.value
        setTitle(title)
    }
    const handleContent = (e:ChangeEvent<HTMLTextAreaElement>) => {
        const content = e.target.value
        setContent(content)
    }

    const submitNote = (e:React.FormEvent) => {
        e.preventDefault()
        props.onAdd(title, content);
        setTitle("");
        setContent("");
        
    }

    return (
        <div className="">
            <form className="flex flex-col" onSubmit={submitNote}>
                <input className="my-8 rounded-sm" type="text" value={title} placeholder="Titulo" onChange={handleTitle} />
                <textarea className=" rounded-sm" value={content} placeholder="Escribi aca" onChange={handleContent}></textarea>
                <button className="rounded-md p-2 bg-cyan-800 text-white mt-4" type="submit">Agregar nota</button>
            </form>
        </div>
    )
}