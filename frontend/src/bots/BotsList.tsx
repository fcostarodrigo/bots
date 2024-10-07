import { BotCard } from "./BotCard";
import { useBots } from "./botsApi";

export function BotsList() {
  const bots = useBots();

  return bots.map((bot) => <BotCard key={bot.botId} bot={bot} />);
}
