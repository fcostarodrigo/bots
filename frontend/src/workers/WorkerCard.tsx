import EditIcon from "@mui/icons-material/Edit";
import { Button, CardActions, CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Worker, WorkerForm } from "share";
import { useBots } from "../bots/botsApi";
import { WorkerDialog } from "./WorkerDialog";
import { useUpdateWorker } from "./workersApi";

export function WorkerCard(props: { worker: Worker }) {
  const bots = useBots();
  const updateWorkerMutation = useUpdateWorker();
  const [open, setOpen] = useState(false);

  const bot = bots.find((bot) => bot.botId === props.worker.botId);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formWorker: WorkerForm) => {
    updateWorkerMutation.mutate({ ...props.worker, ...formWorker });
    handleClose();
  };

  return (
    <Card>
      <CardHeader
        title={`${props.worker.name} (${bot?.name})`}
        subheader={new Date(props.worker.updatedAt).toLocaleString()}
      ></CardHeader>
      <CardContent>{props.worker.description}</CardContent>
      <CardActions>
        <Button variant="outlined" endIcon={<EditIcon />} onClick={handleEditClick}>
          Edit
        </Button>
        <Link className="cardLink" search={{ workerId: props.worker.workerId }} to={`/logs`}>
          Logs
        </Link>
      </CardActions>
      <WorkerDialog onSubmit={handleSubmit} onClose={handleClose} open={open} worker={props.worker} />
    </Card>
  );
}
