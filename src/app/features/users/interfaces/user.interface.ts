export interface User {
  readonly id: string;
  readonly name: string;
  readonly cards: Card[];
}

interface Card {
  readonly name: string;
  readonly description: string;
}