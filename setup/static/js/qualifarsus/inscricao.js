export function initInscricao() {
    document.addEventListener("DOMContentLoaded", function () {
    
        //Máscaras
        $('#telefoneSecretario').mask('(00) 0000-0000');
        $('#celularSecretario').mask('(00) 0 0000-0000');


        const uf = document.querySelector("#uf")
        const municipio = document.querySelector("#municipio")
        uf.addEventListener('change', function() {
    
            if (uf.value == ''){
                municipio.setAttribute('disabled', 'disabled')
                municipio.value = ''
            } else {
                municipio.removeAttribute('disabled')
                buscarMunicipios(uf.value, municipio)
            }
    
        })
    
    
        function buscarMunicipios(uf, componente) {
            const url = `/buscar-municipios-elegiveis/${uf}/`;
    
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    var municipios = data.municipios;
                    var options = '<option value=""></option>';  // Opção padrão
                    for (var i = 0; i < municipios.length; i++) {
                        options += '<option value="' + municipios[i].cod_ibge + '">' + municipios[i].municipio + '</option>';
                    }
                    $(componente).html(options);
    
                })
                .catch(error => console.error('Erro ao buscar dados do município:', error));
        }
    
        const cod_ibge = document.querySelector("#cod_ibge")
        municipio.addEventListener('change', function() {
            cod_ibge.value = municipio.value
        })
    
    });
}