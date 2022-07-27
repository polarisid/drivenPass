import notesRepositories from "../repositories/notesRepositories.js";
import { NotesType } from "../types/noteTypes.js";
import {
  conflictError,
  notFoundError,
  unauthorizedError,
} from "../utils/errorUtils.js";

async function createAndVerifyNewByUser(note: NotesType) {
  const notesExists = await notesRepositories.FindByNameAndUser(
    note.name,
    note.userId
  );
  if (notesExists.length > 0)
    throw conflictError("Note name already exists in database");
  await notesRepositories.Insert(note);
  return;
}

async function SearchByIdAndCompareUser(userId: number, id: number) {
  const notesExists = await notesRepositories.FindById(id);
  if (!notesExists) throw notFoundError("Not found");
  if (notesExists.userId !== userId)
    throw unauthorizedError("You are not Owner");

  return notesExists;
}

async function SearchAllByUser(userId: number) {
  const notes = await notesRepositories.FindByUserId(userId);

  return notes;
}

async function DeleteByIdAndCompareUser(id: number, userId: number) {
  const note = await notesRepositories.FindById(id);
  if (!note) throw notFoundError("Not found");
  if (note.userId !== userId) throw unauthorizedError("You are not Owner");
  await notesRepositories.DeleteById(id);
  return;
}

export default {
  createAndVerifyNewByUser,
  SearchByIdAndCompareUser,
  SearchAllByUser,
  DeleteByIdAndCompareUser,
};
