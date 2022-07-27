import { Request, Response } from "express";
import notesServices from "../services/notesServices.js";
import { NotesType } from "../types/noteTypes.js";
async function CreateNote(req: Request, res: Response) {
  const note = {
    name: req.body.name.toLowerCase(),
    annotation: req.body.annotation,
    userId: res.locals.user.id,
  } as NotesType;

  await notesServices.createAndVerifyNewByUser(note);
  res.sendStatus(201);
}

async function SearchById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  const userId = res.locals.user.id;
  const note = await notesServices.SearchByIdAndCompareUser(userId, id);

  res.status(200).send(note);
}

async function SearchAllByUser(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const notes = await notesServices.SearchAllByUser(userId);
  res.status(200).send(notes);
}

async function DeleteById(req: Request, res: Response) {
  const userId = res.locals.user.id;
  const id = parseInt(req.params.id);
  await notesServices.DeleteByIdAndCompareUser(id, userId);
  res.status(200).send("deleted");
}
export default {
  CreateNote,
  SearchById,
  SearchAllByUser,
  DeleteById,
};
