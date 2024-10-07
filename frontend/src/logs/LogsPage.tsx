import AddIcon from "@mui/icons-material/Add";
import { Button, LinearProgress } from "@mui/material";
import { Suspense, useState } from "react";
import { LogForm } from "share";
import { Route } from "../routes/logs";
import { LogDialog } from "./LogDialog";
import { useAddLog } from "./logsApi";
import { LogsList } from "./LogsList";

export function LogsPage() {
  const { botId, workerId } = Route.useSearch();
  const [open, setOpen] = useState(false);
  const addLogMutation = useAddLog();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formLog: LogForm) => {
    addLogMutation.mutate(formLog);
    handleClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex" }}>
        <h1 style={{ flexGrow: "1" }}>Logs</h1>
        <Button variant="contained" onClick={handleClick} startIcon={<AddIcon />}>
          New log
        </Button>
      </div>

      <Suspense fallback={<LinearProgress />}>
        <LogsList botId={botId} workerId={workerId} />
      </Suspense>

      {addLogMutation.isPending && <LinearProgress />}

      <Suspense>
        <LogDialog onSubmit={handleSubmit} onClose={handleClose} open={open} />
      </Suspense>
    </div>
  );
}
