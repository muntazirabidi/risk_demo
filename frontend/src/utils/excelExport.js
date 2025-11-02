import ExcelJS from 'exceljs';

/**
 * Risk level color mapping for Excel styling
 */
const RISK_COLORS = {
  'Critical': { bg: 'FFEBEE', font: 'B71C1C', accent: 'F44336' },
  'High': { bg: 'FFF3E0', font: 'E65100', accent: 'FF9800' },
  'Medium': { bg: 'FFFDE7', font: 'F57F17', accent: 'FFEB3B' },
  'Low': { bg: 'E8F5E8', font: '2E7D32', accent: '4CAF50' },
  'Positive': { bg: 'E0F2F1', font: '00695C', accent: '009688' }
};

/**
 * Category color mapping for Excel styling
 */
const CATEGORY_COLORS = {
  'Credit & Financial': { bg: 'E3F2FD', font: '0D47A1', accent: '2196F3' },
  'Operations': { bg: 'F3E5F5', font: '4A148C', accent: '9C27B0' },
  'Market Position': { bg: 'E8F5E8', font: '1B5E20', accent: '4CAF50' },
  'Payment Risk': { bg: 'FFF3E0', font: 'E65100', accent: 'FF9800' },
  'Business Continuity': { bg: 'FCE4EC', font: '880E4F', accent: 'E91E63' },
  'Strategic': { bg: 'F1F8E9', font: '33691E', accent: '8BC34A' }
};

/**
 * Company branding colors
 */
const BRAND_COLORS = {
  primary: '1565C0',      // Professional blue
  secondary: '37474F',    // Dark gray
  accent: '00BCD4',       // Cyan
  success: '388E3C',      // Green
  warning: 'F57C00',      // Orange
  danger: 'D32F2F',       // Red
  light: 'F5F5F5',        // Light gray
  white: 'FFFFFF'
};

/**
 * Apply header styling with branding
 */
function applyHeaderStyle(cell, bgColor = BRAND_COLORS.primary, fontColor = BRAND_COLORS.white) {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: bgColor }
  };
  cell.font = {
    bold: true,
    size: 14,
    color: { argb: fontColor },
    name: 'Arial'
  };
  cell.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  cell.border = {
    top: { style: 'thin', color: { argb: '000000' } },
    left: { style: 'thin', color: { argb: '000000' } },
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } }
  };
}

/**
 * Apply title styling
 */
function applyTitleStyle(cell, bgColor = BRAND_COLORS.primary) {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: bgColor }
  };
  cell.font = {
    bold: true,
    size: 18,
    color: { argb: BRAND_COLORS.white },
    name: 'Arial'
  };
  cell.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  cell.border = {
    top: { style: 'thick', color: { argb: bgColor } },
    left: { style: 'thick', color: { argb: bgColor } },
    bottom: { style: 'thick', color: { argb: bgColor } },
    right: { style: 'thick', color: { argb: bgColor } }
  };
}

/**
 * Apply risk level styling
 */
function applyRiskLevelStyle(cell, riskLevel) {
  const colors = RISK_COLORS[riskLevel] || RISK_COLORS['Medium'];
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: colors.bg }
  };
  cell.font = {
    bold: true,
    color: { argb: colors.font },
    name: 'Arial'
  };
  cell.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  cell.border = {
    top: { style: 'thin', color: { argb: colors.accent } },
    left: { style: 'thin', color: { argb: colors.accent } },
    bottom: { style: 'thin', color: { argb: colors.accent } },
    right: { style: 'thin', color: { argb: colors.accent } }
  };
}

/**
 * Apply category styling
 */
function applyCategoryStyle(cell, category) {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Operations'];
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: colors.bg }
  };
  cell.font = {
    bold: true,
    color: { argb: colors.font },
    name: 'Arial'
  };
  cell.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  cell.border = {
    top: { style: 'thin', color: { argb: colors.accent } },
    left: { style: 'thin', color: { argb: colors.accent } },
    bottom: { style: 'thin', color: { argb: colors.accent } },
    right: { style: 'thin', color: { argb: colors.accent } }
  };
}

