import { useModel } from "@umijs/max";

export function useInit() {
  const { hasAdmin } = useModel('@@initialState', model => model.initialState) as any;

  return { hasAdmin };
}