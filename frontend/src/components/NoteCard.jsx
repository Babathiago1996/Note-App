import { PenSquareIcon, Trash2Icon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../lib/utils";
import axios from "axios";
import toast from "react-hot-toast";
const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e) => {
    e.preventDefault();
    if (!window.confirm("Are You Sure You Want To Delete this Note?")) return;
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/notes/${note._id}`
      );
      if (response.status === 200) {
        toast.success("Note deleted Successfully");
        setNotes((prev) => prev.filter((n) => n._id !== note._id));
      }
    } catch (error) {
      toast.error("Failed to delete note.");
      console.error(error);
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="bg-base-100 card hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FFD9]"
    >
      <div className="card-body">
        <h3 className="card-title text-base-content">{note.title}</h3>
        <p className="text-base-content/70 line-clamp-3">{note.content}</p>
        <div className="card-actions  justify-between items-center mt-4">
          <span className="text-sm text-base-content/60">
            {formatDate(note.createdAt)}
          </span>
          <div className="flex gap-1 items-center">
            <PenSquareIcon className="size-4" />
            <button
             type="button" className="btn btn-ghost btn-xs text-error"
              onClick={handleDelete}
            >
              {" "}
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