/**
 * Apply standard cell styling
 */
function applyStandardCellStyle(cell, isAlternate = false) {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: isAlternate ? BRAND_COLORS.light : BRAND_COLORS.white }
  };
  cell.font = {
    name: 'Arial',
    size: 11,
    color: { argb: BRAND_COLORS.secondary }
  };
  cell.alignment = {
    vertical: 'top',
    horizontal: 'left',
    wrapText: true
  };
  cell.border = {
    top: { style: 'thin', color: { argb: 'E0E0E0' } },
    left: { style: 'thin', color: { argb: 'E0E0E0' } },
    bottom: { style: 'thin', color: { argb: 'E0E0E0' } },
    right: { style: 'thin', color: { argb: 'E0E0E0' } }
  };
}

/**
 * Create professional Excel report from risk assessment data
 */
export async function createExcelReport(assessment, metadata) {
  const workbook = new ExcelJS.Workbook();
  
  // Set workbook properties
  workbook.creator = 'Vendor Due Diligence Platform';
  workbook.lastModifiedBy = 'Risk Assessment System';
  workbook.created = new Date();
  workbook.modified = new Date();
  workbook.company = 'Risk Intelligence Solutions';

  // 1. EXECUTIVE SUMMARY SHEET
  const summarySheet = workbook.addWorksheet('Executive Summary', {
    views: [{ state: 'frozen', ySplit: 3 }]
  });
  
  // Set column widths
  summarySheet.columns = [
    { width: 25 }, { width: 35 }, { width: 20 }, { width: 20 }
  ];

  // Title row
  summarySheet.mergeCells('A1:D1');
  const titleCell = summarySheet.getCell('A1');
  titleCell.value = 'VENDOR DUE DILIGENCE REPORT';
  applyTitleStyle(titleCell);

  // Subtitle row
  summarySheet.mergeCells('A2:D2');
  const subtitleCell = summarySheet.getCell('A2');
  subtitleCell.value = 'Professional Risk Assessment & Financial Analysis';
  subtitleCell.font = { bold: true, size: 12, color: { argb: BRAND_COLORS.secondary }, name: 'Arial' };
  subtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  subtitleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: BRAND_COLORS.light } };

  // Company Information Section
  let row = 4;
  summarySheet.getCell(`A${row}`).value = 'COMPANY INFORMATION';
  applyHeaderStyle(summarySheet.getCell(`A${row}`), BRAND_COLORS.secondary);
  summarySheet.mergeCells(`A${row}:D${row}`);
  
  const companyInfo = [
    ['Company Name:', metadata.companyName],
    ['Industry:', metadata.industry],
    ['Location:', metadata.location],
    ['Assessment Date:', new Date(assessment.assessmentDate).toLocaleDateString()],
    ['Report Generated:', new Date().toLocaleDateString()]
  ];

  companyInfo.forEach((info, index) => {
    row++;
    summarySheet.getCell(`A${row}`).value = info[0];
    summarySheet.getCell(`B${row}`).value = info[1];
    summarySheet.getCell(`A${row}`).font = { bold: true, name: 'Arial', color: { argb: BRAND_COLORS.secondary } };
    applyStandardCellStyle(summarySheet.getCell(`B${row}`));
  });

  // Risk Assessment Section
  row += 2;
  summarySheet.getCell(`A${row}`).value = 'OVERALL RISK ASSESSMENT';
  applyHeaderStyle(summarySheet.getCell(`A${row}`), BRAND_COLORS.primary);
  summarySheet.mergeCells(`A${row}:D${row}`);

  row++;
  summarySheet.getCell(`A${row}`).value = 'Risk Score:';
  summarySheet.getCell(`B${row}`).value = `${assessment.overallRiskScore}/100`;
  summarySheet.getCell(`A${row}`).font = { bold: true, name: 'Arial', color: { argb: BRAND_COLORS.secondary } };
  const scoreCell = summarySheet.getCell(`B${row}`);
  scoreCell.font = { bold: true, size: 16, name: 'Arial', color: { argb: BRAND_COLORS.primary } };

  row++;
  summarySheet.getCell(`A${row}`).value = 'Risk Level:';
  summarySheet.getCell(`B${row}`).value = assessment.riskLevel;
  summarySheet.getCell(`A${row}`).font = { bold: true, name: 'Arial', color: { argb: BRAND_COLORS.secondary } };
  applyRiskLevelStyle(summarySheet.getCell(`B${row}`), assessment.riskLevel);

  // Executive Summary
  row += 2;
  summarySheet.getCell(`A${row}`).value = 'Executive Summary:';
  summarySheet.getCell(`A${row}`).font = { bold: true, name: 'Arial', color: { argb: BRAND_COLORS.secondary } };
  row++;
  summarySheet.mergeCells(`A${row}:D${row + 2}`);
  const summaryCell = summarySheet.getCell(`A${row}`);
  summaryCell.value = assessment.executiveSummary;
  summaryCell.alignment = { wrapText: true, vertical: 'top' };
  summaryCell.font = { name: 'Arial', size: 11 };
  summarySheet.getRow(row).height = 60;

  // Key Metrics
  row += 4;
  summarySheet.getCell(`A${row}`).value = 'KEY METRICS SUMMARY';
  applyHeaderStyle(summarySheet.getCell(`A${row}`), BRAND_COLORS.secondary);
  summarySheet.mergeCells(`A${row}:D${row}`);

  const metrics = [
    ['Total Findings:', assessment.findings.length],
    ['Critical Issues:', assessment.findings.filter(f => f.riskLevel === 'Critical').length, 'Critical'],
    ['High Risk Items:', assessment.findings.filter(f => f.riskLevel === 'High').length, 'High'],
    ['Medium Risk Items:', assessment.findings.filter(f => f.riskLevel === 'Medium').length, 'Medium'],
    ['Low Risk Items:', assessment.findings.filter(f => f.riskLevel === 'Low').length, 'Low'],
    ['Positive Indicators:', assessment.findings.filter(f => f.riskLevel === 'Positive').length, 'Positive']
  ];

  metrics.forEach((metric, index) => {
    row++;
    summarySheet.getCell(`A${row}`).value = metric[0];
    summarySheet.getCell(`B${row}`).value = metric[1];
    summarySheet.getCell(`A${row}`).font = { bold: true, name: 'Arial', color: { argb: BRAND_COLORS.secondary } };
    
    if (metric[2]) {
      applyRiskLevelStyle(summarySheet.getCell(`B${row}`), metric[2]);
    } else {
      summarySheet.getCell(`B${row}`).font = { bold: true, size: 12, name: 'Arial', color: { argb: BRAND_COLORS.primary } };
    }
  });

  // 2. DETAILED FINDINGS SHEET
  const findingsSheet = workbook.addWorksheet('Detailed Findings', {
    views: [{ state: 'frozen', ySplit: 1 }]
  });

  // Set column widths for findings
  findingsSheet.columns = [
    { width: 12 }, { width: 18 }, { width: 20 }, { width: 35 },
    { width: 50 }, { width: 18 }, { width: 20 }, { width: 30 },
    { width: 15 }, { width: 12 }
  ];

  // Headers
  const findingsHeaders = [
    'Risk Level', 'Category', 'Risk Indicator', 'Title',
    'Description', 'Quantified Impact', 'Financial Impact', 'Evidence Source',
    'Evidence URL', 'Date'
  ];

  findingsHeaders.forEach((header, index) => {
    const cell = findingsSheet.getCell(1, index + 1);
    cell.value = header;
    applyHeaderStyle(cell);
  });

  // Data rows
  assessment.findings.forEach((finding, index) => {
    const rowNum = index + 2;
    const isAlternate = index % 2 === 1;
    
    const rowData = [
      finding.riskLevel || 'N/A',
      finding.category || 'N/A',
      finding.riskIndicator || 'N/A',
      finding.title || 'N/A',
      finding.description || 'N/A',
      finding.quantifiedImpact || 'N/A',
      finding.financialImpact || 'N/A',
      finding.evidenceTitle || 'N/A',
      finding.evidenceUrl || 'N/A',
      finding.assessmentDate || 'N/A'
    ];

    rowData.forEach((value, colIndex) => {
      const cell = findingsSheet.getCell(rowNum, colIndex + 1);
      cell.value = value;
      
      if (colIndex === 0) { // Risk Level
        applyRiskLevelStyle(cell, finding.riskLevel);
      } else if (colIndex === 1) { // Category
        applyCategoryStyle(cell, finding.category);
      } else {
        applyStandardCellStyle(cell, isAlternate);
      }
    });
    
    findingsSheet.getRow(rowNum).height = 40; // Increase row height for readability
  });

  // 3. RISK BY CATEGORY SHEET
  const categorySheet = workbook.addWorksheet('Risk by Category', {
    views: [{ state: 'frozen', ySplit: 3 }]
  });

  // Set column widths
  categorySheet.columns = [
    { width: 25 }, { width: 15 }, { width: 12 }, { width: 12 },
    { width: 12 }, { width: 12 }, { width: 12 }
  ];

  // Title
  categorySheet.mergeCells('A1:G1');
  const catTitleCell = categorySheet.getCell('A1');
  catTitleCell.value = 'RISK ANALYSIS BY CATEGORY';
  applyTitleStyle(catTitleCell);

  // Headers
  const catHeaders = ['Category', 'Total', 'Critical', 'High', 'Medium', 'Low', 'Positive'];
  catHeaders.forEach((header, index) => {
    const cell = categorySheet.getCell(3, index + 1);
    cell.value = header;
    applyHeaderStyle(cell);
  });

  // Category analysis
  const categories = [...new Set(assessment.findings.map(f => f.category).filter(Boolean))];
  categories.forEach((category, index) => {
    const rowNum = index + 4;
    const categoryFindings = assessment.findings.filter(f => f.category === category);
    const riskCounts = {
      Critical: categoryFindings.filter(f => f.riskLevel === 'Critical').length,
      High: categoryFindings.filter(f => f.riskLevel === 'High').length,
      Medium: categoryFindings.filter(f => f.riskLevel === 'Medium').length,
      Low: categoryFindings.filter(f => f.riskLevel === 'Low').length,
      Positive: categoryFindings.filter(f => f.riskLevel === 'Positive').length
    };

    const rowData = [
      category, categoryFindings.length, riskCounts.Critical,
      riskCounts.High, riskCounts.Medium, riskCounts.Low, riskCounts.Positive
    ];

    rowData.forEach((value, colIndex) => {
      const cell = categorySheet.getCell(rowNum, colIndex + 1);
      cell.value = value;
      
      if (colIndex === 0) {
        applyCategoryStyle(cell, category);
      } else {
        applyStandardCellStyle(cell, index % 2 === 1);
        if (colIndex > 1) { // Risk count columns
          cell.alignment = { horizontal: 'center', vertical: 'middle' };
          cell.font = { bold: true, name: 'Arial' };
        }
      }
    });
  });

  // Totals row
  const totalsRow = categories.length + 5;
  const totalsData = [
    'TOTALS',
    assessment.findings.length,
    assessment.findings.filter(f => f.riskLevel === 'Critical').length,
    assessment.findings.filter(f => f.riskLevel === 'High').length,
    assessment.findings.filter(f => f.riskLevel === 'Medium').length,
    assessment.findings.filter(f => f.riskLevel === 'Low').length,
    assessment.findings.filter(f => f.riskLevel === 'Positive').length
  ];

  totalsData.forEach((value, colIndex) => {
    const cell = categorySheet.getCell(totalsRow, colIndex + 1);
    cell.value = value;
    applyHeaderStyle(cell, BRAND_COLORS.secondary);
  });

  // 4. ACTION ITEMS SHEET
  const actionSheet = workbook.addWorksheet('Action Items', {
    views: [{ state: 'frozen', ySplit: 3 }]
  });

  // Set column widths
  actionSheet.columns = [
    { width: 5 }, { width: 12 }, { width: 18 }, { width: 40 },
    { width: 18 }, { width: 25 }, { width: 12 }, { width: 30 }
  ];

  // Title
  actionSheet.mergeCells('A1:H1');
  const actionTitleCell = actionSheet.getCell('A1');
  actionTitleCell.value = 'PRIORITY ACTION ITEMS';
  applyTitleStyle(actionTitleCell);

  // Subtitle
  actionSheet.mergeCells('A2:H2');
  const actionSubtitleCell = actionSheet.getCell('A2');
  actionSubtitleCell.value = '(Critical and High Risk Findings Requiring Immediate Attention)';
  actionSubtitleCell.font = { italic: true, size: 11, color: { argb: BRAND_COLORS.secondary }, name: 'Arial' };
  actionSubtitleCell.alignment = { horizontal: 'center', vertical: 'middle' };

  // Headers
  const actionHeaders = ['#', 'Priority', 'Category', 'Issue', 'Impact', 'Recommended Action', 'Status', 'Notes'];
  actionHeaders.forEach((header, index) => {
    const cell = actionSheet.getCell(3, index + 1);
    cell.value = header;
    applyHeaderStyle(cell);
  });

  // Action items
  const priorityFindings = assessment.findings.filter(f => f.riskLevel === 'Critical' || f.riskLevel === 'High');
  priorityFindings.forEach((finding, index) => {
    const rowNum = index + 4;
    const rowData = [
      index + 1,
      finding.riskLevel,
      finding.category,
      finding.title,
      finding.quantifiedImpact,
      'Immediate Review Required',
      'Pending',
      '' // Notes column for manual input
    ];

    rowData.forEach((value, colIndex) => {
      const cell = actionSheet.getCell(rowNum, colIndex + 1);
      cell.value = value;
      
      if (colIndex === 1) { // Priority column
        applyRiskLevelStyle(cell, finding.riskLevel);
      } else if (colIndex === 2) { // Category column
        applyCategoryStyle(cell, finding.category);
      } else {
        applyStandardCellStyle(cell, index % 2 === 1);
      }
    });
    
    actionSheet.getRow(rowNum).height = 35;
  });

  return workbook;
}

/**
 * Download Excel file with professional formatting
 */
export async function downloadExcelReport(assessment, metadata) {
  try {
    const workbook = await createExcelReport(assessment, metadata);
    
    // Generate filename
    const companySlug = metadata.companyName.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
    const dateSlug = new Date().toISOString().split('T')[0];
    const filename = `vendor-due-diligence-${companySlug}-${dateSlug}.xlsx`;
    
    // Generate buffer and create download
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
    });
    
    // Create download link
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Excel export error:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get risk level badge styling for consistent UI display
 */
export function getRiskLevelStyle(riskLevel) {
  const colors = RISK_COLORS[riskLevel] || RISK_COLORS['Medium'];
  return {
    backgroundColor: `#${colors.bg}`,
    color: `#${colors.font}`,
    border: `2px solid #${colors.font}33`
  };
}

/**
 * Get category styling for consistent UI display
 */
export function getCategoryStyle(category) {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS['Operations'];
  return {
    backgroundColor: `#${colors.bg}`,
    color: `#${colors.font}`,
    border: `1px solid #${colors.font}33`
  };
}