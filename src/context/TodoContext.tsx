import { ReactNode, createContext, useContext, useState } from "react";

type TodoProviderProps = {
  children: ReactNode;
};

type TodoContext = {
  todo: TodoList[];
  addTodoList: () => void;
  selectTodo: (list: number) => void;
  selectedList: number;
  addToTodoList: (newTodo: items) => void;
};

type items = {
  todoName: string;
  status: "" | "completed" | "onGoing" | "notStarted";
};
type TodoList = { name: string; id: number; items: items[] };

const TodoContext = createContext({} as TodoContext);

export function useTodoContext() {
  return useContext(TodoContext);
}

let num = 1;
export function TodoProvider({ children }: TodoProviderProps) {
  const [selectedList, setSelectedList] = useState<number>(0);
  const [todo, setTodo] = useState<TodoList[]>([
    {
      name: `List 1`,
      id: 1,
      items: [],
    },
  ]);
  const selectTodo = (list: number) => {
    setSelectedList(list);
  };
  const addTodoList = () => {
    num++;
    setTodo((prev) => [...prev, { name: `List ${num}`, id: num, items: [] }]);
  };
  const addToTodoList = (newTodo: items) => {
    const items = [...todo[selectedList].items, newTodo];
    setTodo((prev) => {
      return prev.map((i) => {
        if (i.id === selectedList + 1) {
          return { ...i, items };
        } else {
          return i;
        }
      });
    });
  };

  return (
    <TodoContext.Provider
      value={{ todo, addTodoList, selectTodo, selectedList, addToTodoList }}
    >
      {children}
    </TodoContext.Provider>
  );
}
