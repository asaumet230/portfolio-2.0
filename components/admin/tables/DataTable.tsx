'use client';

import { ReactNode } from 'react';
import { Pencil2Icon, TrashIcon, EyeOpenIcon } from '@radix-ui/react-icons';

interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (value: any, row: T) => ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onView?: (item: T) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable<T extends { id?: string; _id?: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  loading = false,
  emptyMessage = 'No hay datos disponibles',
}: DataTableProps<T>) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b"
              >
                {column.label}
              </th>
            ))}
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300 border-b">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={row._id || row.id || index}
              className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b"
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
                >
                  {column.render
                    ? column.render((row as any)[column.key as any], row)
                    : String((row as any)[column.key as any] || '-')}
                </td>
              ))}
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  {onView && (
                    <button
                      onClick={() => onView(row)}
                      className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"
                      title="Ver"
                    >
                      <EyeOpenIcon className="w-4 h-4 text-blue-500" />
                    </button>
                  )}
                  {onEdit && (
                    <button
                      onClick={() => onEdit(row)}
                      className="p-2 hover:bg-yellow-100 dark:hover:bg-yellow-900 rounded transition"
                      title="Editar"
                    >
                      <Pencil2Icon className="w-4 h-4 text-yellow-500" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(row)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
                      title="Eliminar"
                    >
                      <TrashIcon className="w-4 h-4 text-red-500" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
