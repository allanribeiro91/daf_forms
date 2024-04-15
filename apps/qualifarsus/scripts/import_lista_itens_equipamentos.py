import openpyxl
from apps.qualifarsus.models import Lista_itens_equipamentos

def import_from_excel(file_path):
    workbook = openpyxl.load_workbook(file_path)
    sheet = workbook.active

    for row in sheet.iter_rows(min_row=2, values_only=True):
        equipamento, atividade, unidade_funcional_unidade, ambiente, classificacao = row

        lista_equipamento = Lista_itens_equipamentos(
            Equipamento=equipamento,
            Atividade=atividade,
            UnidadeFuncional_Unidade=unidade_funcional_unidade,
            Ambiente=ambiente,
            Classificação=classificacao
        )
        lista_equipamento.save()

def run():
    # Caminho do arquivo que você quer importar
    file_path = "dados/lista_itens_af.xlsx"
    import_from_excel(file_path)

# python manage.py runscript apps\qualifarsus\scripts\import_lista_itens_equipamentos.py