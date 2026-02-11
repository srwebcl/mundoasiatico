import pandas as pd
import os

EXCEL_FILE = 'Por Categoria.xlsx'
OUTPUT_FILE = 'products_summary.md'

try:
    xl = pd.ExcelFile(EXCEL_FILE)
    
    with open(OUTPUT_FILE, 'w') as f:
        f.write("# Resumen de Productos por Categoría\n\n")
        f.write(f"**Archivo Fuente:** `{EXCEL_FILE}`\n\n")
        
        for sheet_name in xl.sheet_names:
            f.write(f"## Categoría: {sheet_name}\n\n")
            
            try:
                # Read sheet, allow skipping bad lines
                df = pd.read_excel(EXCEL_FILE, sheet_name=sheet_name, header=None)
                
                # Assuming data starts at row index 4 (row 5) based on previous analysis
                # But let's be robust. 
                products = []
                for index, row in df.iterrows():
                    # heuristic: skip empty rows or rows that look like headers
                    val = str(row[0]).strip()
                    if index < 4: continue
                    if not val or val.lower() == 'nan': continue
                    products.append(val)
                
                f.write(f"**Total Productos:** {len(products)}\n\n")
                
                if products:
                    for p in products:
                        f.write(f"- {p}\n")
                else:
                    f.write("_No se encontraron productos en esta hoja._\n")
                
                f.write("\n---\n\n")
                
            except Exception as e:
                f.write(f"_Error al leer la hoja: {e}_\n\n")

    print(f"Summary generated at {OUTPUT_FILE}")

except Exception as e:
    print(f"Error opening Excel file: {e}")
