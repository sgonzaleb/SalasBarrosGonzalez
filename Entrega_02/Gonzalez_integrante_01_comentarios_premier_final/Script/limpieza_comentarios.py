import pandas as pd
import re

# 1. Cargar datos crudos desde la carpeta datos_originales
df = pd.read_excel('../datos_originales/Libro3.xlsx')
match_columns = [col for col in df.columns if not col.startswith('Unnamed')]

# 2. Definir catálogo de entidades para detección con Regex
entities = {
    'Xabi Alonso': r'\b(alonso|xabi)\b',
    'John Terry': r'\b(john terry|terry|jt)\b',
    'Malo Gusto': r'\b(gusto|malo gusto)\b',
    'Enzo Fernández': r'\b(enzo)\b',
    'Estêvão': r'\b(estevao|estêvão)\b',
    'Pedro Neto': r'\b(neto|pedro neto)\b',
    'Declan Rice': r'\b(rice|declan)\b',
    'William Saliba': r'\b(saliba|william saliba)\b',
    'Mauricio Pochettino': r'\b(pochettino|mauricio)\b',
    'Richarlison': r'\b(richarlison)\b'
}

rows = []
comment_id = 1

for match in match_columns:
    team = 'Chelsea' if 'Chelsea' in match else ('Arsenal' if 'Arsenal' in match else 'Tottenham Hotspur')
    comments = df[match].dropna().astype(str).tolist()
    
    # Incluir desfasados de columnas adyacentes
    col_idx = df.columns.get_loc(match) + 1
    if col_idx < len(df.columns) and df.columns[col_idx].startswith('Unnamed'):
        comments.extend(df.iloc[:, col_idx].dropna().astype(str).tolist())
    
    for comm in comments:
        comm_clean = comm.strip()
        # Filtrado de ruido de interfaz de Instagram
        if not comm_clean or comm_clean.lower() in ['responder', 'me gusta', '1 h', '2 h', '1 sem', '10 h', '17 h', '22 h', '4 h']:
            continue
            
        detected = [ent for ent, pat in entities.items() if re.search(pat, comm_clean, re.IGNORECASE)]
        
        # Si no hay entidad mencionada, se deja en blanco
        rows.append({
            'ID_Comentario': comment_id,
            'Equipo': team,
            'Partido': match,
            'Comentario_Limpio': comm_clean,
            'Entidad_Mencionada': ", ".join(detected) if detected else ""
        })
        comment_id += 1

# 3. Exportar base de datos limpia a la carpeta raíz de la entrega individual
full_df = pd.DataFrame(rows)
full_df.to_csv('../base_comentarios_premier_completa.csv', index=False, encoding='utf-8-sig')

print(f"✅ Proceso finalizado. Total de comentarios procesados: {len(full_df)}")