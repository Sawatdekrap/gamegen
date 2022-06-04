import { v1 as uuid } from "uuid";

export default interface GamePropertyItf {
  id: string;
  name: string;
  options: string[];
}

export const createGameProperty = (name: string): GamePropertyItf => {
  return {
    id: uuid(),
    name,
    options: [],
  };
};
