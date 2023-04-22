import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useTodoContext } from "../context/TodoContext";

type AddTodoModalProps = {
  modalOpen: boolean;
  handleClose: () => void;
};
type T = {
  todoName: string;
  status: "" | "completed" | "onGoing" | "notStarted";
};

export default function AddTodoModal({
  modalOpen,
  handleClose,
}: AddTodoModalProps) {
  const [todo, setTodo] = useState<T>({
    todoName: "",
    status: "",
  });
  const [error, setError] = useState<boolean>(false);
  const { addToTodoList } = useTodoContext();

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    borderRadius: "30px",
    boxShadow: 24,
    p: 4,
  };
  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setTodo((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Modal open={modalOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Add new Todo
        </Typography>
        <TextField
          id="todoName"
          name="todoName"
          label="Name of Todo"
          variant="outlined"
          fullWidth
          value={todo.todoName}
          onChange={handleChange}
          sx={{ mb: 2 }}
          error={error && todo.todoName === ""}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={todo.status}
            label="Status"
            name="status"
            onChange={handleChange}
            error={error && todo.status === ""}
          >
            <MenuItem value="completed">Completed</MenuItem>
            <MenuItem value="onGoing">On Going</MenuItem>
            <MenuItem value="notStarted">Not Started</MenuItem>
          </Select>
        </FormControl>
        <div>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => {
              if (todo.status === "" || todo.todoName === "") {
                setError(true);
                return;
              }
              setError(false);
              setTodo({
                todoName: "",
                status: "",
              });
              addToTodoList(todo);
            }}
          >
            Add to list
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              setTodo({ todoName: "", status: "" });
              handleClose();
            }}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
