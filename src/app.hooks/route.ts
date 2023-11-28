import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export function useInternalRouter() {
  const navigate = useNavigate();

  return useMemo(() => {
    return {
      goBack() {
        navigate(-1);
      },
      push(path: RoutePath) {
        navigate(path);
      },
      replace(path: RoutePath) {
        navigate(path, { replace: true });
      },
      pushWithState(path: RoutePath, state: Record<string, any>) {
        navigate(path, { state });
      },
    };
  }, [navigate]);
}

export type RoutePath = `/${string}`;
