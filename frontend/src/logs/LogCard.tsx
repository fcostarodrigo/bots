import { CardHeader } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Log } from "share";
import { useBots } from "../bots/botsApi";
import { useWorkers } from "../workers/workersApi";

export function LogCard(props: { log: Log }) {
  const bots = useBots();
  const workers = useWorkers();

  const bot = bots.find((bot) => "botId" in props.log && bot.botId === props.log.botId);
  const worker = workers.find((worker) => "workerId" in props.log && worker.workerId === props.log.workerId);

  return (
    <Card>
      <CardHeader
        title={`Log from ${bot?.name ?? worker?.name}`}
        subheader={new Date(props.log.updatedAt).toLocaleString()}
      ></CardHeader>
      <CardContent>{props.log.message}</CardContent>
    </Card>
  );
}
