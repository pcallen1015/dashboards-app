export interface NavItem {
    label: string;
    icon?: string;
    action?: Function;
    children?: NavItem[];
}