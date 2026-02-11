
export interface SlideSection {
  title: string;
  items: string[];
}

export interface SlideData {
  id: number;
  type: 'title' | 'content' | 'conclusion';
  title: string;
  subtitle?: string;
  intro?: string;
  sections?: SlideSection[];
  content?: string[]; // Simplified fallback
  footer?: string;
  presenters?: string[];
  extraInfo?: string;
  imageUrl: string;
}
