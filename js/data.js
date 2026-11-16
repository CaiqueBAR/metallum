/**
 * METALLUM — Dados Institucionais e Conteúdo
 * Central de textos, serviços, projetos, cenas e configurações.
 */

(function (global) {
  "use strict";

  var CONFIG = {
  DEMO_MODE: true,
  SITE_URL: "http://localhost:3000",
  QUOTE_ENDPOINT: null // URL para envio do form (ex: Formspree, RD Station). Nulo = modo demo.
};

/** Link oficial do Google Maps da Metallum */
var GOOGLE_MAPS_URL = "https://share.google/r9Sw7FTT1PQqsZ9s3";

var COMPANY = {
  name: "Metallum",
  legalName: "Metallum Indústria Metalmecânica",
  tagline: "Engenharia, precisão e soluções que transformam o metal em resultado.",
  cnaePrincipal: {
    code: "2511-0/00",
    denomination: "Fabricação de estruturas metálicas"
  },
  location: {
    city: "Serra",
    state: "Espírito Santo",
    stateCode: "ES",
    country: "Brasil",
    label: "Serra — Espírito Santo, Brasil",
    coordinates: null,
    mapsUrl: GOOGLE_MAPS_URL,
    address: null
  },
  contacts: {
    phone: "(27) 3103-0612",
    phoneRaw: "+552731030612",
    phoneHref: "tel:+552731030612",
    email: "comercial@metallumindustria.com",
    emailSubject: "Solicitação de orçamento — Metallum",
    emailHref: "mailto:comercial@metallumindustria.com?subject=Solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20%E2%80%94%20Metallum",
    businessHours: "Segunda a Sexta · Horário Comercial",
    mapsUrl: GOOGLE_MAPS_URL
  },
  legal: {
    cnpj: null
  },
  copyrightYear: 2026,
  hero: {
    isDemo: false,
    eyebrow: "Indústria metalmecânica",
    titleLines: ["Engenharia que", "dá forma ao metal."],
    lead: "Soluções metalmecânicas para demandas industriais — da fabricação de estruturas e usinagem à montagem de máquinas e manutenção especializada.",
    primaryCta: { label: "Solicitar orçamento", href: "#orcamento" },
    secondaryCta: { label: "Conhecer especialidades", href: "#solucoes" }
  },
  intro: {
    isDemo: false,
    label: "A Metallum",
    title: "Transformamos necessidades industriais em soluções metalmecânicas.",
    lead: "A Metallum atua com múltiplas frentes industriais integradas: fabricação de estruturas metálicas, caldeiraria pesada, usinagem, manutenção industrial, máquinas para setores produtivos e serviços complementares de engenharia e fornecimento.",
    paragraphs: [
      "Cada demanda começa pela compreensão da aplicação: onde a estrutura ou peça vai operar, quais esforços vai suportar e quais requisitos precisam ser respeitados. A partir disso, a solução é definida com clareza antes de chegar à fabricação.",
      "Nossa proposta é ser um parceiro técnico para gestores, compradores, engenheiros e equipes de manutenção — com comunicação objetiva, planejamento e compromisso com o resultado de cada projeto."
    ],
    image: "media/demo/plant-interior.jpg",
    detailImage: "media/demo/welding-arc.jpg",
    facts: [
      { label: "Atuação", value: "Fabricação, usinagem, máquinas e manutenção" },
      { label: "Atividade Principal", value: "CNAE 2511-0/00 · Estruturas Metálicas" },
      { label: "Base", value: "Serra — Espírito Santo, Brasil" }
    ]
  }
};

var NAVIGATION = [
  { label: "Empresa", href: "#empresa", index: "01" },
  { label: "Soluções", href: "#solucoes", index: "02" },
  { label: "Aplicações", href: "#aplicacoes", index: "03" },
  { label: "Projetos", href: "#projetos", index: "04" },
  { label: "Engenharia", href: "#engenharia", index: "05" },
  { label: "Processo", href: "#processo", index: "06" }
];

var SCENES = [
  {
    id: "materia",
    index: "01",
    label: "Matéria-prima",
    title: "Tudo começa no material certo.",
    text: "A escolha e a preparação do material definem o comportamento da peça em operação. É o primeiro ponto de atenção de qualquer solução.",
    image: "media/demo/raw-ore.jpg",
    spec: "Fase 01 — Seleção e preparação",
    isDemo: true
  },
  {
    id: "transformacao",
    index: "02",
    label: "Transformação",
    title: "Corte, conformação e solda com controle.",
    text: "Processos de transformação conduzidos com método, para que cada etapa respeite as especificações definidas no projeto.",
    image: "media/demo/grinding-sparks.jpg",
    spec: "Fase 02 — Processos de fabricação",
    isDemo: true
  },
  {
    id: "engenharia",
    index: "03",
    label: "Engenharia",
    title: "Precisão desenhada antes de ser fabricada.",
    text: "Desenhos técnicos e especificações interpretados com critério. O alinhamento no projeto evita retrabalho na montagem.",
    image: "media/demo/cad-drawing.jpg",
    spec: "Fase 03 — Projeto e detalhamento",
    isDemo: true
  },
  {
    id: "resultado",
    index: "04",
    label: "Resultado",
    title: "Estruturas e componentes prontos para operar.",
    text: "O resultado é uma solução robusta e funcional, alinhada à necessidade real de quem vai utilizá-la.",
    image: "media/demo/steel-hall.jpg",
    spec: "Fase 04 — Entrega e operação",
    isDemo: true
  }
];

var SERVICES = [
  {
    id: "estruturas-metalicas",
    number: "01",
    title: "Fabricação de estruturas metálicas",
    summary: "Estruturas e componentes metálicos para aplicações industriais.",
    description: "Desenvolvimento e fabricação de estruturas e componentes metálicos para aplicações industriais, a partir das necessidades do cliente e das especificações de projeto.",
    scope: ["Estruturas de suporte", "Plataformas e passarelas", "Bases e suportes de equipamentos", "Componentes estruturais sob medida"],
    applications: ["Plantas industriais", "Ampliações e adequações", "Áreas operacionais"],
    quoteInputs: [
      "Desenho técnico, croqui ou foto da peça",
      "Descrição da aplicação e das condições de uso",
      "Quantidade estimada",
      "Prazo desejado e local de entrega"
    ],
    image: "media/demo/steel-hall.jpg",
    isDemo: true
  },
  {
    id: "caldeiraria",
    number: "02",
    title: "Caldeiraria",
    summary: "Fabricação e conformação de componentes e conjuntos metálicos.",
    description: "Soluções de fabricação e conformação de componentes e conjuntos metálicos, conforme os requisitos de cada projeto.",
    scope: ["Conjuntos e componentes conformados", "Chutes, dutos e carenagens", "Peças em chapa sob medida", "Adequação de conjuntos existentes"],
    applications: ["Linhas de processo", "Movimentação de materiais", "Sistemas industriais"],
    quoteInputs: [
      "Desenho técnico, croqui ou foto da peça",
      "Descrição da aplicação e das condições de uso",
      "Quantidade estimada",
      "Prazo desejado e local de entrega"
    ],
    image: "media/demo/stainless-assembly.jpg",
    isDemo: true
  },
  {
    id: "soldagem-industrial",
    number: "03",
    title: "Soldagem industrial",
    summary: "Soldagem para fabricação, reparo e montagem de componentes.",
    description: "Execução de serviços de soldagem para fabricação, reparo e montagem de componentes metálicos, com atenção à preparação, à execução e ao acabamento.",
    scope: ["Soldagem de fabricação", "Reparos e recuperações", "Montagem de conjuntos", "Acabamento de cordões"],
    applications: ["Fabricação de componentes", "Manutenção corretiva", "Montagens em campo ou em oficina"],
    quoteInputs: [
      "Desenho técnico, croqui ou foto da peça",
      "Descrição da aplicação e das condições de uso",
      "Quantidade estimada",
      "Prazo desejado e local de entrega"
    ],
    image: "media/demo/welding-arc.jpg",
    isDemo: true
  },
  {
    id: "usinagem-tornearia",
    number: "04",
    title: "Usinagem e tornearia",
    summary: "Produção e adequação de peças conforme especificação técnica.",
    description: "Produção e adequação de peças e componentes metálicos conforme especificações técnicas fornecidas pelo cliente ou desenvolvidas em conjunto.",
    scope: ["Peças torneadas", "Componentes fresados", "Adequação e ajuste de peças", "Reposição a partir de amostra ou desenho"],
    applications: ["Reposição de componentes", "Conjuntos mecânicos", "Equipamentos industriais"],
    quoteInputs: [
      "Desenho técnico com cotas, ou amostra da peça",
      "Material especificado (se houver)",
      "Quantidade estimada",
      "Prazo desejado e local de entrega"
    ],
    image: "media/demo/machining.jpg",
    isDemo: true
  },
  {
    id: "corte-dobra",
    number: "05",
    title: "Corte e dobra de metais",
    summary: "Transformação de chapas em componentes e conjuntos.",
    description: "Transformação de chapas metálicas para a fabricação de componentes e conjuntos, conforme desenho e aplicação.",
    scope: ["Corte de chapas", "Dobra e conformação", "Peças planificadas", "Preparação para montagem e solda"],
    applications: ["Carenagens e proteções", "Componentes estruturais leves", "Conjuntos em chapa"],
    quoteInputs: [
      "Desenho técnico, croqui ou foto da peça",
      "Descrição da aplicação e das condições de uso",
      "Quantidade estimada",
      "Prazo desejado e local de entrega"
    ],
    image: "media/demo/grinding-sparks.jpg",
    isDemo: true
  },
  {
    id: "manutencao-industrial",
    number: "06",
    title: "Manutenção industrial",
    summary: "Manutenção e suporte para equipamentos e componentes.",
    description: "Serviços de manutenção e suporte para equipamentos e componentes utilizados em ambientes industriais, com foco na continuidade da operação.",
    scope: ["Recuperação de componentes", "Manutenção corretiva", "Adequações e melhorias", "Fabricação de peças de reposição"],
    applications: ["Paradas programadas", "Demandas corretivas", "Melhoria de equipamentos"],
    quoteInputs: [
      "Descrição do problema ou da falha",
      "Fotos do componente e do local",
      "Urgência e janela de parada disponível",
      "Local do atendimento"
    ],
    image: "media/demo/plant-interior.jpg",
    isDemo: true
  },
  {
    id: "projetos-desenho-tecnico",
    number: "07",
    title: "Projetos e desenho técnico",
    summary: "Elaboração e interpretação de projetos para fabricação.",
    description: "Apoio na elaboração e interpretação de projetos e desenhos técnicos para fabricação, conectando a necessidade do cliente à execução.",
    scope: ["Levantamento de necessidades", "Desenho de fabricação", "Interpretação de projetos existentes", "Detalhamento de peças e conjuntos"],
    applications: ["Novos componentes", "Engenharia reversa a partir de amostra", "Adequação de projetos"],
    quoteInputs: [
      "Descrição da necessidade",
      "Desenhos ou referências existentes",
      "Medidas ou amostras disponíveis",
      "Prazo desejado"
    ],
    image: "media/demo/cad-drawing.jpg",
    isDemo: true
  }
];

var INDUSTRIES = [
  {
    id: "transformacao",
    index: "A",
    title: "Indústria de transformação",
    text: "Componentes, suportes e adequações para linhas de produção que precisam operar com continuidade.",
    needs: ["Peças de reposição", "Suportes e bases", "Adequação de linhas"],
    image: "media/demo/robotic-line.jpg",
    isDemo: true
  },
  {
    id: "mineracao",
    index: "B",
    title: "Mineração",
    text: "Soluções robustas para ambientes de alta exigência, em que desgaste e esforço mecânico fazem parte da rotina.",
    needs: ["Recuperação de componentes", "Estruturas e chutes", "Manutenção corretiva"],
    image: "media/demo/mining.jpg",
    isDemo: true
  },
  {
    id: "infraestrutura",
    index: "C",
    title: "Infraestrutura industrial",
    text: "Estruturas e conjuntos metálicos que dão suporte a plantas, utilidades e sistemas de processo.",
    needs: ["Estruturas de suporte", "Plataformas e acessos", "Conjuntos de caldeiraria"],
    image: "media/demo/refinery-night.jpg",
    isDemo: true
  },
  {
    id: "logistica",
    index: "D",
    title: "Logística e movimentação",
    text: "Componentes e estruturas para operações de movimentação, armazenagem e transporte de cargas.",
    needs: ["Estruturas metálicas", "Componentes de equipamentos", "Reparos e reforços"],
    image: "media/demo/port-cranes.jpg",
    isDemo: true
  },
  {
    id: "construcao",
    index: "E",
    title: "Construção e estruturas metálicas",
    text: "Elementos metálicos fabricados conforme projeto, para obras e ampliações de caráter industrial.",
    needs: ["Componentes estruturais", "Peças sob medida", "Interpretação de projeto"],
    image: "media/demo/steel-facade.jpg",
    isDemo: true
  },
  {
    id: "plantas",
    index: "F",
    title: "Manutenção de plantas industriais",
    text: "Suporte técnico para manter equipamentos e instalações em condição de operação.",
    needs: ["Paradas programadas", "Fabricação de reposição", "Adequações e melhorias"],
    image: "media/demo/process-piping.jpg",
    isDemo: true
  }
];

var PROJECTS = [
  {
    id: "estrutura-trelicada",
    code: "EC—01",
    title: "Estrutura treliçada para cobertura industrial",
    category: "Estruturas metálicas",
    summary: "Estudo de composição estrutural leve e resistente para vencer grandes vãos em ambiente industrial.",
    context: "Cenário hipotético: uma área operacional precisa de cobertura com poucos apoios intermediários, para liberar a circulação de equipamentos.",
    approach: "A solução conceitual parte de módulos treliçados repetíveis, que simplificam a fabricação e a montagem e mantêm a leitura limpa da estrutura.",
    processes: ["Projeto e detalhamento", "Corte e preparação", "Soldagem", "Montagem"],
    image: "media/demo/truss-structure.jpg",
    detailImage: "media/demo/steel-hall.jpg",
    demoLabel: "Estudo conceitual",
    isDemo: true
  },
  {
    id: "componente-usinado",
    code: "EC—02",
    title: "Componente usinado de precisão",
    category: "Usinagem",
    summary: "Representação de uma peça com faces usinadas, em que geometria e acabamento são determinantes para a função.",
    context: "Cenário hipotético: um componente de reposição precisa ser reproduzido a partir de amostra, preservando o encaixe com o conjunto existente.",
    approach: "O estudo considera levantamento dimensional, definição do desenho de fabricação e usinagem orientada pelas superfícies funcionais.",
    processes: ["Levantamento dimensional", "Desenho técnico", "Usinagem", "Conferência"],
    image: "media/demo/machined-blocks.jpg",
    detailImage: "media/demo/machining.jpg",
    demoLabel: "Estudo conceitual",
    isDemo: true
  },
  {
    id: "conjunto-caldeiraria",
    code: "EC—03",
    title: "Conjunto de caldeiraria para linha de processo",
    category: "Caldeiraria",
    summary: "Composição de componentes conformados e interligados, pensada para integração a uma linha existente.",
    context: "Cenário hipotético: uma linha de processo precisa de um novo conjunto que respeite os pontos de conexão e o espaço disponível.",
    approach: "A abordagem conceitual organiza o conjunto em partes fabricáveis separadamente, facilitando transporte, montagem e manutenção futura.",
    processes: ["Interpretação de projeto", "Corte e dobra", "Caldeiraria", "Soldagem"],
    image: "media/demo/stainless-assembly.jpg",
    detailImage: "media/demo/process-piping.jpg",
    demoLabel: "Estudo conceitual",
    isDemo: true
  },
  {
    id: "recuperacao-componente",
    code: "EC—04",
    title: "Recuperação de componente industrial",
    category: "Manutenção",
    summary: "Visualização de um componente em processo de recuperação, devolvido à condição de operação.",
    context: "Cenário hipotético: um componente desgastado precisa voltar a operar dentro da janela de uma parada programada.",
    approach: "O estudo conceitual prevê avaliação do desgaste, definição do método de recuperação e acabamento compatível com a aplicação.",
    processes: ["Avaliação técnica", "Recuperação", "Acabamento", "Revisão final"],
    image: "media/demo/grinding-detail.jpg",
    detailImage: "media/demo/plant-interior.jpg",
    demoLabel: "Estudo conceitual",
    isDemo: true
  }
];

var PRINCIPLES = [
  { code: "P.01", title: "Precisão técnica", text: "Leitura cuidadosa de especificações, cotas e requisitos antes de qualquer execução." },
  { code: "P.02", title: "Planejamento", text: "Etapas definidas e comunicadas, para que o cliente saiba o que esperar em cada fase." },
  { code: "P.03", title: "Soluções sob medida", text: "Cada demanda é tratada a partir da aplicação real, não de um catálogo fixo." },
  { code: "P.04", title: "Atenção aos detalhes", text: "Preparação, acabamento e conferência recebem o mesmo cuidado que a fabricação." },
  { code: "P.05", title: "Robustez e funcionalidade", text: "Soluções pensadas para o ambiente industrial em que vão operar." },
  { code: "P.06", title: "Compromisso com o projeto", text: "Diálogo direto e responsabilidade do primeiro contato à entrega." }
];

var PROCESS_STEPS = [
  {
    number: "01",
    title: "Recebimento da necessidade",
    text: "Entendemos a demanda, a aplicação e o contexto em que a solução vai operar.",
    output: "Escopo inicial"
  },
  {
    number: "02",
    title: "Análise técnica",
    text: "Avaliamos desenhos, amostras e requisitos para identificar a melhor forma de execução.",
    output: "Diagnóstico técnico"
  },
  {
    number: "03",
    title: "Definição da solução",
    text: "Apresentamos a proposta, com escopo, etapas e premissas alinhadas com o cliente.",
    output: "Proposta"
  },
  {
    number: "04",
    title: "Planejamento e execução",
    text: "A fabricação ou o serviço são conduzidos conforme o planejamento definido.",
    output: "Execução acompanhada"
  },
  {
    number: "05",
    title: "Revisão e entrega",
    text: "Conferimos o resultado em relação ao que foi especificado antes da entrega.",
    output: "Entrega"
  }
];

var GALLERY = [
  { id: "g01", image: "media/demo/hero-welding.jpg", caption: "Soldagem", category: "Processo", layout: "wide", isDemo: true },
  { id: "g02", image: "media/demo/steel-facade.jpg", caption: "Estrutura em aço", category: "Estrutura", layout: "tall", isDemo: true },
  { id: "g03", image: "media/demo/machining.jpg", caption: "Usinagem", category: "Processo", layout: "base", isDemo: true },
  { id: "g04", image: "media/demo/plant-interior.jpg", caption: "Ambiente industrial", category: "Planta", layout: "wide", isDemo: true },
  { id: "g05", image: "media/demo/machined-blocks.jpg", caption: "Faces usinadas", category: "Detalhe", layout: "base", isDemo: true },
  { id: "g06", image: "media/demo/raw-ore.jpg", caption: "Matéria-prima", category: "Material", layout: "base", isDemo: true },
  { id: "g07", image: "media/demo/grinding-sparks.jpg", caption: "Corte e acabamento", category: "Processo", layout: "base", isDemo: true },
  { id: "g08", image: "media/demo/stainless-assembly.jpg", caption: "Conjunto de caldeiraria", category: "Componente", layout: "tall", isDemo: true },
  { id: "g09", image: "media/demo/steel-hall.jpg", caption: "Estrutura metálica", category: "Estrutura", layout: "base", isDemo: true },
  { id: "g10", image: "media/demo/technical-drawings.jpg", caption: "Desenho técnico", category: "Engenharia", layout: "wide", isDemo: true },
  { id: "g11", image: "media/demo/refinery-night.jpg", caption: "Planta de processo", category: "Planta", layout: "base", isDemo: true }
];

var CONTACT = {
  phone: "(27) 3103-0612",
  phoneRaw: "+552731030612",
  phoneHref: "tel:+552731030612",
  whatsapp: null,
  email: "comercial@metallumindustria.com",
  emailSubject: "Solicitação de orçamento — Metallum",
  emailHref: "mailto:comercial@metallumindustria.com?subject=Solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20%E2%80%94%20Metallum",
  businessHours: "Segunda a Sexta · Horário Comercial",
  mapsUrl: GOOGLE_MAPS_URL,
  location: "Serra — Espírito Santo, Brasil",
  social: [],
  section: {
    label: "Orçamento e Contato",
    title: "Seu próximo desafio industrial começa com uma conversa.",
    lead: "Conte o que você precisa. Atendemos demandas de fabricação, usinagem, máquinas, manutenção e serviços industriais com método e clareza técnica."
  },
  form: {
    maxFileSizeMB: 10,
    acceptedFiles: [".pdf", ".dwg", ".dxf", ".step", ".stp", ".png", ".jpg", ".jpeg"]
  }
};

  // Exposição Universal
  global.CONFIG = CONFIG;
  global.GOOGLE_MAPS_URL = global.GOOGLE_MAPS_URL || GOOGLE_MAPS_URL;
  global.COMPANY = global.COMPANY || COMPANY;
  global.NAVIGATION = NAVIGATION;
  global.SCENES = SCENES;
  global.SERVICES = global.SERVICES || SERVICES;
  global.SERVICE_CATEGORIES = global.SERVICE_CATEGORIES || (typeof SERVICE_CATEGORIES !== "undefined" ? SERVICE_CATEGORIES : []);
  global.INDUSTRIES = INDUSTRIES;
  global.PROJECTS = PROJECTS;
  global.PRINCIPLES = PRINCIPLES;
  global.PROCESS_STEPS = PROCESS_STEPS;
  global.GALLERY = GALLERY;
  global.CONTACT = global.CONTACT || CONTACT;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      CONFIG,
      GOOGLE_MAPS_URL: global.GOOGLE_MAPS_URL,
      COMPANY: global.COMPANY,
      NAVIGATION,
      SCENES,
      SERVICES: global.SERVICES,
      SERVICE_CATEGORIES: global.SERVICE_CATEGORIES,
      INDUSTRIES,
      PROJECTS,
      PRINCIPLES,
      PROCESS_STEPS,
      GALLERY,
      CONTACT: global.CONTACT
    };
  }
})(typeof window !== "undefined" ? window : globalThis);
