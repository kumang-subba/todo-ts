import {
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Container,
  Grid,
  List,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import PendingIcon from "@mui/icons-material/Pending";
import NotStartedIcon from "@mui/icons-material/NotStarted";
import FolderIcon from "@mui/icons-material/Folder";
import AddTodoModal from "./AddTodoModal";
import { useTodoContext } from "../context/TodoContext";
import { styled } from "@mui/material/styles";

const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  maxWidth: 1000,
  color: theme.palette.text.primary,
}));

function getColor(c: string) {
  switch (c) {
    case "c":
      return "green";
    case "o":
      return "orange";
    case "n":
      return "red";
  }
}

export default function Content() {
  const [value, setValue] = useState("showAll");
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const { todo, selectedList } = useTodoContext();
  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Toolbar />
      <Container
        maxWidth="lg"
        sx={{
          mt: 4,
          mb: 4,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        {todo[selectedList] &&
          todo[selectedList].items
            .filter((i) => {
              if (value == "showAll") {
                return i;
              } else if (value === i.status) {
                return i;
              }
            })
            .map((item, index) => (
              <Box key={index} sx={{ display: "flex", gap: 5 }}>
                <StyledPaper
                  sx={{
                    my: 1,
                    mx: "auto",
                    p: 2,
                  }}
                >
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar
                        sx={{
                          width: 60,
                          height: 60,
                          bgcolor: `${getColor(item.status.charAt(0))}`,
                        }}
                      >
                        {item.status.charAt(0).toUpperCase()}
                      </Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {item.todoName}
                      </Typography>
                      <Typography>
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </Typography>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </Box>
            ))}
        <AddTodoModal modalOpen={modalOpen} handleClose={handleClose} />
        <Button onClick={handleOpen} variant="contained">
          Add todo
        </Button>

        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue: string) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Show All"
              value="showAll"
              icon={<FolderIcon />}
            />
            <BottomNavigationAction
              label="Completed"
              value="completed"
              icon={<DoneIcon />}
            />
            <BottomNavigationAction
              label="On Going"
              value="onGoing"
              icon={<PendingIcon />}
            />
            <BottomNavigationAction
              label="Not Started"
              value="notStarted"
              icon={<NotStartedIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Container>
    </Box>
  );
}
