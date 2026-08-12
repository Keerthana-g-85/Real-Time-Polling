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
