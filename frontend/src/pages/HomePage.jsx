import React, { useEffect } from "react";
import { useState } from "react";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUi";
import NoteCard from "../components/NoteCard";
import toast from "react-hot-toast";
import NotesNotFound from "../components/NotesNotFound";
import api from "../lib/api";

const HomePage = () => {
  const [ratelimit, setRateLimit] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchdata = async () => {
      setIsloading(true);
      try {
        const response = await api.get("/notes/");
        const data = response.data;
        setNotes(data);
        setRateLimit(false);
        setIsloading(false);
        console.log(data);
      } catch (error) {
        if (error.response?.status === 429) {
          setRateLimit(true);
        } else {
          toast.error(error.response?.data || "Error Fetching Note");
        }
      } finally {
        setIsloading(false);
      }
    };

    fetchdata();
  }, []);
  return (
    <div className="min-h-screen">
      <NavBar />

      {ratelimit && <RateLimitedUI />}
      <div className="max-w-7xl mx-auto mt-6 p-4">
        {isloading && (
          <div className="text-center text-primary py-10">loading ... </div>
        )}

        {notes.length > 0 && !ratelimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} setNotes={setNotes} />
            ))}
            {notes.length === 0 && !ratelimit && <NotesNotFound />}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
