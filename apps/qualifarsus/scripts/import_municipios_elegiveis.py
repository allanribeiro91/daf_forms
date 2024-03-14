import openpyxl
from django.utils import timezone
from apps.qualifarsus.models import Municipios_Elegiveis

def import_from_excel(file_path):
    workbook = openpyxl.load_workbook(file_path)
    sheet = workbook.active

    for row in sheet.iter_rows(min_row=2, values_only=True): 
        municipios = Municipios_Elegiveis()
        municipios.ano = row[0]
        municipios.uf = row[1]
        municipios.municipio = row[2]
        municipios.cod_ibge = row[3]
        municipios.populacao_censo = row[4]
        municipios.porte_populacional = row[5]
        municipios.faixa_idhm_2010 = row[6]
        municipios.idhm_2010 = row[7]
        municipios.valor_investimento = row[8]
        municipios.valor_custeio = row[9]
        municipios.indice_vulnerabilidade_social = row[10]
        municipios.ivs = row[11]
        municipios.save()

def run():
    # Caminho do arquivo que você quer importar
    #file_path = r"C:\Users\alan.ribeiro\Desktop\SisDAF\dados\lista_uf_municipio.xlsx"
    file_path = 'dados/municipios_elegiveis2.xlsx'
    import_from_excel(file_path)


#python manage.py runscript apps.qualifarsus.scripts.import_municipios_elegiveis