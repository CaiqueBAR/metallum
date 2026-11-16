/**
 * METALLUM — Portfólio Completo de Atividades Econômicas
 * Lista das 15 atividades oficiais (CNAEs) agrupadas nas 5 áreas de atuação.
 */

(function (global) {
  "use strict";

  var SERVICES = [
  // ── ÁREA 01 — Estruturas e fabricação metálica ──
  {
    id: "fabricacao-estruturas-metalicas",
    number: "01",
    name: "Fabricação de estruturas metálicas",
    cnae: "2511-0/00",
    cnaeFormatted: "CNAE 2511-0/00",
    denomination: "Fabricação de estruturas metálicas",
    category: "estruturas-fabricacao",
    categoryName: "Estruturas e fabricação metálica",
    categoryNumber: "01",
    description: "Desenvolvimento e fabricação de estruturas metálicas destinadas a diferentes aplicações industriais e construtivas, considerando as necessidades específicas de cada projeto.",
    isPrimary: true,
    image: "media/demo/steel-hall.jpg",
    enabled: true
  },
  {
    id: "caldeiraria-pesada",
    number: "02",
    name: "Fabricação de obras de caldeiraria pesada",
    cnae: "2513-6/00",
    cnaeFormatted: "CNAE 2513-6/00",
    denomination: "Fabricação de obras de caldeiraria pesada",
    category: "estruturas-fabricacao",
    categoryName: "Estruturas e fabricação metálica",
    categoryNumber: "01",
    description: "Fabricação de componentes, conjuntos e estruturas de caldeiraria pesada destinados a aplicações industriais.",
    isPrimary: false,
    image: "media/demo/truss-structure.jpg",
    enabled: true
  },
  {
    id: "outros-produtos-metal",
    number: "03",
    name: "Fabricação de outros produtos de metal",
    cnae: "2599-3/99",
    cnaeFormatted: "CNAE 2599-3/99",
    denomination: "Fabricação de outros produtos de metal não especificados anteriormente",
    category: "estruturas-fabricacao",
    categoryName: "Estruturas e fabricação metálica",
    categoryNumber: "01",
    description: "Fabricação de produtos e componentes metálicos não classificados em categorias específicas.",
    isPrimary: false,
    image: "media/demo/rebar.jpg",
    enabled: true
  },

  // ── ÁREA 02 — Usinagem e transformação de metais ──
  {
    id: "usinagem-tornearia-solda",
    number: "04",
    name: "Usinagem, tornearia e solda",
    cnae: "2539-0/01",
    cnaeFormatted: "CNAE 2539-0/01",
    denomination: "Serviços de usinagem, tornearia e solda",
    category: "usinagem-transformacao",
    categoryName: "Usinagem e transformação de metais",
    categoryNumber: "02",
    description: "Serviços de usinagem, tornearia e soldagem para fabricação, adequação e recuperação de componentes metálicos.",
    isPrimary: false,
    image: "media/demo/machining.jpg",
    enabled: true
  },
  {
    id: "corte-dobra-metais",
    number: "05",
    name: "Corte e dobra de metais",
    cnae: "2599-3/02",
    cnaeFormatted: "CNAE 2599-3/02",
    denomination: "Serviços de corte e dobra de metais",
    category: "usinagem-transformacao",
    categoryName: "Usinagem e transformação de metais",
    categoryNumber: "02",
    description: "Serviços de corte e dobra de metais para transformação de chapas e fabricação de componentes.",
    isPrimary: false,
    image: "media/demo/grinding-sparks.jpg",
    enabled: true
  },
  {
    id: "fabricacao-ferramentas",
    number: "06",
    name: "Fabricação de ferramentas",
    cnae: "2543-8/00",
    cnaeFormatted: "CNAE 2543-8/00",
    denomination: "Fabricação de ferramentas",
    category: "usinagem-transformacao",
    categoryName: "Usinagem e transformação de metais",
    categoryNumber: "02",
    description: "Fabricação de ferramentas e componentes metálicos destinados a diferentes aplicações.",
    isPrimary: false,
    image: "media/demo/machined-blocks.jpg",
    enabled: true
  },

  // ── ÁREA 03 — Máquinas e equipamentos industriais ──
  {
    id: "fabricacao-maquinas-ferramenta",
    number: "07",
    name: "Fabricação de máquinas-ferramenta",
    cnae: "2840-2/00",
    cnaeFormatted: "CNAE 2840-2/00",
    denomination: "Fabricação de máquinas-ferramenta, peças e acessórios",
    category: "maquinas-equipamentos",
    categoryName: "Máquinas e equipamentos industriais",
    categoryNumber: "03",
    description: "Fabricação de máquinas-ferramenta, peças e acessórios para operações industriais.",
    isPrimary: false,
    image: "media/demo/robotic-line.jpg",
    enabled: true
  },
  {
    id: "maquinas-extracao-mineral",
    number: "08",
    name: "Máquinas para extração mineral",
    cnae: "2852-6/00",
    cnaeFormatted: "CNAE 2852-6/00",
    denomination: "Fabricação de outras máquinas e equipamentos para uso na extração mineral, peças e acessórios, exceto na extração de petróleo",
    category: "maquinas-equipamentos",
    categoryName: "Máquinas e equipamentos industriais",
    categoryNumber: "03",
    description: "Fabricação de máquinas, equipamentos e componentes destinados às atividades de extração mineral.",
    isPrimary: false,
    image: "media/demo/mining.jpg",
    enabled: true
  },
  {
    id: "maquinas-equipamentos-industriais",
    number: "09",
    name: "Máquinas e equipamentos industriais",
    cnae: "2869-1/00",
    cnaeFormatted: "CNAE 2869-1/00",
    denomination: "Fabricação de máquinas e equipamentos para uso industrial específico não especificados anteriormente, peças e acessórios",
    category: "maquinas-equipamentos",
    categoryName: "Máquinas e equipamentos industriais",
    categoryNumber: "03",
    description: "Fabricação de máquinas, equipamentos e componentes destinados a aplicações industriais específicas.",
    isPrimary: false,
    image: "media/demo/process-plant.jpg",
    enabled: true
  },

  // ── ÁREA 04 — Manutenção industrial ──
  {
    id: "manutencao-hidraulicos-pneumaticos",
    number: "10",
    name: "Manutenção de equipamentos hidráulicos e pneumáticos",
    cnae: "3314-7/02",
    cnaeFormatted: "CNAE 3314-7/02",
    denomination: "Manutenção e reparação de equipamentos hidráulicos e pneumáticos, exceto válvulas",
    category: "manutencao-industrial",
    categoryName: "Manutenção industrial",
    categoryNumber: "04",
    description: "Serviços de manutenção e reparação de equipamentos e sistemas hidráulicos e pneumáticos.",
    isPrimary: false,
    image: "media/demo/process-piping.jpg",
    enabled: true
  },
  {
    id: "manutencao-transporte-elevacao",
    number: "11",
    name: "Manutenção de máquinas de transporte e elevação",
    cnae: "3314-7/08",
    cnaeFormatted: "CNAE 3314-7/08",
    denomination: "Manutenção e reparação de máquinas, equipamentos e aparelhos para transporte e elevação de cargas",
    category: "manutencao-industrial",
    categoryName: "Manutenção industrial",
    categoryNumber: "04",
    description: "Manutenção e reparação de equipamentos utilizados em operações de transporte e elevação de cargas.",
    isPrimary: false,
    image: "media/demo/port-cranes.jpg",
    enabled: true
  },
  {
    id: "manutencao-maquinas-geral",
    number: "12",
    name: "Manutenção de máquinas e equipamentos em geral",
    cnae: "3314-7/10",
    cnaeFormatted: "CNAE 3314-7/10",
    denomination: "Manutenção e reparação de máquinas e equipamentos para uso geral não especificados anteriormente",
    category: "manutencao-industrial",
    categoryName: "Manutenção industrial",
    categoryNumber: "04",
    description: "Serviços de manutenção e reparação de máquinas e equipamentos de uso geral.",
    isPrimary: false,
    image: "media/demo/plant-interior.jpg",
    enabled: true
  },

  // ── ÁREA 05 — Atividades complementares ──
  {
    id: "comercio-siderurgicos-metalurgicos",
    number: "13",
    name: "Comércio atacadista de produtos siderúrgicos e metalúrgicos",
    cnae: "4685-1/00",
    cnaeFormatted: "CNAE 4685-1/00",
    denomination: "Comércio atacadista de produtos siderúrgicos e metalúrgicos, exceto para construção",
    category: "atividades-complementares",
    categoryName: "Atividades complementares",
    categoryNumber: "05",
    description: "Atuação no comércio atacadista de produtos siderúrgicos e metalúrgicos.",
    isPrimary: false,
    image: "media/demo/stainless-assembly.jpg",
    enabled: true
  },
  {
    id: "desenho-tecnico-engenharia",
    number: "14",
    name: "Desenho técnico de arquitetura e engenharia",
    cnae: "7119-7/03",
    cnaeFormatted: "CNAE 7119-7/03",
    denomination: "Serviços de desenho técnico relacionados à arquitetura e engenharia",
    category: "atividades-complementares",
    categoryName: "Atividades complementares",
    categoryNumber: "05",
    description: "Serviços de elaboração de desenhos técnicos relacionados a projetos de arquitetura e engenharia.",
    isPrimary: false,
    image: "media/demo/cad-drawing.jpg",
    enabled: true
  },
  {
    id: "locacao-mao-de-obra",
    number: "15",
    name: "Locação de mão de obra temporária",
    cnae: "7820-5/00",
    cnaeFormatted: "CNAE 7820-5/00",
    denomination: "Locação de mão de obra temporária",
    category: "atividades-complementares",
    categoryName: "Atividades complementares",
    categoryNumber: "05",
    description: "Atividades de fornecimento de mão de obra temporária para empresas, conforme as condições legais aplicáveis.",
    isPrimary: false,
    image: "media/demo/grinding-detail.jpg",
    enabled: true
  }
];

  // Exposição Universal
  global.SERVICES = SERVICES;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { SERVICES };
  }
})(typeof window !== "undefined" ? window : globalThis);
