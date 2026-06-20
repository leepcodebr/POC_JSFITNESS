# Escopo do Projeto: JS Fitness App (Versão Aluno)

## 1. Objetivo Principal
Aplicativo **Mobile-First** voltado para os **alunos** da academia JS Fitness. O objetivo central é fornecer autonomia ao aluno para acompanhar suas fichas de treino, entender a execução correta dos exercícios e registrar sua evolução física.

## 2. Contexto e Plataforma
*   **Público-Alvo:** Alunos da academia.
*   **Formato:** Aplicação Web desenhada exclusivamente para telas de smartphones (Mobile).
*   **Visualização Desktop:** Quando acessado via navegador em computador, a interface deve ser restrita a um contêiner centralizado que simule as dimensões de uma tela de celular, garantindo a fidelidade da experiência mobile.

## 3. Principais Telas e Fluxos

### 3.1. Tela Inicial / Ficha de Treino
A tela principal do aluno após o login.
*   **Conteúdo:** Exibe a rotina (ficha) de treino do dia ou as rotinas disponíveis.
*   **Lista de Exercícios:** Cada item da ficha deve listar claramente o nome do exercício e a métrica de execução (ex: "3 séries de 8 a 12 repetições").
*   **Interação:** Clicar em qualquer exercício da lista redireciona o usuário para a tela de "Detalhes do Exercício".

### 3.2. Tela de Detalhes do Exercício
Focada em garantir que o aluno execute o movimento com segurança e precisão.
*   **Conteúdo:** Nome do exercício, grupamento muscular alvo, instruções textuais (passo a passo) e a especificação da série/carga.
*   **Mídia (Vídeo):** Inclusão obrigatória de um player de vídeo demonstrando a execução correta daquele movimento.

### 3.3. Tela de Avaliação Física
Espaço dedicado ao acompanhamento de métricas corporais do aluno ao longo do tempo.
*   **Dados Básicos:** Peso (kg) e Altura (cm).
*   **Perimetria:** Medidas de circunferências corporais (ex: braço, abdômen, coxa, panturrilha).
*   **Histórico:** Possibilidade de visualizar a evolução dessas métricas (a definir para versões futuras).

## 4. Diretrizes Técnicas e de Design
*   **Identidade Visual:** Mantém-se o padrão premium estabelecido (Dark mode profundo com contrastes em Amarelo Ouro/Vibrante).
*   **Segurança (Screen Policy):** O app implementa medidas de segurança client-side contra printscreens e cópia de conteúdo.
*   **UI/UX:** Componentes projetados especificamente para o toque (touch-friendly), como botões largos, listas espaçadas, e uso da biblioteca Phosphor Icons. Uso rigoroso do HTML semântico.
