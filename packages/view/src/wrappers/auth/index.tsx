import { Navigate, Outlet } from '@umijs/max';
import { useAuth } from './hooks/useAuth';

export default () => {
  const { isLogin } = useAuth();
  return isLogin ? <Outlet /> : <Navigate to={'/login'} />;
};
