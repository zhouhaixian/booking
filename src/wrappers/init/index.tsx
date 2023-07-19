import { Outlet, Navigate } from "@umijs/max";
import { useInit } from "./hooks/useInit";

export default () => {
  const { hasAdmin } = useInit();
  return hasAdmin ? <Outlet /> : <Navigate to={'/welcome'} />;
};
