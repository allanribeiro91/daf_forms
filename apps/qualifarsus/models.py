from django.db import models

class Municipios_Elegiveis(models.Model):
    ano = models.IntegerField(null=False, blank=False)
    uf = models.CharField(max_length=20, null=False, blank=False)
    municipio = models.CharField(max_length=35, null=False, blank=False)
    cod_ibge = models.CharField(max_length=10, null=False, blank=False)
    populacao_censo = models.FloatField(null=False, blank=False)
    porte_populacional  = models.CharField(max_length=20, null=False, blank=False)
    faixa_idhm_2010 = models.CharField(max_length=20, null=False, blank=False)
    idhm_2010 = models.DecimalField(max_digits=4, decimal_places=3, null=False, blank=False)
    valor_investimento = models.FloatField(null=False, blank=False)
    valor_custeio = models.FloatField(null=False, blank=False)
    indice_vulnerabilidade_social = models.CharField(max_length=20, null=False, blank=False)
    ivs = models.IntegerField(null=False, blank=False)

