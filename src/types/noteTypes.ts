import { notes } from "@prisma/client";

type NotesType = Omit<notes, "id">;

export { NotesType };
