import { cards } from "@prisma/client";

type CardsType = Omit<cards, "id">;
enum CardMethod {
  debit,
  credit,
  both,
}
export { CardsType, CardMethod };
