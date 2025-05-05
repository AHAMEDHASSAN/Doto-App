import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todos/Todos";
const initialDataTodos = [
  {
    id: uuidv4(),
    Title: "قراة الكتب",
    Details: " C# كتاب ",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    Title: "قراة الكتب",
    Details: "كتاب جافاسكربت",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    Title: "قراة الكتب",
    Details: "كتاب جافاسكربت",
    isCompleted: false,
  },
];

const TodoList = () => {
  const [DataTodos, setDataTodos] = useState(initialDataTodos);
  const [DataTodosInput, setDataTodosInput] = useState("");
  const [todos] = useState([
    { id: 1, Title: "مهمة 1", Details: "تفاصيل المهمة", isCompleted: false },
    // ...
  ]);

  const originalTodosRef = useRef(initialDataTodos); // لارجاع البيانات

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem("Todos")) ?? [];
    if (getLocalStorage) {
      setDataTodos(getLocalStorage);
      originalTodosRef.current = getLocalStorage; // حفظ نسخة أصلية للفلاتر
    }
  }, []);

  const handelCheckClick = (idTodo) => {
    const UpDate = DataTodos.map((item) => {
      if (item.id === idTodo) {
        return { ...item, isCompleted: !item.isCompleted }; // يعكس الحالة
      }
      return item;
    });

    setDataTodos(UpDate);
    localStorage.setItem("Todos", JSON.stringify(UpDate));
  };

  const handleEdit = (updatedTodo) => {
    const updatedTodos = DataTodos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    setDataTodos(updatedTodos); // تأكد من تحديث بيانات الـ Todos هنا
  };

  const handleDeleteClicked = (deleteId) => {
    const confirmDelete = window.confirm("هل أنت متأكد أنك تريد الحذف؟");

    if (confirmDelete) {
      const updatedTodos = DataTodos.filter((item) => item.id !== deleteId);
      setDataTodos(updatedTodos);

      localStorage.setItem("Todos", JSON.stringify(updatedTodos));
    }
  };
  const NewDataTodos = DataTodos.map((item) => {
    return (
      <Todo
        key={item.id}
        TodoItem={item}
        Delete={handleDeleteClicked}
        handelCheck={handelCheckClick}
        handelEdit={handleEdit}
        DataTodos={todos}
      />
    );
  });

  const handelClickAdd = () => {
    if (DataTodosInput.trim() === "") return;
    const NewDataTodosAdd = {
      id: uuidv4(),
      Title: DataTodosInput,
      Details: "",
      isCompleted: false,
    };

    const localStorageDataTodos = [...DataTodos, NewDataTodosAdd];
    setDataTodos(localStorageDataTodos);

    localStorage.setItem("Todos", JSON.stringify(localStorageDataTodos));
    setDataTodosInput("");
  };

  // Start isCompleted //

  const handelIsCompleted = () => {
    const completed = originalTodosRef.current.filter(
      (item) => item.isCompleted === true
    );

    setDataTodos(completed);
  };

  const handelNotCompleted = () => {
    const notCompleted = originalTodosRef.current.filter(
      (item) => item.isCompleted === false
    );
    setDataTodos(notCompleted);
  };

  const handelAllCompleted = () => {
    setDataTodos(originalTodosRef.current);
  };

  // End  isCompleted //

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflowY:"scroll"
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{ color: "#0d6efd", fontWeight: "bold" }}
          >
            مهامي
          </Typography>
          <Divider sx={{ background: "#0d6efd" }} />

          {/* Start ToggleButton  */}

          <ToggleButtonGroup
            sx={{ mt: 3, background: "#0d6efd", color: "white" }}
            exclusive
            aria-label="text alignment"
          >
            <ToggleButton
              onClick={handelAllCompleted}
              value="left"
              sx={{ color: "white" }}
            >
              الكل
            </ToggleButton>

            <ToggleButton
              onClick={handelIsCompleted}
              value="center"
              sx={{ color: "white" }}
            >
              منجز
            </ToggleButton>

            <ToggleButton
              onClick={handelNotCompleted}
              value="right"
              sx={{ color: "white" }}
            >
              غير منجز
            </ToggleButton>
          </ToggleButtonGroup>

          {/* End ToggleButton  */}
        </CardContent>

        {NewDataTodos}

        {/* Start Add */}
        <Grid container spacing={2} sx={{ m: 2 }}>
          <Grid size={8}>
            <TextField
              id="outlined-basic"
              label="المهمة"
              variant="outlined"
              sx={{ width: "100%" }}
              value={DataTodosInput}
              onChange={(e) => {
                setDataTodosInput(e.target.value);
              }}
            />

            {/* End Add */}
          </Grid>
          <Grid size={4}>
            <Button
              sx={{
                background: "#0d6efd",
                width: "100%",
                height: "100%",
                fontFamily: "A",
                color: "white",
              }}
              onClick={handelClickAdd}
               disabled={DataTodosInput.length === 0 }
            >
              اضافة
            </Button>
          </Grid>
          {/* End Add */}
        </Grid>
      </Card>
    </Container>
  );
};

export default TodoList;
