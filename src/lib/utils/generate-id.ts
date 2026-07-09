import ShortUniqueId from "short-unique-id";

export const uuid = new ShortUniqueId({ length: 5, dictionary: "alpha_lower" });

export function generateID(length: number) {
  const id = new ShortUniqueId({ length });
  return id.rnd();
}
