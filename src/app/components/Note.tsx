import {BsFillPinAngleFill} from "react-icons/bs"

interface NoteProps {
    title: string;
    content: string;
}

export const Note: React.FC<NoteProps> = ({ title, content }) => {
    return (
      <div className=" bg-yellow-200 shadow-2xl rounded-md p-8 mx-8 w-full">
        <div className="items-center my-3">
          <BsFillPinAngleFill color="red" />
        </div>

        <h1 className=" font-medium text-lg underline">{title}</h1>
        <p className=" font-medium text-md">{content}</p>
      </div>
    );
};