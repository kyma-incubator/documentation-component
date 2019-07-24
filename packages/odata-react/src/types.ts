export interface Node {
  attributes: { [key: string]: string };
  name: string;
  value: string;
  children: Node[];
}
export interface ErrorNode extends Node {
  text: string;
  children: ErrorNode[];
  name: "parsererror";
}
export function isErrorNode(node: Node | ErrorNode): node is ErrorNode {
  return (node as ErrorNode).name === "parsererror";
}
