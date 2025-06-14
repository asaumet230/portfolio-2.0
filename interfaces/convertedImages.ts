export interface ConvertedImage {
  base64: string;
  sizeKB: number;
}

export interface ConvertedImageResponse {
  files: ConvertedImage[];
}

export interface ConvertedFile {
  name: string;
  base64: string;
  sizeKB: number;
}
