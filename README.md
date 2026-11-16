# Metallum — Site Institucional (HTML, CSS e JavaScript)

Site institucional da **Metallum Indústria Metalmecânica**, com direção visual industrial e cinematográfica.
Arquitetura moderna e direta baseada em **HTML5 Semântico, CSS3 e JavaScript modular**.

Esta versão usa **conteúdo e imagens demonstrativos**, com dados e textos centralizados para edição em [js/data.js](js/data.js).

---

## 🛠️ Stack & Tecnologias

- **HTML5**: Semântico, acessível (WAI-ARIA), otimizado para SEO e performance.
- **CSS3 Moderno**: Design tokens (`--color-*`), tipografia responsiva com `clamp()`, malha técnica industrial (`tech-grid`), texturas de grão e transições aceleradas por hardware.
- **JavaScript (ES Modules)**: Modular, limpo e de alta performance.
- **GSAP 3 + ScrollTrigger + SplitText**: Animações de entrada, revelações no scroll, linha de processo, pinning e scrub cinematográfico.
- **Lenis**: Scroll suave perfeitamente sincronizado com o GSAP ScrollTrigger.
- **Canvas API**: Simulação realista de faíscas de solda (*sparks*) ancorada à física do arco.
- **Tipografia**: Manrope e Geist Mono (Google Fonts).

---

## 🚀 Como Executar Localmente

Como a arquitetura é 100% estática (HTML, CSS e JS nativos), o site pode ser executado com qualquer servidor web HTTP simples:

### Opção 1: Via Python
```bash
python -m http.server 8080
# Acesse: http://localhost:8080
```

### Opção 2: Extensão Live Server (VS Code / Cursor / IDE)
Basta clicar com o botão direito no `index.html` e selecionar **"Open with Live Server"**.

### Opção 3: Via Node.js (`npx serve`)
```bash
npx serve .
```

---

## 📁 Estrutura de Arquivos

```
metallum/
├── index.html            # Estrutura semântica completa e acessível
├── favicon.svg           # Ícone do site
├── css/
│   └── style.css         # Design system, tokens, layout, efeitos e componentes
├── js/
│   ├── main.js           # Orquestrador: Lenis, GSAP, drawers, modais e formulário
│   ├── data.js           # Central de dados, textos e conteúdos editáveis
│   ├── sparks.js         # Simulação de partículas de solda em HTML5 Canvas
│   └── vendor/           # Bibliotecas locais (Lenis, GSAP, ScrollTrigger, SplitText)
│       ├── gsap.min.js
│       ├── lenis.min.js
│       ├── ScrollTrigger.min.js
│       └── SplitText.min.js
└── media/
    ├── og-image.jpg      # Imagem para Open Graph / compartilhamento
    └── demo/             # Imagens ilustrativas tratadas em alta resolução
```

---

## 🎬 Narrativa e Seções

1. **Hero**: Abertura cinematográfica com fenda de luz, zoom, tipografia com máscara e faíscas incandescentes em tempo real.
2. **Empresa (Intro)**: Apresentação institucional, composição assimétrica de fotos e dados operacionais.
3. **Conceito (Manifesto)**: Frase central da marca que se acende palavra a palavra conforme o scroll.
4. **Cenas no Scroll**: Narrativa fixa (*pinned*) em 4 atos: Matéria-prima → Transformação → Engenharia → Resultado.
5. **Soluções (Serviços)**: Índice interativo com troca dinâmica de imagens no desktop e abertura de painel lateral (*Service Drawer*) com escopo e checklist de orçamento.
6. **Aplicações (Segmentos)**: Rolagem horizontal no desktop (*horizontal scroll scrub*) e carrossel fluido no mobile.
7. **Projetos**: Estudos conceituais com layout editorial, parallax e modal detalhado (*Project Drawer*).
8. **Engenharia**: Seção de contraste em tema claro com diagrama técnico SVG animado e grade dos 6 princípios.
9. **Processo**: Fluxo de atendimento com linha de condução animada que ilumina os estágios.
10. **Galeria**: Grid editorial responsivo com ampliação em Lightbox fullscreen (com teclado e suporte a toque).
11. **Orçamento (Contato)**: Formulário interativo com máscara de telefone, validação em tempo real, anexo de arquivos e confirmação.
12. **Rodapé**: Links, dados de contato e wordmark monumental em outline.

---

## ♿ Acessibilidade e Movimento

- **`prefers-reduced-motion`**: Lenis, partículas e animações complexas são automaticamente desativados para usuários que preferem movimento reduzido.
- **Navegação por Teclado**: Modais e drawers contam com gerenciamento de foco (foco preso, fechamento por `Esc` e devolução ao botão de origem).
- **Atalho de Conteúdo**: Link acessível "Pular para o conteúdo" logo no início do documento.
