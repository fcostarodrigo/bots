import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { request, Worker, WorkerForm, workersSchema } from "share";

const queryKey = ["workers"];

export function useAddWorker() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (workerForm: WorkerForm) =>
      request({
        url: "/api/workers",
        method: "POST",
        body: workerForm,
      }),
    onSettled: async () => {
      return await queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
}

export function useUpdateWorker() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (worker: Worker) =>
      request({
        url: `/api/workers/${worker.workerId}`,
        method: "PUT",
        body: worker,
      }),
    onMutate: async (updateWorker) => {
      await queryClient.cancelQueries({ queryKey });
      const oldWorkers = queryClient.getQueryData<Worker[]>(queryKey) ?? [];
      const newWorkers = oldWorkers.map((worker) =>
        worker.workerId === updateWorker.workerId ? updateWorker : worker,
      );
      queryClient.setQueryData(queryKey, newWorkers);
      return { oldWorkers };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.oldWorkers);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return mutation;
}

export function useWorkers() {
  const { data } = useSuspenseQuery({
    queryKey,
    queryFn: () =>
      request({
        url: "/api/workers",
        method: "GET",
      }),
  });

  return workersSchema.parse(data);
}
