export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoListEventTypes {
  target: { value: string };
}
