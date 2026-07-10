export interface ImagePreview {
    id?: string;
    file: File;
    url: string;
    originalUrl?: string;
    originalSizeKB: number;
    convertedSizeKB?: number;
    progress: number;
    completed?: boolean;
    error?: string;
    keptOriginal?: boolean;
}
