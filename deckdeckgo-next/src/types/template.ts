export interface Template {
  id: string;
  data: {
    tag: string;
    author?: {
      name: string;
      url: string;
    };
    cdn?: string;
    props?: TemplateProp[];
    slots?: TemplateSlot[];
  };
}

export interface TemplateProp {
  name: string;
  type: 'string' | 'number' | 'boolean';
  placeholder?: string;
}

export interface TemplateSlot {
  name: string;
  placeholder: string;
  types?: string[];
}

export interface TemplateShowcaseProps {
  template: Template;
  author?: boolean;
  customTappable?: boolean;
  onClick?: () => void;
} 