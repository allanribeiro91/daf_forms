# Generated by Django 5.0.3 on 2024-03-13 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UF_Municipio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cod_ibge', models.CharField(max_length=10)),
                ('uf_sigla', models.CharField(max_length=2)),
                ('uf', models.CharField(max_length=20)),
                ('municipio', models.CharField(max_length=35)),
                ('municipio_uf', models.CharField(max_length=40)),
            ],
        ),
    ]