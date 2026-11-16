/**
 * METALLUM — Informações Institucionais e Contatos Comerciais
 * Centralização oficial de dados cadastrais, canais de atendimento e localização.
 */

(function (global) {
  "use strict";

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
    // Atalhos diretos
    phone: "(27) 3103-0612",
    phoneTelLink: "tel:+552731030612",
    email: "comercial@metallumindustria.com",
    emailMailtoLink: "mailto:comercial@metallumindustria.com?subject=Solicita%C3%A7%C3%A3o%20de%20or%C3%A7amento%20%E2%80%94%20Metallum",
    googleMapsUrl: GOOGLE_MAPS_URL,
    addressCity: "Serra",
    addressState: "Espírito Santo"
  };

  var CONTACT = {
    phone: COMPANY.contacts.phone,
    phoneHref: COMPANY.contacts.phoneHref,
    email: COMPANY.contacts.email,
    emailHref: COMPANY.contacts.emailHref,
    businessHours: COMPANY.contacts.businessHours,
    mapsUrl: GOOGLE_MAPS_URL,
    location: COMPANY.location.label,
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
  global.GOOGLE_MAPS_URL = GOOGLE_MAPS_URL;
  global.COMPANY = COMPANY;
  global.CONTACT = CONTACT;

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { GOOGLE_MAPS_URL, COMPANY, CONTACT };
  }
})(typeof window !== "undefined" ? window : globalThis);
