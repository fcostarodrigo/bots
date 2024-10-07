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
import { LogForm } from "share";
import { z } from "zod";
import { useBots } from "../bots/botsApi";
import { useWorkers } from "../workers/workersApi";

interface LogDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (logForm: LogForm) => void;
}

export function LogDialog(props: LogDialogProps) {
  const bots = useBots();
  const workers = useWorkers();
  const [botId, setBotId] = useState("");
  const [workerId, setWorkerId] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message = z.string().parse(Object.fromEntries(new FormData(event.currentTarget).entries()).message);

    if (botId) {
      props.onSubmit({ message, botId });
    } else {
      props.onSubmit({ message, workerId });
    }
  };

  const handleBotChange = (event: SelectChangeEvent<string>) => {
    setBotId(event.target.value);
    setWorkerId("");
  };

  const handleWorkerChange = (event: SelectChangeEvent<string>) => {
    console.log(event);
    setWorkerId(event.target.value);
    setBotId("");
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
      <DialogTitle>Add new log</DialogTitle>
      <DialogContent>
        <TextField
          minRows={4}
          multiline
          required
          margin="dense"
          id="message"
          name="message"
          label="Message"
          type="text"
          fullWidth
        />

        <FormControl fullWidth style={{ marginTop: "1rem" }}>
          <InputLabel id="botIdSelectLabel">Bot</InputLabel>
          <Select
            onChange={handleBotChange}
            labelId="botIdSelectLabel"
            name="botId"
            id="botId"
            value={botId}
            label="Bot"
          >
            {bots.map((bot) => (
              <MenuItem key={bot.botId} value={bot.botId}>
                {bot.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth style={{ marginTop: "1rem" }}>
          <InputLabel id="workerIdSelectLabel">Worker</InputLabel>
          <Select
            onChange={handleWorkerChange}
            labelId="workerIdSelectLabel"
            name="workerId"
            id="workerId"
            value={workerId}
            label="Worker"
          >
            {workers.map((worker) => (
              <MenuItem key={worker.workerId} value={worker.workerId}>
                {worker.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button type="submit">Save</Button>
      </DialogActions>
    </Dialog>
  );
}
