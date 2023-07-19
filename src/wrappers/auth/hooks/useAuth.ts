import { useModel } from "@umijs/max";

export function useAuth() {
  const { user } = useModel('@@initialState', model => model.initialState) as any
  
  return {
    isLogin: user !== null
  };
}
