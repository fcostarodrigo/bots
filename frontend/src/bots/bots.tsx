import AddIcon from "@mui/icons-material/Add";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { botFormSchema } from "share";

export default function Bots() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formBot = botFormSchema.parse(Object.fromEntries(new FormData(event.currentTarget).entries()));
    console.log(formBot);
    handleClose();
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <h1>Bots</h1>
        <div style={{ flexGrow: "1" }}></div>
        <Button variant="contained" onClick={handleClick} startIcon={<AddIcon />}>
          New bot
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="sm"
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add new bot</DialogTitle>
        <DialogContent>
          <TextField autoFocus required margin="dense" id="name" name="name" label="Name" type="text" fullWidth />

          <TextField
            minRows={4}
            multiline
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
