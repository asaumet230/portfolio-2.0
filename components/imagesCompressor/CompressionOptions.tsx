'use client'

import 'animate.css';

export type CompressionMode = 'high' | 'recommended' | 'max' | 'target';

const TARGET_PRESETS_KB = [100, 500, 1024];

const MODES: { mode: CompressionMode; label: string; description: string }[] = [
    { mode: 'high', label: 'Alta calidad', description: 'Compresión ligera' },
    { mode: 'recommended', label: 'Recomendado', description: 'Equilibrio ideal' },
    { mode: 'max', label: 'Máxima compresión', description: 'El menor peso' },
    { mode: 'target', label: 'Tamaño exacto', description: 'Elige los KB' },
];

const RESIZE_OPTIONS: { value: number | null; label: string }[] = [
    { value: null, label: 'Original' },
    { value: 1920, label: '1920 px' },
    { value: 1280, label: '1280 px' },
    { value: 800, label: '800 px' },
];

interface CompressionOptionsProps {
    compressionMode: CompressionMode;
    setCompressionMode: (mode: CompressionMode) => void;
    targetSizeKB: number;
    setTargetSizeKB: (sizeKB: number) => void;
    maxDimension: number | null;
    setMaxDimension: (dimension: number | null) => void;
    isLoading: boolean;
}

export const CompressionOptions = ({
    compressionMode,
    setCompressionMode,
    targetSizeKB,
    setTargetSizeKB,
    maxDimension,
    setMaxDimension,
    isLoading
}: CompressionOptionsProps) => {

    return (
        <div className="w-10/12 mx-auto mt-8 sm:w-11/12 animate__animated animate__fadeIn">
            <p className="text-sm font-semibold text-gray-600 dark:text-slate-200 mb-3 text-center">
                Nivel de compresión
            </p>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="radiogroup" aria-label="Nivel de compresión">
                {MODES.map(({ mode, label, description }) => (
                    <button
                        key={mode}
                        type="button"
                        role="radio"
                        aria-checked={compressionMode === mode}
                        disabled={isLoading}
                        onClick={() => setCompressionMode(mode)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 text-center transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60
                            ${compressionMode === mode
                                ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900 dark:border-indigo-400'
                                : 'border-gray-300 bg-white hover:border-indigo-400 dark:bg-gray-600 dark:border-gray-400'}`}>
                        <span className="text-sm font-semibold text-gray-800 dark:text-white">{label}</span>
                        <span className="text-xs text-gray-500 dark:text-slate-300 mt-0.5">{description}</span>
                    </button>
                ))}
            </div>

            {compressionMode === 'target' && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-4 animate__animated animate__fadeIn">
                    {TARGET_PRESETS_KB.map((presetKB) => (
                        <button
                            key={presetKB}
                            type="button"
                            disabled={isLoading}
                            onClick={() => setTargetSizeKB(presetKB)}
                            className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60
                                ${targetSizeKB === presetKB
                                    ? 'border-indigo-600 bg-indigo-600 text-white'
                                    : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400 dark:bg-gray-600 dark:text-white dark:border-gray-400'}`}>
                            {presetKB === 1024 ? '1 MB' : `${presetKB} KB`}
                        </button>
                    ))}

                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-slate-200">
                        Personalizado:
                        <input
                            type="number"
                            min={10}
                            max={18432}
                            step={10}
                            value={targetSizeKB}
                            disabled={isLoading}
                            onChange={(e) => setTargetSizeKB(Math.max(10, Number(e.target.value) || 10))}
                            aria-label="Tamaño objetivo en KB"
                            className="w-24 px-2 py-1.5 rounded-md border-2 border-gray-300 text-gray-800 bg-white focus:border-indigo-500 focus:outline-none dark:bg-gray-600 dark:text-white dark:border-gray-400" />
                        KB
                    </label>
                </div>
            )}

            <p className="text-sm font-semibold text-gray-600 dark:text-slate-200 mt-5 mb-3 text-center">
                Redimensionar <span className="font-normal text-gray-400 dark:text-slate-300">(opcional, lado más largo)</span>
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2" role="radiogroup" aria-label="Redimensionar imagen">
                {RESIZE_OPTIONS.map(({ value, label }) => (
                    <button
                        key={label}
                        type="button"
                        role="radio"
                        aria-checked={maxDimension === value}
                        disabled={isLoading}
                        onClick={() => setMaxDimension(value)}
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold border-2 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-60
                            ${maxDimension === value
                                ? 'border-indigo-600 bg-indigo-600 text-white'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-indigo-400 dark:bg-gray-600 dark:text-white dark:border-gray-400'}`}>
                        {label}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default CompressionOptions;
