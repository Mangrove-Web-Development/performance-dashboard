export interface TableColumn {
    id: 'name' | 'time' | 'performance' | 'seo' | 'best-practices';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}
