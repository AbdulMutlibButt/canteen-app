export interface FoodItem {
  id: number;
  image: string;
  tag?: string;
  rating?: string;
  title: string;
  subtitle?: string;
  price: number | string;
  originalPrice?: number | string;
  discount?: string;
  isCombo?: boolean;
}

export interface SectionHeadingProps {
  badgeText?: string;
  title: string;
  subtitle?: string;
  viewAllLink?: string;
}

export interface FormState {
  success: boolean;
  error?: string;
}