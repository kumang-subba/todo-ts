import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import { useTodoContext } from "../context/TodoContext";

type ListOfTodoProps = {
  open: boolean;
};
export default function ListOfTodo({ open }: ListOfTodoProps) {
  const { todo, addTodoList, selectTodo } = useTodoContext();
  return (
    <React.Fragment>
      {todo &&
        todo.map((list, index) => {
          return (
            <ListItemButton
              key={list.id}
              onClick={() => selectTodo(index)}
              selected
              sx={{
                display: "flex",
                ...(!open && {
                  flexDirection: "column",
                }),
              }}
            >
              <ListItemIcon>
                <FeaturedPlayListIcon />
              </ListItemIcon>
              <ListItemText primary={list.name} />
            </ListItemButton>
          );
        })}
      <ListItemButton onClick={addTodoList}>
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Add New List" />
      </ListItemButton>
    </React.Fragment>
  );
}
