import { LogCard } from "./LogCard";
import { useLogs } from "./logsApi";

export function LogsList(props: { botId?: string; workerId?: string }) {
  const logs = useLogs();

  return logs
    .filter((log) => !props.botId || ("botId" in log && log.botId === props.botId))
    .filter((log) => !props.workerId || ("workerId" in log && log.workerId === props.workerId))
    .map((log) => <LogCard key={log.logId} log={log} />);
}
