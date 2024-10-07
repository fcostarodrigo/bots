import CloudIcon from "@mui/icons-material/Cloud";
import EditIcon from "@mui/icons-material/Edit";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { Button, CardActions, CardHeader, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
import { Bot, BotForm, botStatusSchema } from "share";
import { BotDialog } from "./BotDialog";
import { useUpdateBot } from "./botsApi";

export function BotCard(props: { bot: Bot }) {
  const updateBotMutation = useUpdateBot();
  const [open, setOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (formBot: BotForm) => {
    updateBotMutation.mutate({ ...props.bot, ...formBot });
    handleClose();
  };

  const handleStatusChange = (_: React.MouseEvent<HTMLElement>, newStatus: string) => {
    const status = botStatusSchema.parse(newStatus);

    if (status === "PAUSED" && props.bot.status === "DISABLED") {
      console.warn("Cannot pause a disabled bot");
    } else {
      updateBotMutation.mutate({ ...props.bot, status });
    }
  };

  return (
    <Card>
      <CardHeader
        title={props.bot.name}
        subheader={new Date(props.bot.updatedAt).toLocaleString()}
        action={
          <ToggleButtonGroup value={props.bot.status} onChange={handleStatusChange} exclusive size="small">
            <ToggleButton value="ENABLED">
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <CloudIcon /> Enabled
              </div>
            </ToggleButton>
            <ToggleButton value="DISABLED">
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <NotInterestedIcon /> Disabled
              </div>
            </ToggleButton>
            <ToggleButton value="PAUSED">
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <PauseCircleOutlineIcon /> Paused
              </div>
            </ToggleButton>
          </ToggleButtonGroup>
        }
      ></CardHeader>
      <CardContent>{props.bot.description}</CardContent>
      <CardActions>
        <Button variant="outlined" endIcon={<EditIcon />} onClick={handleEditClick}>
          Edit
        </Button>
      </CardActions>
      <BotDialog onSubmit={handleSubmit} onClose={handleClose} open={open} bot={props.bot} />
    </Card>
  );
}
