import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Bot, BotForm, botFormSchema } from "share";

interface BotDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (botForm: BotForm) => void;
  bot?: Bot;
}

export function BotDialog(props: BotDialogProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formBot = botFormSchema.parse(Object.fromEntries(new FormData(event.currentTarget).entries()));
    props.onSubmit(formBot);
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth="sm"
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}
    >
      <DialogTitle>Add new bot</DialogTitle>
      <DialogContent>
        <TextField
          defaultValue={props.bot?.name}
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
        />

        <TextField
          defaultValue={props.bot?.description}
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
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
