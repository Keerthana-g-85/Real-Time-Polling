export interface Options {
  id: string;
  option: string;
}
export interface Poll {
  id: string;
  poll_name: string;
  question: string;
  status: string;
  option_id: Options[];
}
export interface Users {
  id: string;
  name: string;
  email: string;
}

export interface VoteCount {
  [option: string]: number;
}

export interface Result {
  [pollId: string]: VoteCount;
}
