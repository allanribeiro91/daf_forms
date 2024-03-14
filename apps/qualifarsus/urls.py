from django.urls import path
from apps.qualifarsus.views import qualifarsus_inscricao, qualifarsus_buscar_municipios

urlpatterns = [
    path('', qualifarsus_inscricao, name='qualifarsus_inscricao'),
    path('qualifarsus/inscricao/', qualifarsus_inscricao, name='qualifarsus_inscricao'),
    path('buscar-municipios-elegiveis/<str:uf>/', qualifarsus_buscar_municipios, name='qualifarsus_buscar_municipios')
]