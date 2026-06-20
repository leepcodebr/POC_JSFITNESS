/**
 * JS Fitness - Script Principal
 * Inclui: Lógica de Segurança (Screen Policy) e Funcionalidades da UI
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       LÓGICA DE SEGURANÇA (SCREEN POLICY)
       ========================================================================== */

    // 1. Bloqueia o clique com o Botão Direito (Menu de contexto)
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    });

    // 2. Funções de Ativação do Blackout
    function applySecurityBlur() {
        document.body.classList.add('is-secured');
    }

    function removeSecurityBlur() {
        document.body.classList.remove('is-secured');
    }

    // GATILHO 1: Oculta a página se o rato sair da área de renderização (Mouseleave)
    document.documentElement.addEventListener('mouseleave', applySecurityBlur);
    document.documentElement.addEventListener('mouseenter', removeSecurityBlur);

    // GATILHO 2: Se a janela perder o foco (Alt+Tab, clicar no menu iniciar, etc)
    window.addEventListener('blur', applySecurityBlur);
    window.addEventListener('focus', removeSecurityBlur);
    
    // GATILHO 3: API de Visibilidade (Garante proteção caso o utilizador troque de aba no navegador)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            applySecurityBlur();
        } else {
            removeSecurityBlur();
        }
    });
    
    // GATILHO 4: Escuta do Teclado (Interceção de Atalhos)
    document.addEventListener('keydown', function(event) {
        // Tecla física Print Screen
        if (event.key === 'PrintScreen' || event.keyCode === 44) {
            applySecurityBlur();
        }
        
        // Atalhos de programador e ferramentas de extração
        if (event.keyCode === 123 || // F12
           (event.ctrlKey && event.shiftKey && event.keyCode === 73) || // Ctrl+Shift+I (Inspecionar)
           (event.ctrlKey && event.shiftKey && event.keyCode === 74) || // Ctrl+Shift+J (Consola)
           (event.ctrlKey && event.keyCode === 85) || // Ctrl+U (Ver Código Fonte)
           (event.ctrlKey && event.keyCode === 67) || // Ctrl+C (Copiar)
           (event.ctrlKey && event.keyCode === 80)) { // Ctrl+P (Imprimir)
            event.preventDefault(); 
            return false;
        }

        // Bloqueio de Atalhos de Captura Nativa (Win+Shift+S / Ctrl+Shift+S / Cmd+Shift+S)
        if (event.shiftKey && (event.key === 's' || event.key === 'S' || event.keyCode === 83)) {
            if (event.metaKey || event.ctrlKey) {
                applySecurityBlur();
                event.preventDefault(); 
                return false;
            }
        }
    });

    // Remove o blackout instantes após a tecla Print Screen ser solta
    document.addEventListener('keyup', function(event) {
        if (event.key === 'PrintScreen' || event.keyCode === 44) {
            setTimeout(removeSecurityBlur, 1500); // 1.5 segundos de punição visual
        }
    });


    /* ==========================================================================
       LÓGICA DE INTERFACE (LOGIN)
       ========================================================================== */
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Impede o envio real do formulário

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const loginBtn = document.getElementById('loginBtn');
            const btnText = document.getElementById('btnText');
            const btnIcon = document.getElementById('btnIcon');

            // Simular estado de carregamento imediatamente, sem validação
            btnText.textContent = 'Autenticando...';
            btnIcon.classList.remove('ph-sign-in');
            btnIcon.classList.add('ph-spinner', 'ph-spin'); // Ícone de loading do Phosphor
            loginBtn.disabled = true;

            // Redireciona após simulação
            setTimeout(() => {
                window.location.href = 'treino.html';
            }, 1000);
        });

        // Remover feedback de erro ao digitar
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('is-invalid');
            });
        });
    }

    /* ==========================================================================
       LÓGICA DE INTERFACE (DASHBOARD)
       ========================================================================== */
    const alunosTableBody = document.getElementById('alunosTableBody');

    if (alunosTableBody) {
        // Mockup de Dados
        const alunos = [
            { id: 1, nome: 'Carlos Silva', plano: 'Anual Premium', status: 'Ativo' },
            { id: 2, nome: 'Mariana Costa', plano: 'Mensal Básico', status: 'Ativo' },
            { id: 3, nome: 'Roberto Alves', plano: 'Semestral Plus', status: 'Inativo' },
            { id: 4, nome: 'Fernanda Lima', plano: 'Anual Premium', status: 'Ativo' },
            { id: 5, nome: 'João Souza', plano: 'Mensal Básico', status: 'Ativo' }
        ];

        // Função para renderizar a tabela
        function renderTable() {
            alunosTableBody.innerHTML = '';
            alunos.forEach(aluno => {
                const statusClass = aluno.status === 'Ativo' ? 'status-active' : 'status-inactive';
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td class="fw-medium">${aluno.nome}</td>
                    <td class="text-secondary">${aluno.plano}</td>
                    <td><span class="status-badge ${statusClass}">${aluno.status}</span></td>
                    <td>
                        <button class="btn-icon-only me-2" title="Editar">
                            <i class="ph ph-pencil-simple"></i>
                        </button>
                        <button class="btn-icon-only btn-icon-danger btn-delete" data-id="${aluno.id}" title="Excluir">
                            <i class="ph ph-trash"></i>
                        </button>
                    </td>
                `;
                alunosTableBody.appendChild(tr);
            });

            // Adicionar evento aos botões de excluir
            document.querySelectorAll('.btn-delete').forEach(btn => {
                btn.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    if (confirm(`Deseja realmente excluir o aluno ID: ${id}?`)) {
                        this.closest('tr').remove();
                        // Aqui poderia haver a lógica para remover do array original
                    }
                });
            });
        }

        // Ação do Botão Novo Aluno (Removido do mobile)
        const novoAlunoBtn = document.getElementById('novoAlunoBtn');
        if (novoAlunoBtn) {
            novoAlunoBtn.addEventListener('click', () => {
                const novoNome = prompt("Digite o nome do novo aluno:");
                if (novoNome) {
                    alunos.unshift({
                        id: alunos.length + 1,
                        nome: novoNome,
                        plano: 'Mensal Básico',
                        status: 'Ativo'
                    });
                    renderTable();
                }
            });
        }
    }

    /* ==========================================================================
       LÓGICA DE INTERFACE (TREINOS - MOBILE)
       ========================================================================== */
    const treinoSelect = document.getElementById('treinoSelect');
    if (treinoSelect) {
        treinoSelect.addEventListener('change', function() {
            // Esconde todas as abas
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('show', 'active');
            });
            // Mostra a aba selecionada
            const targetId = this.value;
            const targetPane = document.getElementById(targetId);
            if (targetPane) {
                targetPane.classList.add('show', 'active');
            }
        });
    }

    /* ==========================================================================
       LÓGICA DE INTERFACE (AVALIAÇÃO - MOBILE)
       ========================================================================== */
    const evalWeight = document.getElementById('evalWeight');
    const evalHeight = document.getElementById('evalHeight');
    const imcDisplay = document.getElementById('imcDisplay');
    const imcStatus = document.getElementById('imcStatus');
    const btnEditarAvaliacao = document.getElementById('btnEditarAvaliacao');
    const btnSalvarAvaliacao = document.getElementById('btnSalvarAvaliacao');
    const evalInputs = document.querySelectorAll('.eval-input');

    function calcularIMC() {
        if (!evalWeight || !evalHeight || !imcDisplay || !imcStatus) return;

        const peso = parseFloat(evalWeight.value);
        const altura = parseFloat(evalHeight.value);

        if (peso > 0 && altura > 0) {
            const imc = (peso / (altura * altura)).toFixed(1);
            imcDisplay.textContent = `IMC: ${imc}`;

            // Define status e cores
            imcStatus.classList.remove('text-success', 'text-warning', 'text-danger');
            
            if (imc < 18.5) {
                imcStatus.textContent = 'Abaixo do Peso';
                imcStatus.classList.add('text-warning');
            } else if (imc < 25) {
                imcStatus.textContent = 'Peso Normal';
                imcStatus.classList.add('text-success');
            } else if (imc < 30) {
                imcStatus.textContent = 'Sobrepeso';
                imcStatus.classList.add('text-warning');
            } else {
                imcStatus.textContent = 'Obesidade';
                imcStatus.classList.add('text-danger');
            }
        }
    }

    if (evalWeight && evalHeight) {
        evalWeight.addEventListener('input', calcularIMC);
        evalHeight.addEventListener('input', calcularIMC);
    }

    if (btnEditarAvaliacao) {
        btnEditarAvaliacao.addEventListener('click', function() {
            // Remove readonly de todos os inputs
            evalInputs.forEach(input => input.removeAttribute('readonly'));
            
            // Troca os botões
            this.classList.add('d-none');
            if (btnSalvarAvaliacao) {
                btnSalvarAvaliacao.classList.remove('d-none');
            }
            
            // Foca no peso
            if (evalWeight) evalWeight.focus();
        });
    }

    if (btnSalvarAvaliacao) {
        btnSalvarAvaliacao.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="ph-spinner ph-spin me-2"></i> Salvando...';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = '<i class="ph ph-check-circle me-2"></i> Salvo com sucesso!';
                this.classList.replace('btn-primary', 'btn-success');
                
                // Atualiza a data para a data atual
                const dataAvaliacao = document.getElementById('dataAvaliacao');
                if (dataAvaliacao) {
                    const hoje = new Date();
                    const opcoesData = { day: 'numeric', month: 'long', year: 'numeric' };
                    // Exemplo: 20 de Junho de 2026
                    dataAvaliacao.textContent = 'Última avaliação: ' + hoje.toLocaleDateString('pt-BR', opcoesData);
                }

                // Retorna ao estado de leitura
                evalInputs.forEach(input => input.setAttribute('readonly', true));

                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.replace('btn-success', 'btn-primary');
                    this.disabled = false;
                    
                    // Troca os botões de volta
                    this.classList.add('d-none');
                    if (btnEditarAvaliacao) {
                        btnEditarAvaliacao.classList.remove('d-none');
                    }
                }, 2000);
            }, 800);
        });
    }

});
