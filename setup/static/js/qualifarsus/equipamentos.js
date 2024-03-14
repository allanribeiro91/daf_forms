// especialidades.js
export function initEquipamentos() {
    document.addEventListener('DOMContentLoaded', function() {

        const addEquipamento = document.querySelector("#addEquipamento");
        const modalEquipamento = new bootstrap.Modal(document.querySelector('#modalEquipamento'));

        addEquipamento.addEventListener('click', function() {
            modalEquipamento.show();
        });

    });
}