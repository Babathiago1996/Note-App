import Note from "../model/Note.js";
export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error fetching note:", error);
  }
};
export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const getNote = await Note.findById(id);

    if (!getNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json(getNote);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error fetching note:", error);
  }
};
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newNote = await Note.create({ title, content });
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error creating note:", error);
  }
};
export const updateNote = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
    }
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error updating note:", error);
  }
};
export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "note not found" });
    }
    res.status(200).json(deletedNote);
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
    console.log("error updating note:", error);
  }
};
