from django.shortcuts import render
from apps.qualifarsus.models import Municipios_Elegiveis
from django.http import JsonResponse

def qualifarsus_inscricao(request):

    lista_ufs = Municipios_Elegiveis.objects.values_list('uf', flat=True).distinct().order_by('uf')

    conteudo = {
        'lista_ufs': lista_ufs,
    }
    return render(request, 'qualifarsus/inscricao.html', conteudo)

def qualifarsus_buscar_municipios(request, uf=None):
    lista_municipios = Municipios_Elegiveis.objects.filter(uf=uf).values_list('municipio', flat=True).order_by('municipio')
    municipios = list(lista_municipios.values('cod_ibge', 'municipio'))
    print(municipios)
    return JsonResponse({'municipios': municipios})


