import { utils, writeFile } from 'xlsx';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

// Export Users list to Excel (.xlsx)
export const exportToExcel = (users) => {
  if (!users || users.length === 0) return;

  const formattedData = users.map((user) => ({
    "DNI": user.dni,
    "Nombre Completo": user.fullName,
    "Correo Electrónico": user.email,
    "Teléfono": user.phone,
    "Estado": user.status === 'active' ? 'Activo' : 'Inactivo',
    "Fecha Registro": user.registrationDate,
    "Región / Departamento": user.department || 'N/A',
    "Domicilio": user.address || 'N/A'
  }));

  const worksheet = utils.json_to_sheet(formattedData);
  
  // Set Column widths
  const maxProps = [{ wch: 12 }, { wch: 30 }, { wch: 25 }, { wch: 15 }, { wch: 10 }, { wch: 15 }, { wch: 20 }, { wch: 35 }];
  worksheet['!cols'] = maxProps;

  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Ciudadanos RENIEC");

  // Save the Excel file
  writeFile(workbook, `RENIEC_Ciudadanos_${new Date().toISOString().split('T')[0]}.xlsx`);
};

// Export Users list to PDF (.pdf) with styling matching RENIEC brand
export const exportToPDF = (users) => {
  if (!users || users.length === 0) return;

  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4'
  });

  // Header Title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(15, 23, 42); // Dark Blue (#0F172A)
  doc.text("RENIEC - Registro Nacional de Identificación y Estado Civil", 14, 20);

  doc.setFontSize(10);
  doc.setFont("Helvetica", "normal");
  doc.setTextColor(100, 116, 139); // Slate Gray
  doc.text("Sistema de Control Ciudadano - Reporte General de Usuarios", 14, 25);
  doc.text(`Fecha de Generación: ${new Date().toLocaleString()}`, 14, 30);

  // Table Headers and Rows
  const tableHeaders = [["DNI", "Nombre Completo", "Correo Electrónico", "Teléfono", "Estado", "Fecha Registro", "Departamento"]];
  const tableData = users.map((user) => [
    user.dni,
    user.fullName,
    user.email,
    user.phone,
    user.status === 'active' ? 'Activo' : 'Inactivo',
    user.registrationDate,
    user.department || 'N/A'
  ]);

  // Call autoTable (plugged into jsPDF)
  doc.autoTable({
    head: tableHeaders,
    body: tableData,
    startY: 36,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 23, 42], // RENIEC dark blue
      textColor: [255, 255, 255],
      fontSize: 10,
      fontStyle: 'bold',
      halign: 'left'
    },
    bodyStyles: {
      fontSize: 9,
      textColor: [51, 65, 85]
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252] // light grey row backgrounds
    },
    columnStyles: {
      4: { fontStyle: 'bold' } // bold text for "Estado"
    },
    margin: { left: 14, right: 14 }
  });

  // Footer / Page numbers
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFont("Helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.getWidth() - 25, doc.internal.pageSize.getHeight() - 10);
    doc.text("Documento oficial para uso interno administrativo - RENIEC Perú", 14, doc.internal.pageSize.getHeight() - 10);
  }

  // Save the PDF
  doc.save(`RENIEC_Ciudadanos_${new Date().toISOString().split('T')[0]}.pdf`);
};
