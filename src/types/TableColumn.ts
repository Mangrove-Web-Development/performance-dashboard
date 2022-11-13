export interface TableColumn {
    id: 'name' | 'time' | 'performance' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
