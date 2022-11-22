declare type Align = 'left' | 'right' | undefined;
export declare const FORM_CUSTOM_MIDDLE_LABEL_LEFT: {
  labelCol: {
    fixedSpan: number;
  };
  wrapperCol: {
    span: number;
  };
  labelTextAlign: Align;
};
interface fieldProps {
  init: Function;
  getValue: Function;
}
export interface IProps {
  field: fieldProps;
  initValue?: object;
  className?: object | any;
}
export {};
