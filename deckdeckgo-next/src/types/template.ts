export interface TemplateSlot {
  name: string;
  placeholder: string;
  types: string[];
}

export interface TemplateData {
  tag: string;
  slots?: TemplateSlot[];
}

export interface Template {
  id: string;
  data: TemplateData;
}

export interface TemplateProp {
  name: string;
  type: 'string' | 'number' | 'boolean';
  placeholder?: string;
}

export interface TemplateShowcaseProps {
  template: Template;
  author?: boolean;
  customTappable?: boolean;
  onClick?: () => void;
} 