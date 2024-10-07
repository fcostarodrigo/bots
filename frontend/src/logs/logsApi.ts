import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { Log, LogForm, logsSchema, request } from "share";

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
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
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
    onMutate: async (updateLog) => {
      await queryClient.cancelQueries({ queryKey });
      const oldLogs = queryClient.getQueryData<Log[]>(queryKey) ?? [];
      const newLogs = oldLogs.map((log) => (log.logId === updateLog.logId ? updateLog : log));
      queryClient.setQueryData(queryKey, newLogs);
      return { oldLogs };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.oldLogs);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
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
