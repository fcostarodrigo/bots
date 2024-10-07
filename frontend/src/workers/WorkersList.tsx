import { WorkerCard } from "./WorkerCard";
import { useWorkers } from "./workersApi";

export function WorkersList(props: { botId?: string }) {
  const workers = useWorkers();

  return workers
    .filter((worker) => !props.botId || worker.botId === props.botId)
    .map((worker) => <WorkerCard key={worker.workerId} worker={worker} />);
}
