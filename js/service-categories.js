/**
 * METALLUM — Categorias Estratégicas de Atuação
 * Agrupamento oficial das 15 atividades econômicas em cinco grandes especialidades industriais.
 */

(function (global) {
  "use strict";

  var SERVICE_CATEGORIES = [
    {
      id: "estruturas-fabricacao",
      number: "01",
      code: "ÁREA 01",
      name: "Estruturas e fabricação metálica",
      shortName: "Estruturas e fabricação",
      shortDesc: "Desenvolvimento e fabricação de estruturas metálicas e componentes de caldeiraria pesada destinados a plantas e operações industriais.",
      tag: "Especialidade Principal",
      isPrimaryArea: true,
      isComplementary: false,
      image: "media/demo/steel-hall.jpg",
      cnaes: ["2511-0/00", "2513-6/00", "2599-3/99"]
    },
    {
      id: "usinagem-transformacao",
      number: "02",
      code: "ÁREA 02",
      name: "Usinagem e transformação de metais",
      shortName: "Usinagem e transformação",
      shortDesc: "Serviços técnicos de usinagem, tornearia, soldagem especializada, corte e conformação de chapas para fabricação e recuperação de componentes metálicos.",
      tag: "Precisão & Manufatura",
      isPrimaryArea: false,
      isComplementary: false,
      image: "media/demo/machining.jpg",
      cnaes: ["2539-0/01", "2599-3/02", "2543-8/00"]
    },
    {
      id: "maquinas-equipamentos",
      number: "03",
      code: "ÁREA 03",
      name: "Máquinas e equipamentos industriais",
      shortName: "Máquinas e equipamentos",
      shortDesc: "Fabricação de máquinas-ferramenta, equipamentos e conjuntos sob medida para as atividades de extração mineral e aplicações industriais específicas.",
      tag: "Engenharia de Máquinas",
      isPrimaryArea: false,
      isComplementary: false,
      image: "media/demo/robotic-line.jpg",
      cnaes: ["2840-2/00", "2852-6/00", "2869-1/00"]
    },
    {
      id: "manutencao-industrial",
      number: "04",
      code: "ÁREA 04",
      name: "Manutenção industrial",
      shortName: "Manutenção industrial",
      shortDesc: "Serviços especializados de revisão, reparação e manutenção preventiva e corretiva em sistemas hidráulicos, pneumáticos e equipamentos de elevação e transporte de cargas.",
      tag: "Confiabilidade & Manutenção",
      isPrimaryArea: false,
      isComplementary: false,
      image: "media/demo/plant-interior.jpg",
      cnaes: ["3314-7/02", "3314-7/08", "3314-7/10"]
    },
    {
      id: "atividades-complementares",
      number: "05",
      code: "ÁREA 05",
      name: "Atividades complementares",
      shortName: "Atividades complementares",
      shortDesc: "Atuação no comércio atacadista de produtos siderúrgicos, elaboração de desenhos técnicos para arquitetura e engenharia e fornecimento de mão de obra temporária.",
      tag: "Suporte & Apoio Corporativo",
      isPrimaryArea: false,
      isComplementary: true,
      image: "media/demo/technical-drawings.jpg",
      cnaes: ["4685-1/00", "7119-7/03", "7820-5/00"],
      notice: "Frente corporativa de suporte e fornecimento, apresentada separadamente dos processos fabris e de manutenção mecânica."
    }
  ];

  // Exposição Universal
  global.SERVICE_CATEGORIES = SERVICE_CATEGORIES;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { SERVICE_CATEGORIES };
  }
})(typeof window !== "undefined" ? window : globalThis);
