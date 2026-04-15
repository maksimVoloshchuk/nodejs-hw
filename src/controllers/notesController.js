import createHttpError from 'http-errors';
import { Note } from '../models/note.js';

export const getAllNotes = async (req, res) => {
  const { page = 1, perPage = 10, tag, search } = req.query;

  const filter = {};

  if (tag) {
    filter.tag = tag;
  }

  if (search) {
    filter.$text = { $search: search };
  }

const [totalNotes, notes] = await Promise.all([
  Note.countDocuments(filter),
  Note.find(filter)
    .skip((page - 1) * perPage)
    .limit(perPage),
]);

const totalPages = Math.ceil(totalNotes / perPage);
  res.status(200).json({
    page: Number(page),
    perPage: Number(perPage),
    totalNotes,
    totalPages,
    notes,
  });
};

export const getNoteById = async (req, res) => {
  const { noteId } = req.params;

  const note = await Note.findById(noteId);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNote = async (req, res) => {
  const newNote = await Note.create(req.body);
  res.status(201).json(newNote);
};

export const deleteNote = async (req, res) => {
  const { noteId } = req.params;

  const deletedNote = await Note.findByIdAndDelete(noteId);

  if (!deletedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(deletedNote);
};

export const updateNote = async (req, res) => {
  const { noteId } = req.params;

  const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
    returnDocument: 'after',
    runValidators: true,
  });

  if (!updatedNote) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(updatedNote);
};