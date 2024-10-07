import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Bot, BotForm, botsSchema, request } from "share";

const queryKey = ["bots"];

export function useAddBot() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (botForm: BotForm) =>
      request({
        url: "/api/bots",
        method: "POST",
        body: botForm,
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
}

export function useUpdateBot() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (bot: Bot) =>
      request({
        url: `/api/bots/${bot.botId}`,
        method: "PUT",
        body: bot,
      }),
    onMutate: async (updateBot) => {
      await queryClient.cancelQueries({ queryKey });
      const oldBots = queryClient.getQueryData<Bot[]>(queryKey) ?? [];
      const newBots = oldBots.map((bot) => (bot.botId === updateBot.botId ? updateBot : bot));
      queryClient.setQueryData(queryKey, newBots);
      return { oldBots };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.oldBots);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
}

export function useBots() {
  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: () =>
      request({
        url: "/api/bots",
        method: "GET",
      }),
  });

  return botsSchema.parse(data);
}
