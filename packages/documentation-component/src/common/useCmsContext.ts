import { useContext as uc } from 'react';
import { Context } from '../core/context';
import { Context as ContextType } from '../interfaces';

export function useContext(): ContextType {
  return uc(Context);
};