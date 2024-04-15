from django.urls import path
from apps.qualifarsus.views import (
    qualifarsus_inscricao,
    qualifarsus_buscar_municipios,
    qualifarsus_buscar_intens_af,
    buscar_equipamentos, 
    buscar_ambientes_por_equipamento  
)

urlpatterns = [
    path("", qualifarsus_inscricao, name="qualifarsus_inscricao"),
    path("qualifarsus/inscricao/", qualifarsus_inscricao, name="qualifarsus_inscricao"),
    path("buscar-municipios-elegiveis/<str:uf>/", qualifarsus_buscar_municipios, name="qualifarsus_buscar_municipios"),
    path('qualifarsus/intens/', qualifarsus_buscar_intens_af, name='qualifarsus_buscar_intens'),
    path('buscar_equipamentos/', buscar_equipamentos, name='buscar_equipamentos'), 
    path('buscar_ambientes_por_equipamento/', buscar_ambientes_por_equipamento, name='buscar_ambientes_por_equipamento')  
]

