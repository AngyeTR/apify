import { useState } from 'react';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function useTableFunctions({ data, headers, fileName = 'export', excludeColumns = ['acciones', "Producto(s)", "Acciones"] }) {
  const [isExporting, setIsExporting] = useState(false);

  const getPlainTextHeaders = () => {
    const res=  headers
      .filter(col => !excludeColumns.includes(col.id))
      .map(col => {
        if (typeof col.header === 'string') return col.header;
        if (typeof col.header === 'function') {
          return col.accessorKey || col.id || '';
        }
        if (col.header?.props?.children) {
          return String(col.header.props.children);
        }
        return '';
      });
      return res
  };

  const formatCellValue = (value) => {
    if (Array.isArray(value)) {
      return value
        .map(item => {
          if (typeof item === 'object' && item !== null) {
            // Si el item es un objeto, prioriza 'name' y 'quantity' si existen
            return `${item.name || ''}${item.quantity ? ` (${item.quantity})` : ''}`;
          }
          return String(item);
        })
        .join(', ');
    }

    if (typeof value === 'object' && value !== null) {
      return Object.values(value).join(' - ');
    }

    return value ?? '';
  };

  // Obtener filas procesadas
  const getRows = () => {
    return data.map(row =>
      headers
        .filter(col => !excludeColumns.includes(col.id))
        .map(col => {
          const value = row[col.accessorKey || col.id];
          return formatCellValue(value);
        })
    );
  };

  const handleCopy = async () => {
    setIsExporting(true);
    try {
      const headers = getPlainTextHeaders();
      const rows = getRows();
      const csv = [headers, ...rows]
        .map(row => row.map(cell => `"${cell ?? ''}"`).join(','))
        .join('\n');
      await navigator.clipboard.writeText(csv);
      console.log('Datos copiados al portapapeles');
    } catch {
      console.log('Error al copiar datos');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportExcel = () => {
    setIsExporting(true);
    try {
      const headers = getPlainTextHeaders();
      const rows = getRows();
      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...rows]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1');
      XLSX.writeFile(workbook, `${fileName}.xlsx`);
      console.log('Exportado a Excel correctamente');
    } catch {
      console.log('Error al exportar a Excel');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      const headers = getPlainTextHeaders();
      const rows = getRows();
      const doc = new jsPDF();
      autoTable(doc, {
        head: [headers],
        body: rows
      });
      doc.save(`${fileName}.pdf`);
      console.log('Exportado a PDF correctamente');
    } catch {
      console.log('Error al exportar a PDF');
    } finally {
      setIsExporting(false);
    }
  };

  return {
    isExporting,
    handleCopy,
    handleExportExcel,
    handleExportPDF
  };
}