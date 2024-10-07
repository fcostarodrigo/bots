import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Bot, Log, LogForm, logsSchema, request, Worker } from "share";

const queryKey = ["logs"];

export function useAddLog() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (logForm: LogForm) =>
      request({
        url: "/api/logs",
        method: "POST",
        body: logForm,
      }),
    onSettled: async (_, __, logForm) => {
      return await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [...queryKey, "botId" in logForm ? logForm.botId : logForm.workerId],
        }),
        queryClient.invalidateQueries({ queryKey }),
      ]);
    },
  });

  return mutation;
}

export function useUpdateLog() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (log: Log) =>
      request({
        url: `/api/logs/${log.logId}`,
        method: "PUT",
        body: log,
      }),
    onSettled: async (_, __, log) => {
      return await Promise.all([
        queryClient.invalidateQueries({ queryKey }),
        queryClient.invalidateQueries({ queryKey: [...queryKey, "botId" in log ? log.botId : log.workerId] }),
      ]);
    },
  });

  return mutation;
}

export function useLogs() {
  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: () =>
      request({
        url: "/api/logs",
        method: "GET",
      }),
  });

  return logsSchema.parse(data);
}

export function useBotLogs(bot: Bot) {
  const { data } = useSuspenseQuery({
    queryKey: [...queryKey, bot.botId],
    queryFn: () =>
      request({
        url: `/api/bot/${bot.botId}/logs`,
        method: "GET",
      }),
  });

  return logsSchema.parse(data);
}

export function useWorkerLogs(worker: Worker) {
  const { data } = useSuspenseQuery({
    queryKey: [...queryKey, worker.workerId],
    queryFn: () =>
      request({
        url: `/api/workers/${worker.workerId}/logs`,
        method: "GET",
      }),
  });

  return logsSchema.parse(data);
}
