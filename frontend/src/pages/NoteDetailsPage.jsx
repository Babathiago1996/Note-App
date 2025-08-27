import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { LoaderIcon } from "lucide-react";
import { Link } from "react-router";
import { ArrowLeftIcon } from "lucide-react";
import { Trash2Icon } from "lucide-react";
import api from "../lib/api";
const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [isloading, setIsloading] = useState(true);
  const [saving, setSaving] = useState(false);
  const Navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const Fetchdata = async () => {
      try {
        const response = await api.get(
          `/notes/${id}`
        );
        if (response.status === 200) {
          setNote(response.data);
          setIsloading(false);
        }
      } catch (error) {
        toast.error(error.response?.message || "error fetching Notes");
      } finally {
        setIsloading(false);
      }
    };
    Fetchdata();
  }, [id]);
  if (isloading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  const handleDelete = async () => {
    if (!window.confirm("Are You Sure You Want To Delete this Note?")) return;
    try {
      const response = await api.delete(
        `/notes/${note._id}`
      );
      if (response.status === 200) {
        toast.success("Note deleted Successfully");
        Navigate("/");
      }
    } catch (error) {
      toast.error("Failed to delete note.");
      console.error(error);
    }
  };
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please Add Title and Content");
      return;
    }
    setSaving(true);
    try {
      const response = await api.patch(
        `/notes/${id}`,
        note
      );
      if (response.status === 200) {
        toast.success("Note updated Successfully");
        Navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.message || "Failed to update note.");
      setSaving(false);
      console.error(error);
    } finally {
      setSaving(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost ">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>
            <button
              type="button"
              className="btn btn-error btn-outline "
              onClick={handleDelete}
            >
              {" "}
              <Trash2Icon className="size-4" /> Delete Note
            </button>
          </div>
          <div className=" card bg-base-100">
            <div className="card-body ">
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  value={note.title}
                  placeholder="Note Title"
                  className="input input-bordered"
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  type="text"
                  value={note.content}
                  placeholder="Note Content"
                  className="textarea textarea-bordered"
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary "
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailsPage;
