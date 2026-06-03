/**
 * Types and Interfaces for AgroMarket Cruz - Urban Agriculture
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  unit: string;
  imageUrl: string;
  stock: number;
  rating: number;
  benefits: string[];
  ecologicalFactor: string; // e.g., "100% biodegradable", "Sostenible"
  specDetails: {
    label: string;
    value: string;
  }[];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export interface GardenPlan {
  spaceSqMeters: number;
  sunExposure: 'high' | 'medium' | 'low';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
}

export interface RecipeResult {
  cocofiberLiters: number;
  wormHumusLiters: number;
  pearliteLiters: number;
  estimatedYieldKg: string;
  co2SavedKg: string;
}
