import {BsFillPinAngleFill} from "react-icons/bs"

interface NoteProps {
    title: string;
    content: string;
    onDelete: () => void;
    onEdit: () => void;
}

export const Note: React.FC<NoteProps> = ({ title, content, onDelete, onEdit }) => {
    return (
      <div className=" bg-yellow-200 shadow-2xl rounded-md p-8 mx-8 w-full">
        <div className="items-center my-3">
          <BsFillPinAngleFill color="red" />
        </div>

        <h1 className=" font-medium text-lg underline">{title}</h1>
        <p className=" font-medium text-md">{content}</p>
        <div className="flex items-center justify-between mt-2">
          <button onClick={onEdit} className="text-blue-800" >Editar</button>
          <button onClick={onDelete} className="text-red-500">Borrar</button>
        </div>
      </div>
    );
};