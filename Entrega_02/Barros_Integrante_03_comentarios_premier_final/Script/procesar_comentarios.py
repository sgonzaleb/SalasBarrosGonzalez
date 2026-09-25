import pandas as pd
import re

# 1. Cargar archivo crudo
df = pd.read_excel('../Datos_originales/base_comentarios_premier_sach.xlsx')

# 2. Catálogo de entidades para Liverpool, City y United
entities = {
    'Mohamed Salah': r'\b(salah|mo salah|mo)\b',
    'Virgil van Dijk': r'\b(van dijk|vvd|virgil)\b',
    'Luis Díaz': r'\b(diaz|luis diaz|lucho)\b',
    'Darwin Núñez': r'\b(darwin|nunez|núñez)\b',
    'Alexis Mac Allister': r'\b(mac allister|alexis|macca)\b',
    'Dominik Szoboszlai': r'\b(szoboszlai|szobo)\b',
    'Cody Gakpo': r'\b(gakpo|cody)\b',
    'Alexander Isak': r'\b(isak)\b',
    'Florian Wirtz': r'\b(wirtz)\b',
    'Giorgi Mamardashvili': r'\b(mamardashvili|mamar)\b',
    'Erling Haaland': r'\b(haaland|erling)\b',
    'Kevin De Bruyne': r'\b(de bruyne|kdb|kevin)\b',
    'Phil Foden': r'\b(foden|phil)\b',
    'Rodri': r'\b(rodri|rodrigo)\b',
    'Pep Guardiola': r'\b(pep|guardiola)\b',
    'Bruno Fernandes': r'\b(bruno|fernandes)\b',
    'Marcus Rashford': r'\b(rashford|marcus)\b',
    'Alejandro Garnacho': r'\b(garnacho|garna)\b',
    'Kobbie Mainoo': r'\b(mainoo|kobbie)\b',
    'Erik ten Hag': r'\b(ten hag|eth)\b'
}

def detect_entities(comm):
    if not isinstance(comm, str):
        return ""
    detected = [ent for ent, pat in entities.items() if re.search(pat, comm, re.IGNORECASE)]
    return ", ".join(detected) if detected else ""

df['Entidad_Mencionada'] = df['Comentario_Limpio'].apply(detect_entities)

# 3. Guardar el archivo limpio en la raíz
df.to_csv('../comentarios_premier_final.csv', index=False, encoding='utf-8-sig')
print("✅ Base procesada y exportada con éxito.")
