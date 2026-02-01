export interface ClothingItem {
  id: string;
  name: string;
  category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'accessories';
  imageUrl: string;
  thumbnail: string;
  description: string;
  tags: string[];
}

export interface TryOnResult {
  originalImage: string;
  tryOnImage: string;
  timestamp: number;
  clothingItem: ClothingItem;
  processing: boolean;
  error?: string;
}

export interface UploadedSelfie {
  file: File;
  preview: string;
  uploaded: boolean;
}
