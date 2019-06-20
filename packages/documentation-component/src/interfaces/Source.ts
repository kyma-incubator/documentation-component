export interface Source {
  type: string;
  source: string;
  content?: string;
  metadata?: {
    [key: string]: any;
  };
}
