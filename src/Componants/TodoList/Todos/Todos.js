import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import * as React from "react";
const Todos = ({ TodoItem, handelCheck, Delete  , handelEdit }) => {



  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [editedTitle, setEditedTitle] = React.useState(TodoItem.Title);
  const [editedDetails, setEditedDetails] = React.useState(TodoItem.Details);

  const handelCheckClick = () => {
    handelCheck(TodoItem.id);
  };
  const handelDeleteClicked = () => {
    Delete(TodoItem.id);
  };

  
  const handleEditClick = () => {
    setEditedTitle(TodoItem.Title); // إعادة ملء البيانات القديمة
    setEditedDetails(TodoItem.Details);
    setOpenEditDialog(true);
  };

  const handleEditSave = () => {
    if (editedTitle.trim() !== "" && editedDetails.trim() !== "") {
      handelEdit({
        ...TodoItem,   // تأكد من أنك تحتفظ بكل الخصائص في الكائن
        Title: editedTitle,
        Details: editedDetails,
      });
      setOpenEditDialog(false);
    } else {
      // يمكن إضافة خطأ هنا لو العنوان أو التفاصيل فارغة
      alert("يرجى ملء كل الحقول");
    }
  };
  
  const handleEditCancel = () => {
    setOpenEditDialog(false);
  };

  return (
    <Card sx={{ minWidth: 275, background: "#0d6efd", m: 2, color: "white" }} >
      <CardContent>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography variant="h5" style={{ textDecoration : TodoItem.isCompleted ? "line-through" : "none"}}>{TodoItem.Title}</Typography>
              <Typography variant="h6"> {TodoItem.Details}</Typography>
            </Grid>

            <Grid size={4}>
              {/* Start Icons */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <CheckCircleIcon
                  sx={{ color: TodoItem.isCompleted ? "green" : "white" }}
                  onClick={handelCheckClick}
                />
                <DeleteIcon onClick={handelDeleteClicked} />

                <EditIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleEditClick}
                  />
              </Box>

              {/* End Icons */}
            </Grid>
          </Grid>
        </Box>
      </CardContent>

       {/* Edit Dialog */}
       <Dialog open={openEditDialog} onClose={handleEditCancel}>
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="العنوان"
            type="text"
            fullWidth
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="التفاصيل"
            type="text"
            fullWidth
            value={editedDetails}
            onChange={(e) => setEditedDetails(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditCancel}>إلغاء</Button>
          <Button onClick={handleEditSave} color="primary">
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
    </Card>

    
  );
};

export default Todos;
