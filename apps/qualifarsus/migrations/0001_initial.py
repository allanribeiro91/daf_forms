# Generated by Django 5.0.3 on 2024-03-13 00:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Municipios_Elegiveis",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("ano", models.IntegerField()),
                ("uf", models.CharField(max_length=20)),
                ("municipio", models.CharField(max_length=35)),
                ("cod_ibge", models.CharField(max_length=10)),
                ("populacao_censo", models.FloatField()),
                ("porte_populacional", models.CharField(max_length=20)),
                ("faixa_idhm_2010", models.CharField(max_length=20)),
                ("idhm_2010", models.DecimalField(decimal_places=3, max_digits=4)),
                ("valor_investimento", models.FloatField()),
                ("valor_custeio", models.FloatField()),
                ("indice_vulnerabilidade_social", models.CharField(max_length=20)),
                ("ivs", models.IntegerField()),
            ],
        ),
    ]
