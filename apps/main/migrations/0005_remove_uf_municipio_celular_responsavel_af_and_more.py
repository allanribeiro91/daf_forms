# Generated by Django 5.0.3 on 2024-03-26 12:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("main", "0004_uf_municipio_celular_responsavel_af_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="uf_municipio",
            name="celular_responsavel_af",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="celular_responsavel_ins",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="celular_secretario",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="data_registro",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="email_responsavel_af",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="email_responsavel_ins",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="email_secretario",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="nome_responsavel_af",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="nome_responsavel_ins",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="nome_secretario",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="observacoes",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="telefone_responsavel_af",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="telefone_responsavel_ins",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="telefone_secretario",
        ),
        migrations.RemoveField(
            model_name="uf_municipio",
            name="verificacao_uf",
        ),
        migrations.DeleteModel(
            name="Equipamentos_mat",
        ),
    ]