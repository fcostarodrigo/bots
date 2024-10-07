import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Worker, WorkerForm, workerFormSchema } from "share";
import { useBots } from "../bots/botsApi";

interface WorkerDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (workerForm: WorkerForm) => void;
  worker?: Worker;
  isPending?: boolean;
}

export function WorkerDialog(props: WorkerDialogProps) {
  const bots = useBots();
  const [botId, setBotId] = useState(props.worker?.botId ?? "");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formWorker = workerFormSchema.parse(Object.fromEntries(new FormData(event.currentTarget).entries()));
    props.onSubmit(formWorker);
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setBotId(event.target.value);
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
      <DialogTitle>Add new worker</DialogTitle>
      <DialogContent>
        <TextField
          defaultValue={props.worker?.name}
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
          defaultValue={props.worker?.description}
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

        <FormControl fullWidth>
          <InputLabel id="botIdSelectLabel">Bot</InputLabel>
          <Select onChange={handleChange} labelId="botIdSelectLabel" name="botId" id="botId" value={botId} label="Bot">
            {bots.map((bot) => (
              <MenuItem key={bot.botId} value={bot.botId}>
                {bot.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button disabled={props.isPending} type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
