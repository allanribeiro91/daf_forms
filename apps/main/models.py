from django.db import models


class UF_Municipio(models.Model):
    cod_ibge = models.CharField(max_length=10)
    uf_sigla = models.CharField(max_length=2)
    uf = models.CharField(max_length=20)
    municipio = models.CharField(max_length=35)
    municipio_uf = models.CharField(max_length=40)
    
