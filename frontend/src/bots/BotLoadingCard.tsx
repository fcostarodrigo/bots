import CloudIcon from "@mui/icons-material/Cloud";
import EditIcon from "@mui/icons-material/Edit";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import { Button, CardActions, CardHeader, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { BotForm } from "share";

export function BotLoadingCard(props: { botForm: BotForm }) {
  return (
    <Card className="pulse">
      <CardHeader
        title={props.botForm.name}
        subheader={new Date().toLocaleString()}
        action={
          <ToggleButtonGroup value={"DISABLED"} disabled>
            <ToggleButton value="ENABLED">
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <CloudIcon /> Enabled
              </div>
            </ToggleButton>
            <ToggleButton value="DISABLED">
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <NotInterestedIcon /> Disabled
              </div>
            </ToggleButton>
            <ToggleButton value="PAUSED">
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <PauseCircleOutlineIcon /> Paused
              </div>
            </ToggleButton>
          </ToggleButtonGroup>
        }
      ></CardHeader>
      <CardContent>{props.botForm.description}</CardContent>
      <CardActions>
        <Button variant="outlined" endIcon={<EditIcon />} disabled>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
