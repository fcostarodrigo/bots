import AddIcon from "@mui/icons-material/Add";
import { Button, LinearProgress } from "@mui/material";
import { Suspense, useState } from "react";
import { WorkerForm } from "share";
import { Route } from "../routes/workers";
import { WorkerDialog } from "./WorkerDialog";
import { useAddWorker } from "./workersApi";
import { WorkersList } from "./WorkersList";

export function WorkersPage() {
  const { botId } = Route.useSearch();
  const [open, setOpen] = useState(false);
  const addWorkerMutation = useAddWorker();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formWorker: WorkerForm) => {
    addWorkerMutation.mutate(formWorker);
    handleClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex" }}>
        <h1 style={{ flexGrow: "1" }}>Workers</h1>
        <Button variant="contained" onClick={handleClick} startIcon={<AddIcon />}>
          New worker
        </Button>
      </div>

      <Suspense fallback={<LinearProgress />}>
        <WorkersList botId={botId} />
      </Suspense>

      {addWorkerMutation.isPending && <LinearProgress />}

      <Suspense>
        <WorkerDialog onSubmit={handleSubmit} onClose={handleClose} open={open} />
      </Suspense>
    </div>
  );
}
