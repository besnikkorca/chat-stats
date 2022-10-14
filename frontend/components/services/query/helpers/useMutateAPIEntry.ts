import { useMemo } from 'react';
import { UseMutationResult } from 'react-query';
import { APIEntry } from 'types/api';
import CommandPattern from 'utils/CommandPattern';
import useCreateAPIEntry from './useCreateAPIEntry';
import useDeleteAPIEntry from './useDeleteAPIEntry';

export default function useMutateAPIEntry() {
  const deleteMutationResult = useDeleteAPIEntry();
  const createMutationResult = useCreateAPIEntry();
  const deleteMutation = useMemo(
    () =>
      ({
        ...deleteMutationResult,
        mutate: (entry: APIEntry, ...args) => {
          CommandPattern.saveCommand({
            action: {
              type: 'delete',
              cb: () => deleteMutationResult.mutate(entry, ...args),
              text: `Delete entry "${entry.name}"`,
            },
            inverse: {
              type: 'add',
              cb: () => createMutationResult.mutate(entry, ...args),
              text: `Add entry "${entry.name}"`,
            },
          });
          return deleteMutationResult.mutate(entry, ...args);
        },
      } as UseMutationResult<any, unknown, APIEntry, unknown>),
    [deleteMutationResult]
  );

  const createMutation = useMemo(
    () =>
      ({
        ...createMutationResult,
        mutate: (entry: APIEntry, ...args) => {
          CommandPattern.saveCommand({
            action: {
              type: 'add',
              cb: () => createMutationResult.mutate(entry, ...args),
              text: `Add entry "${entry.name}"`,
            },
            inverse: {
              type: 'delete',
              cb: () => deleteMutationResult.mutate(entry, ...args),
              text: `Delete entry "${entry.name}"`,
            },
          });
          return deleteMutationResult.mutate(entry, ...args);
        },
      } as UseMutationResult<any, unknown, APIEntry, unknown>),
    [createMutationResult]
  );

  return { delete: deleteMutation, create: createMutation };
}
