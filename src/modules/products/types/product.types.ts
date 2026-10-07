export interface ProductData {
  id: string;
  name: string;
  gender: string;
  itemDesc?: string | null;
  icon?: string | null;
  imageUrl?: string | null;
  imageFit?: string | null;
  imageTexture?: string | null;
  imageAtmosphere?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
