export function initEquipamentos() {
    document.addEventListener('DOMContentLoaded', function() {
        const addEquipamento = document.querySelector("#addEquipamento");
        const saveEquipamento = document.querySelector("#saveEquipamento");
        const modalEquipamentoElement = document.querySelector('#modalEquipamento');
        const modalEquipamento = new bootstrap.Modal(modalEquipamentoElement);
        const idEquipamentoInput = document.querySelector("#id_equipamento");
        const ufSelect = document.querySelector('#uf'); // Seletor de UF
        const tabela = document.getElementById('tabEquipamentos');

        //unidade R$
        $('#valor_unitario').mask('R$ #.###.###,##', {reverse: true});
        $('#valor_total').mask('R$ #.###.###.###.###,##', {reverse: true});
        $('#quantidade').mask('#.###.###', {reverse: true});
        $('#valor_investimento').mask('#.###.###,##', {reverse: true});
        $('#totalDisponivel').mask('#.###.###,##', {reverse: true});

        ufSelect.addEventListener('change', function() {
            document.querySelector('#equipamento').value = '';
            document.querySelector('#valor_unitario').value = '';
            document.querySelector('#quantidade').value = '';
            document.querySelector('#valor_total').value = '';
        });
        

        // document.addEventListener('change', function() {
        //     carregarEquipamentos();
        //     document.getElementById('equipamento').addEventListener('change', buscarAmbientes);
        // });
        
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
        
        function buscarAmbientes() {
            let equipamento = document.getElementById('equipamento').value;
            if (equipamento) {
                fetch(`/buscar_ambientes_por_equipamento/?equipamento=${encodeURIComponent(equipamento)}`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                })
                .then(response => response.json())
                .then(data => {
                    let selectAmbiente = document.getElementById('ambiente');
                    selectAmbiente.disabled = false;
                    selectAmbiente.innerHTML = '<option selected>Selecione um ambiente...</option>';
                    data.ambientes.forEach(amb => {
                        selectAmbiente.innerHTML += `<option value="${amb}">${amb}</option>`;
                    });
                })
                .catch(error => console.error('Erro ao buscar ambientes:', error));
            } else {
                document.getElementById('ambiente').disabled = true;
                document.getElementById('ambiente').innerHTML = '<option selected>Selecione um ambiente...</option>';
            }
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
        
        function buscarAmbientes() {
            let equipamento = document.getElementById('equipamento').value;
            if (equipamento) {
                fetch(`/buscar_ambientes_por_equipamento/?equipamento=${encodeURIComponent(equipamento)}`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' }
                })
                .then(response => response.json())
                .then(data => {
                    let selectAmbiente = document.getElementById('ambiente');
                    selectAmbiente.disabled = false;
                    selectAmbiente.innerHTML = '<option selected>Selecione um ambiente...</option>';
                    data.ambientes.forEach(amb => {
                        selectAmbiente.innerHTML += `<option value="${amb}">${amb}</option>`;
                    });
                })
                .catch(error => console.error('Erro ao buscar ambientes:', error));
            } else {
                document.getElementById('ambiente').disabled = true;
                document.getElementById('ambiente').innerHTML = '<option selected>Selecione um ambiente...</option>';
            }
        }
                
        addEquipamento.addEventListener('click', function() {
            const municipio = document.querySelector('#municipio').value.trim();
            const uf = document.querySelector('#uf').value.trim();

            if (!municipio || !uf) {
                Swal.fire({
                    icon: 'error',
                    title: 'Campos Obrigatórios',
                    text: 'Por favor, preencha os campos de Município e UF antes de adicionar um equipamento.'
                });
            } else {
                document.querySelector('#equipamento').value = '';
                document.querySelector('#valor_unitario').value = '';
                document.querySelector('#quantidade').value = '';
                document.querySelector('#valor_total').value = '';

                
                const itemCount = document.querySelectorAll('#tabEquipamentos tbody tr').length;
                const nextID = itemCount + 1; 

                document.querySelector('#id_equipamento').value = nextID;

                modalEquipamento.show();
            }
        });

        document.querySelector('#tabEquipamentos tbody').addEventListener('dblclick', function(event) {
            let clickedRow = event.target.closest('tr');
        
                let currentId = clickedRow.getAttribute('data-id');
                modalEquipamentoElement.setAttribute('data-current-id', currentId);
        
                let idEquipamentoInput = document.querySelector('#id_equipamento');
                let equipamentoInput = document.querySelector('#equipamento');
                let valorUnitarioInput = document.querySelector('#valor_unitario');
                let quantidadeInput = document.querySelector('#quantidade');
                let valorTotalInput = document.querySelector('#valor_total');
        
                idEquipamentoInput.value = clickedRow.querySelector('.td_id').textContent;
                equipamentoInput.value = clickedRow.querySelector('.td-equipamento').textContent;
                valorUnitarioInput.value = clickedRow.querySelector('.td-valor-unitario').textContent.trim().replace('R$', '');
                quantidadeInput.value = clickedRow.querySelector('.td-quantidade').textContent;
                valorTotalInput.value = clickedRow.querySelector('.td-valor-total').textContent;

                modalEquipamento.show()
        });      

        saveEquipamento.addEventListener('click', function() {
            let equipamentoNome = document.querySelector('#equipamento').value.trim();
            let valorUnitarioStr = document.querySelector('#valor_unitario').value.trim().replace(/\./g, '').replace(',', '.');
            let quantidadeStr = document.querySelector('#quantidade').value.trim().replace(/\./g, '');
            let valorTotalStr = document.querySelector('#valor_total').value.trim().replace('R$', '').replace(/\./g, '').replace(',', '.');
        
            let valorUnitario = parseFloat(valorUnitarioStr);
            let quantidade = parseInt(quantidadeStr, 10);
            let valorTotal = parseFloat(valorTotalStr);
            let valorDisponivel = parseFloat(document.querySelector("#totalDisponivel").textContent.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'));
        
            if (isNaN(valorUnitario) || isNaN(quantidade) || isNaN(valorTotal) || valorUnitario <= 0 || quantidade <= 0 || valorTotal <= 0) {
                Swal.fire({
                    icon: "error",
                    title: "Valores Inválidos",
                    text: "Por favor, insira números válidos e maiores que zero para Valor Unitário, Quantidade e Valor Total."
                }).then((result) => {
                    modalEquipamento.show();
                });
                return;
            }

            let currentId = modalEquipamentoElement.getAttribute('data-current-id');
        
            if (currentId) { 
                let linhaParaAtualizar = document.querySelector(`#tabEquipamentos tbody tr[data-id="${currentId}"]`);
                
                if (linhaParaAtualizar) {
                    let valorTotalAntigo = parseFloat(linhaParaAtualizar.querySelector('.td-valor-total').textContent.replace(/\./g, '').replace(',', '.').replace('R$', '').trim());

                    valorDisponivel += valorTotalAntigo;
        
                    if (valorTotal > valorDisponivel) { 
                        Swal.fire({
                            icon: "error",
                            title: "Valor Excedido",
                            text: "O valor total do item não pode exceder o valor disponível."
                        }).then((result) => {
                            modalEquipamento.show();
                        });
                        return;
                    }
        
                    linhaParaAtualizar.querySelector('.td-equipamento').textContent = equipamentoNome;
                    linhaParaAtualizar.querySelector('.td-valor-unitario').textContent = valorUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    linhaParaAtualizar.querySelector('.td-quantidade').textContent = quantidade.toLocaleString('pt-BR');
                    linhaParaAtualizar.querySelector('.td-valor-total').textContent = valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                    valorDisponivel -= valorTotal;

                    modalEquipamentoElement.removeAttribute('data-current-id');
                }
            } else { 
                if (valorTotal > valorDisponivel) { 
                    Swal.fire({
                        icon: "error",
                        title: "Valor Excedido",
                        text: "O valor total do item não pode exceder o valor disponível."
                    }).then((result) => {
                        modalEquipamento.show();
                    });
                    return;
                }
        
                let itemCount = document.querySelectorAll('#tabEquipamentos tbody tr').length;
                let nextID = itemCount + 1;
        
                let newRow = `
                <tr data-id="${nextID}">
                    <td class="td_id">${nextID}</td>
                    <td class="td-equipamento">${equipamentoNome}</td>
                    <td class="td-valor-unitario">${valorUnitario.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td class="td-quantidade">${quantidade.toLocaleString('pt-BR')}</td>
                    <td class="td-valor-total">${valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                    <td><button type="button" class="btn btn-excluir btn-outline-danger btn-sm"><i class="bi bi-trash"></i> Remover</button></td>
                </tr>
                `;
                document.querySelector('#tabEquipamentos tbody').insertAdjacentHTML('beforeend', newRow);
                valorDisponivel -= valorTotal;
            }

            document.querySelector("#totalDisponivel").textContent = valorDisponivel.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        
            document.querySelector('#equipamento').value = '';
            document.querySelector('#valor_unitario').value = '';
            document.querySelector('#quantidade').value = '';
            document.querySelector('#valor_total').value = '';
        
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Equipamento adicionado com sucesso!',
                showConfirmButton: false,
                timer: 1500
            });
        });     
        
        tabela.addEventListener('click', function(e) {
            if (e.target && e.target.matches('.btn-excluir')) {
                const linha = e.target.closest('tr');
                const linhaIdParaExcluir = linha.dataset.id; 
        
                Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você não poderá reverter essa exclusão!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, excluir!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        linha.remove(); 
                        atualizarTabela(); 
        
                        Swal.fire(
                            'Excluído!',
                            'O equipamento foi excluído!',
                            'success'
                        );
                    }
                });
            }
        });
        
        document.querySelector('#deleteEquipamento').addEventListener('click', function() {
            const linhaIdParaExcluir = modalEquipamentoElement.getAttribute('data-current-id');
        
            if (linhaIdParaExcluir) {
                Swal.fire({
                    title: 'Tem certeza?',
                    text: "Você não poderá reverter essa ação!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, excluir!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        const linhaParaExcluir = document.querySelector(`tr[data-id="${linhaIdParaExcluir}"]`);
                        if (linhaParaExcluir) {
                            linhaParaExcluir.remove();
                            atualizarTabela(); 
                            modalEquipamentoElement.removeAttribute('data-current-id');
        
                            Swal.fire(
                                'Excluído!',
                                'O equipamento foi excluído!',
                                'success'
                            );
                        }
                    } else {
                        modalEquipamento.show();
                    }
                });
            } else {
                console.error('Nenhuma linha foi selecionada para exclusão.');
            }
        });
        
        function atualizarTabela() {
            let totalGeral = 0;
            const linhas = tabela.querySelectorAll('tbody tr');
        
            linhas.forEach((linha, index) => {
                const novoId = index + 1;
                linha.dataset.id = novoId;
                linha.querySelector('.td_id').textContent = novoId;

                const valorTotal = parseFloat(linha.querySelector('.td-valor-total').textContent.replace(/R\$\s?/, '').replace(/\./g, '').replace(',', '.'));
                totalGeral += valorTotal; 
            });
            
        console.log('Valor total tabela: ', totalGeral)
            if (isNaN(totalGeral) || totalGeral <= 0) {
                totalGeral = 0;
            }
        
            const valorInvestimentoTexto = parseFloat(document.querySelector("#valor_investimento").textContent.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'));
            const valorInvestimento = parseFloat(valorInvestimentoTexto);
            
            let valorDisponivel;
            if (isNaN(valorInvestimento) || valorInvestimento <= 0) {
                valorDisponivel = 0; 
            } else {
                valorDisponivel = valorInvestimento - totalGeral;
            }
        
            document.getElementById('totalDisponivel').textContent = `R$ ${valorDisponivel.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }
             
        
    }); 
}
