export function initInscricao() {
    document.addEventListener("DOMContentLoaded", function () {
    
        //Máscaras
            //Telefone
            $('#telefoneSecretario').mask('(00) 0000-0000');
            $('#telefoneAssistenciaDaf').mask('(00) 0000-0000');
            $('#telefoneResp').mask('(00) 0000-0000');

            //Celular
            $('#celularSecretario').mask('(00) 0 0000-0000');
            $('#celularAssistenciaDaf').mask('(00) 0 0000-0000');
            $('#celularResp').mask('(00) 0 0000-0000');

            //unidade R$
            $('#valor_unitario').mask('R$ #.###.###,##', {reverse: true});
            $('#valor_total').mask('R$ #.###.###.###.###,##', {reverse: true});
            $('#quantidade').mask('#.###.###', {reverse: true});
            $('#valor_investimento').mask('#.###.###,##', {reverse: true});
            $('#totalDisponivel').mask('#.###.###,##', {reverse: true});

            
            function calcularValorTotal() {
                var quantidade = $('#quantidade').cleanVal(); 
                var valorUnitario = $('#valor_unitario').cleanVal() / 100; 
            
                var valorTotal = quantidade * valorUnitario;
            
                var valorTotalFormatado = valorTotal.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'});
            
                $('#valor_total').val(valorTotalFormatado); 
            }
            
            $('#quantidade, #valor_unitario').on('input change', function() {
                calcularValorTotal();
            });
            
        const uf = document.querySelector("#uf");
        const municipio = document.querySelector("#municipio");
        const cod_ibge = document.querySelector("#cod_ibge");
        const faixa_idhm_2010 = document.querySelector("#faixa_idhm_2010");
        const idhm_2010 = document.querySelector("#idhm_2010");
        const porte_populacional = document.querySelector("#porte_populacional");
        const valor_investimento = document.querySelector("#valor_investimento")
        const valor_disponivel = document.querySelector("#totalDisponivel")

        uf.addEventListener('change', function() {
            limparCamposFormulario();

            if (uf.value === '') {
                municipio.setAttribute('disabled', 'disabled');
                municipio.innerHTML = '<option value=""></option>'; 
            } else {
                municipio.removeAttribute('disabled');
                buscarMunicipios(uf.value, municipio);
            }
        });

        function limparCamposFormulario() {
            document.querySelector('#equipamento').value = '';
            document.querySelector('#valor_unitario').value = '';
            document.querySelector('#quantidade').value = '';
            document.querySelector('#valor_total').value = '';
            municipio.innerHTML = '<option value=""></option>';
            cod_ibge.value = '';
            faixa_idhm_2010.value = '';
            idhm_2010.value = '';
            porte_populacional.value = '';
            valor_investimento.textContent = 'R$ 0,00';
            valor_disponivel.textContent = 'R$ 0,00';
            carregarEquipamentos()
        }

        function carregarEquipamentos() {
            fetch(`/buscar_equipamentos/`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' }
            })
            .then(response => response.json())
            .then(data => {
                let selectEquipamento = document.getElementById('equipamento');
                selectEquipamento.innerHTML = '<option selected>Selecione um equipamento...</option>';
                data.equipamentos.forEach(equip => {
                    selectEquipamento.innerHTML += `<option value="${equip}">${equip}</option>`;
                });
            })
            .catch(error => console.error('Erro ao carregar equipamentos:', error));
        }

        function formatarValor(valor) {
            let numero = parseFloat(valor);
            let valorFormatado = numero.toFixed(2).replace('.', ',');
            valorFormatado = valorFormatado.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return `R$ ${valorFormatado}`;
        }
        

        function buscarMunicipios(uf, componente) {
            const tabelaTemLinhas = document.querySelector('#tabEquipamentos tbody').children.length > 0;
        
            if (tabelaTemLinhas) {

                Swal.fire({
                    title: 'Você tem certeza?',
                    text: "Isso vai limpar todos os itens adicionados na tabela e os campos do formulário!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, limpar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.querySelector('#tabEquipamentos tbody').innerHTML = '';
        
                        document.querySelectorAll('input, select').forEach(input => {
                            if (input.tagName === 'SELECT') {
                                input.selectedIndex = 0;
                            } else {
                                input.value = '';
                            }
                        });

                        const url = `/buscar-municipios-elegiveis/${uf}/`;
                        fetch(url)
                            .then(response => response.json())
                            .then(data => {
                                let municipios = data.municipios;
                                let options = '<option value=""></option>';
                                municipios.forEach(municipio => {
                                    options += `<option value="${municipio.cod_ibge}" data-faixaidhm="${municipio.faixa_idhm_2010}" data-idhm="${municipio.idhm_2010}" data-porte="${municipio.porte_populacional}" data-valorinvestimento="${municipio.valor_investimento}" data-totaldisponivel="${municipio.total_disponivel}">${municipio.municipio}</option>`;
                                });
                                $(componente).html(options);
                            })
                            .catch(error => console.error('Erro ao buscar dados do município:', error));
                    }
                });
            } else {
                const url = `/buscar-municipios-elegiveis/${uf}/`;
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        let municipios = data.municipios;
                        let options = '<option value=""></option>';
                        municipios.forEach(municipio => {
                            options += `<option value="${municipio.cod_ibge}" data-faixaidhm="${municipio.faixa_idhm_2010}" data-idhm="${municipio.idhm_2010}" data-porte="${municipio.porte_populacional}" data-valorinvestimento="${municipio.valor_investimento}" data-totaldisponivel="${municipio.total_disponivel}">${municipio.municipio}</option>`;
                        });
                        $(componente).html(options);
                    })
                    .catch(error => console.error('Erro ao buscar dados do município:', error));
            }
        }
        
        let valorAnteriorMunicipio = municipio.value;

        municipio.addEventListener('focus', function() {
            valorAnteriorMunicipio = municipio.value;
        });

        municipio.addEventListener('change', function() {
            const tabelaTemLinhas = document.querySelector('#tabEquipamentos tbody').children.length > 0;
        
            if (tabelaTemLinhas) {
                Swal.fire({
                    title: 'Você tem certeza?',
                    text: "Isso vai limpar todos os itens adicionados na tabela!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, limpar!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        document.querySelector('#tabEquipamentos tbody').innerHTML = '';
                        limparCamposFormulario();
                        document.querySelectorAll('input, select').forEach(input => {
                            if (input.tagName === 'SELECT') {
                                input.selectedIndex = 0;
                            } else {
                                input.value = '';
                            }
                        });
                    }
                    municipio.value = valorAnteriorMunicipio;
                });
            } else {
                atualizarDadosMunicipio();
            }
        });
        
        function atualizarDadosMunicipio() {
            const selectedOption = municipio.options[municipio.selectedIndex];
            cod_ibge.value = selectedOption.value;
            faixa_idhm_2010.value = selectedOption.dataset.faixaidhm;
            idhm_2010.value = selectedOption.dataset.idhm;
            porte_populacional.value = selectedOption.dataset.porte;
            valor_investimento.textContent = formatarValor(selectedOption.dataset.valorinvestimento);
            valor_disponivel.textContent = formatarValor(selectedOption.dataset.valorinvestimento);
        }   

        (function () {
            'use strict'
          
            var forms = document.querySelectorAll('.formulario-dados')
    
            Array.prototype.slice.call(forms)
              .forEach(function (form) {
                form.addEventListener('submit', function (event) {
                  if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                  }
                  form.classList.add('was-validated')
                }, false)
              })
          })()
        
        $(document).ready(function() {
        $('#termosLink').click(function(event) {
            event.preventDefault(); 
            $('#modalTermosCondicoes').modal('show'); 
        });
        });

          document.getElementById('enviarInscricao').addEventListener('click', function() {
            var form = document.querySelector('.formulario-dados'); 
            if(form) {
                form.dispatchEvent(new Event('submit'));
            }
        });

          (function () {
              'use strict';
              window.addEventListener('load', function () {
                  var forms = document.getElementsByClassName('needs-validation');
                  Array.prototype.filter.call(forms, function (form) {
                      form.addEventListener('submit', function (event) {
                          event.preventDefault();
                          var valorInvestimento = document.getElementById('valor_investimento').innerText;
                          var totalDisponivel = document.getElementById('totalDisponivel').innerText;

                          if (valorInvestimento === totalDisponivel) {
                              Swal.fire({
                                  icon: 'error',
                                  title: 'Dados obrigatórios não preenchidos!',
                                  text: 'Será necessário o município inserir no mínimo 1 (um) material e/ou equipamento.',
                              });
                          } else if (form.checkValidity() === true) {
                              Swal.fire({
                                  title: 'Você tem certeza?',
                                  text: "O formulário só pode ser preenchido uma única vez por município. Tem certeza que deseja enviar?",
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: 'Sim, enviar!',
                                  cancelButtonText: 'Cancelar'
                              }).then((result) => {
                                  if (result.isConfirmed) {
                                      form.submit();
                                  }
                              });
                          }
                          form.classList.add('was-validated');
                      }, false);
                  });
              }, false);
          })();
      

    });
}










