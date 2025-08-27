import { ArrowBigLeft, ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
const CreatePage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isloading, setIsloading] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All Field Must be Filled");
      return;
    }
    setIsloading(true);
    try {
      const response = await api.post("/notes/", {
        title,
        content,
      });
      if (response.status === 201) {
        toast.success("Note created Successfully");
        Navigate("/");
      } else {
        toast.error(response.data || "Error Creating Note");
      }
    } catch (error) {
      toast.error(error.response?.message || "Error Creating Note");
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div className="min-h-screen bg-base-200" data-theme="forest">
      <div className="mx-auto container px-4 py-8 ">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    placeholder="Note Title"
                    className="input input-bordered"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text">Content</span>
                  </label>
                  <textarea
                    type="text"
                    value={content}
                    placeholder="Write your Content here..."
                    className="textarea textarea-bordered h-32"
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button
                    type="submit"
                    disabled={isloading}
                    className="btn btn-primary"
                  >
                    {isloading ? "Creating..." : "Create Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
