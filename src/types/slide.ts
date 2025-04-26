export type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
};

export type SlideTemplate = 
  | 'title'
  | 'content'
  | 'split'
  | 'two-column'
  | 'image'
  | 'code'
  | 'chart'
  | 'poll'
  | 'blank';

export interface SlideContent {
  title?: string;
  content?: string;
  leftContent?: string;
  rightContent?: string;
  imageUrl?: string;
  code?: {
    language: string;
    content: string;
  };
  chart?: {
    type: 'bar' | 'line' | 'pie';
    data: ChartData;
  };
  poll?: {
    question: string;
    options: string[];
  };
  style?: {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontFamily?: string;
  };
}

export interface Slide {
  id: string;
  template: SlideTemplate;
  content: SlideContent;
  order: number;
} 