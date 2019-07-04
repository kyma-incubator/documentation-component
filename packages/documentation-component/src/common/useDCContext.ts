import { useContext } from "react";
import { Context } from "../core/context";
import { Context as ContextType } from "../interfaces";

export function useDCContext(): ContextType {
  return useContext(Context);
}
