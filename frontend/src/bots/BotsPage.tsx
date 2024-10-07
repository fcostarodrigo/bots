import AddIcon from "@mui/icons-material/Add";
import { Button, LinearProgress } from "@mui/material";
import { Suspense, useState } from "react";
import { BotForm } from "share";
import { BotDialog } from "./BotDialog";
import { BotLoadingCard } from "./BotLoadingCard";
import { useAddBot } from "./botsApi";
import { BotsList } from "./BotsList";

export function BotsPage() {
  const [open, setOpen] = useState(false);
  const addBotMutation = useAddBot();

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formBot: BotForm) => {
    addBotMutation.mutate(formBot);
    handleClose();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex" }}>
        <h1 style={{ flexGrow: "1" }}>Bots</h1>
        <Button variant="contained" onClick={handleClick} startIcon={<AddIcon />}>
          New bot
        </Button>
      </div>

      <Suspense fallback={<LinearProgress />}>
        <BotsList />
      </Suspense>

      {addBotMutation.isPending && <BotLoadingCard botForm={addBotMutation.variables} />}

      <BotDialog onSubmit={handleSubmit} onClose={handleClose} open={open} />
    </div>
  );
}
