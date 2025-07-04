import { type VNode } from 'vue';

export interface ColumnDefaultProps {
  class?: string;
  component?: boolean;
  id: number | string;
  label: string;
  name: string;
  render?: VNode;
  width?: string;
}
export interface ItemDefaultProps {
  class?: string;
  component?: boolean;
  id: number | string;
  label: string;
  name: string;
  render?: VNode;
  width?: string;
}
export interface ColumnType extends ColumnDefaultProps {
  [key: string]: unknown;
}
export interface ItemType extends ItemDefaultProps {
  [key: string]: unknown;
}

type Item = {
  [key: string]: unknown;
  label: string;
};

export function getItemValue(column: string, item: Item) {
  if (column.includes('.')) {
    const keys = column.split('.');
    const { length } = keys;
    let content: unknown;
    let i = 0;

    while (i < length) {
      if (i === 0) {
        content = item[keys[0]];
      } else if (content && typeof content === 'object') {
        content = (content as Item)[keys[i]];
      } else {
        content = '';
        break;
      }
      i += 1;
    }

    return content ?? '';
  }

  return item[column] ?? item.label;
}

export function itemTextContent(column: string, item: Item) {
  const content = getItemValue(column, item);

  return Array.isArray(content) ? content.join(',') : content;
}
