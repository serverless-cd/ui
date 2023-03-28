export interface AppArchitectureProps {
  label: string;
  value?: Array<any> | undefined;
  defaultSelectedKey?: string;
  maxColCount: number;
  selectedKey?: string;
  onChange?: (key: string) => void;
  children?: React.ReactNode;
}

export interface AppArchitectureItemProps {
  _key: string;
  label: string;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  isControlled: boolean;
  maxColCount: number;
  selected?: boolean;
  setSelectedKey?: (key: string) => void;
  selectedKey?: string;
  onChange?: (key: string) => void;
  children?: React.ReactNode;
  component?: React.ReactNode;
}
