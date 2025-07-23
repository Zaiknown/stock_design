// static/js/terminal_game.js

document.addEventListener('DOMContentLoaded', () => {
    const terminalContainer = document.getElementById('terminal-container');
    const output = document.getElementById('terminal-output');
    const input = document.getElementById('terminal-input');
    const closeButton = document.getElementById('close-terminal');

    // --- NOVA ESTRUTURA DE COMANDOS ---
    const commands = {
        help: {
            description: 'Mostra esta ajuda com todos os comandos.',
            execute: (print) => {
                let helpText = 'Comandos disponíveis:<br><br>';
                // Alinha os comandos de forma organizada
                for (const cmd in commands) {
                    // Adiciona a descrição formatada
                    helpText += `[${cmd}] - ${commands[cmd].description}<br>`;
                }
                print(helpText);
            }
        },
        skills: {
            description: 'Lista minhas competências técnicas.',
            execute: (print) => print('Python, Django, JavaScript, HTML5, CSS3, SQL, MySQL, Git, REST APIs')
        },
        education: {
            description: 'Exibe minha formação acadêmica.',
            execute: (print) => print('Técnico em Informática (IFCE, 2025) <br> Análise e Desenvolvimento de Sistemas (IFCE, Cursando)')
        },
        social: {
            description: 'Mostra meus links para contato e redes.',
            execute: (print) => print('GitHub: <a href="https://github.com/Zaiknown" target="_blank">Zaiknown</a> <br> LinkedIn: <a href="https://www.linkedin.com/in/matheus-zaino-94947234b/" target="_blank">Matheus Zaino</a>')
        },
        snake: {
            description: 'Inicia o jogo da cobrinha.',
            execute: () => launchSnakeGame()
        },
        rainbow: {
            description: 'Ativa o modo de cores psicodélico.',
            execute: (print) => {
                output.classList.add('rainbow-text');
                input.classList.add('rainbow-text');
                print("Modo RAINBOW ativado! ✨ Digite 'default' para voltar ao normal.");
            }
        },
        default: {
            description: 'Restaura a cor verde padrão do terminal.',
            execute: (print) => {
                output.classList.remove('rainbow-text');
                input.classList.remove('rainbow-text');
                print("Estilo padrão restaurado.");
            }
        },
        clear: {
            description: 'Limpa a tela do terminal.',
            execute: () => clearTerminal()
        },
        exit: {
            description: 'Fecha a janela do terminal.',
            execute: () => closeTerminal()
        }
    };

    // --- LÓGICA DE EXECUÇÃO ATUALIZADA ---
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const commandName = input.value.trim().toLowerCase();
            if (commandName) {
                printToTerminal(`<span class="prompt">$</span> ${commandName}`);
                
                const command = commands[commandName];
                if (command) {
                    // Executa a função 'execute' do comando
                    command.execute(printToTerminal);
                } else {
                    printToTerminal(`Comando não encontrado: ${commandName}. Digite 'help'.`);
                }
                input.value = '';
            }
        }
    });
    
    // --- O RESTO DO CÓDIGO (LÓGICA DO KONAMI, FUNÇÕES AUXILIARES) CONTINUA IGUAL ---
    
    const konamiCodeSequence = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        if (terminalContainer.classList.contains('hidden')) {
            if (e.key.toLowerCase() === konamiCodeSequence[konamiIndex].toLowerCase()) {
                e.preventDefault();
                konamiIndex++;
                if (konamiIndex === konamiCodeSequence.length) {
                    initTerminal();
                    konamiIndex = 0;
                }
            } else { konamiIndex = 0; }
        }
    });

    function initTerminal() {
        terminalContainer.classList.remove('hidden');
        if (output.innerHTML === '') {
            printToTerminal("Bem-vindo ao meu terminal! Digite 'help' para ver os comandos.");
        }
        input.focus();
    }
    
    function launchSnakeGame() {
        closeTerminal();
        if (window.startSnakeGame) { window.startSnakeGame(); } 
        else { console.error("Função startSnakeGame() não encontrada!"); }
    }

    function closeTerminal() { terminalContainer.classList.add('hidden'); }
    function clearTerminal() { output.innerHTML = ''; }
    function printToTerminal(text) {
        output.innerHTML += `<div>${text}</div>`;
        output.parentElement.scrollTop = output.parentElement.scrollHeight;
    }

    closeButton.addEventListener('click', closeTerminal);
});