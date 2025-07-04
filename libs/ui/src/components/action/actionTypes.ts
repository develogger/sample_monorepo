export interface Item {
  active?: boolean;
  command?: () => void;
  divider?: boolean;
  icon?: string;
  id: number | string;
  label: string;
  style?: string;
}
export interface EventType {
  event: string;
  uniqueId: string;
}
export interface Props {
  eventType?: EventType;
  id?: string;
  items: Item[];
  limit: number;
  selectedId?: string;
  width?: string;
}
