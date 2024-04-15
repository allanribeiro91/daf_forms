from django.db import models
from django.utils import timezone


class Municipios_Elegiveis(models.Model):
    ano = models.IntegerField(null=False, blank=False)
    uf = models.CharField(max_length=20, null=False, blank=False)
    municipio = models.CharField(max_length=35, null=False, blank=False)
    cod_ibge = models.CharField(max_length=10, null=False, blank=False)
    populacao_censo = models.FloatField(null=False, blank=False)
    porte_populacional = models.CharField(max_length=20, null=False, blank=False)
    faixa_idhm_2010 = models.CharField(max_length=20, null=False, blank=False)
    idhm_2010 = models.DecimalField(
        max_digits=4, decimal_places=3, null=False, blank=False
    )
    valor_investimento = models.FloatField(null=False, blank=False)
    valor_custeio = models.FloatField(null=False, blank=False)
    indice_vulnerabilidade_social = models.CharField(
        max_length=20, null=False, blank=False
    )
    ivs = models.IntegerField(null=False, blank=False)


class Uf_municipiosPreenchidos(models.Model):
    verificacao_uf = models.BooleanField(default=False)
    data_registro = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    cod_ibge = models.CharField(max_length=10)
    nome_secretario = models.CharField(
        max_length=256, null=False, blank=False, default=False
    )
    email_secretario = models.CharField(
        max_length=256, null=False, blank=False, default=" "
    )
    telefone_secretario = models.CharField(max_length=14)
    celular_secretario = models.CharField(max_length=15)
    nome_responsavel_af = models.CharField(
        max_length=256, null=True, blank=True, default=False
    )
    email_responsavel_af = models.CharField(
        max_length=256, null=True, blank=True, default=" "
    )
    telefone_responsavel_af = models.CharField(max_length=14)
    celular_responsavel_af = models.CharField(
        max_length=15, null=True, blank=True, default=False
    )
    nome_responsavel_ins = models.CharField(
        max_length=256, default=False, null=False, blank=False
    )
    email_responsavel_ins = models.CharField(
        max_length=256, null=False, blank=False, default=" "
    )
    telefone_responsavel_ins = models.CharField(max_length=14)
    celular_responsavel_ins = models.CharField(max_length=15)
    observacoes = models.TextField(null=True, blank=True)


class EquipamentosMat(models.Model):
    List_equip = models.ForeignKey(Uf_municipiosPreenchidos, on_delete=models.CASCADE)
    equipamento_uf = models.CharField(max_length=560)
    valor_unitario_uf = models.DecimalField(max_digits=10, decimal_places=2)
    quantidade_uf = models.IntegerField(default=0)
    valor_total_uf = models.DecimalField(max_digits=10, decimal_places=2)
    
    
class Lista_itens_equipamentos(models.Model):
        Equipamento	= models.CharField(max_length=560)
        Atividade	= models.CharField(max_length=560)
        UnidadeFuncional_Unidade	= models.CharField(max_length=560)
        Ambiente	= models.CharField(max_length=560)
        Classificação= models.CharField(max_length=560)

