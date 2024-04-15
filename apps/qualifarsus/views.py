from django.shortcuts import render
from apps.qualifarsus.models import Municipios_Elegiveis, Lista_itens_equipamentos
from django.http import JsonResponse
import json

def qualifarsus_inscricao(request):
    lista_ufs = Municipios_Elegiveis.objects.values_list('uf', flat=True).distinct().order_by('uf')
    conteudo = {'lista_ufs': lista_ufs}
    return render(request, 'qualifarsus/inscricao.html', conteudo)

def qualifarsus_buscar_municipios(request, uf=None):
    municipios = Municipios_Elegiveis.objects.filter(uf=uf).values('cod_ibge', 'municipio', 'faixa_idhm_2010', 'idhm_2010', 'porte_populacional', 'valor_investimento').order_by('municipio')
    return JsonResponse({'municipios': list(municipios)})

def buscar_equipamentos(request):
    if request.headers.get('x-requested-with') == 'XMLHttpRequest':
        equipamentos = Lista_itens_equipamentos.objects.values('Equipamento').distinct()
        equipamentos_lista = [equip['Equipamento'] for equip in equipamentos]
        return JsonResponse({'equipamentos': equipamentos_lista})

def buscar_ambientes_por_equipamento(request):
    equipamento = request.GET.get('equipamento')
    if equipamento:
        ambientes = Lista_itens_equipamentos.objects.filter(Equipamento=equipamento).values('Ambiente').distinct()
        ambientes_lista = [amb['Ambiente'] for amb in ambientes]
        return JsonResponse({'ambientes': ambientes_lista})
    else:
        return JsonResponse({'error': 'Equipamento não especificado'}, status=400)

def qualifarsus_buscar_intens_af(request):
    equipamento = request.GET.get('equipamento')
    if equipamento:
        itens = Lista_itens_equipamentos.objects.filter(equipamento=equipamento).values(
            'equipamento', 'ambiente', 'atividade', 'classificacao', 'unidade_funcional'
        )
        lista_itens = list(itens)
        if lista_itens:
            return JsonResponse(lista_itens, safe=False)
        else:
            return JsonResponse({'error': 'Nenhum item encontrado para o equipamento especificado.'}, status=404)
    else:
        return JsonResponse({'error': 'O parâmetro de equipamento é necessário para a busca.'}, status=400)
