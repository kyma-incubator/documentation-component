import { useContext } from "react";
import { DCContext } from "../core/context";
import { Context } from "../interfaces";

export function useDCContext(): Context {
  return useContext(DCContext);
}
