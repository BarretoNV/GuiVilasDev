import ImagesObject from "../assets/images";
import { localizePath } from "../utils/i18nRouting";

const projectTags = [
  { id: "all", labels: { "pt-BR": "Todos", en: "All" } },
  { id: "websites", labels: { "pt-BR": "Sites", en: "Websites" } },
  { id: "systems", labels: { "pt-BR": "Sistemas", en: "Systems" } },
  { id: "automation", labels: { "pt-BR": "Automações", en: "Automations" } },
  { id: "technology", labels: { "pt-BR": "Tecnologia", en: "Technology" } },
  { id: "computing", labels: { "pt-BR": "Computação", en: "Computing" } },
  { id: "research", labels: { "pt-BR": "Pesquisa", en: "Research" } },
];

const sharedProjects = [
  {
    key: "tcc",
    logo: ImagesObject.tccGraphExample,
    screenshot: ImagesObject.tccMethodologyFlow,
    websiteLink: "/tcc",
    tagIds: ["computing", "technology", "research"],
    technologies: [
      "Python",
      "Algoritmos Genéticos",
      "Redes Neurais",
      "MLP",
      "Otimização combinatória",
      "Coloração de grafos",
    ],
  },
  {
    key: "clickupDashboards",
    logo: ImagesObject.foodDigitalLogo,
    screenshot: ImagesObject.clickUpScreenshot,
    websiteLink: "https://clickup.com",
    tagIds: ["systems", "automation", "technology"],
    technologies: ["ClickUp", "Dashboards", "Gestão de projetos", "Processos", "Operações", "Métricas"],
  },
  {
    key: "n8nAutomations",
    logo: ImagesObject.rushCoDigitalLogo,
    screenshot: ImagesObject.n8nScreenshot,
    websiteLink: "https://n8n.io",
    tagIds: ["automation", "systems", "technology"],
    technologies: ["n8n", "ClickUp", "Automações", "Webhooks", "Gestão de tarefas", "Processos operacionais"],
  },
  {
    key: "blockly",
    logo: ImagesObject.ficharioLogo,
    screenshot: ImagesObject.blocklyScreenshot,
    websiteLink: "https://developers.google.com/blockly?hl=pt-br#build-with-blockly",
    tagIds: ["systems", "computing", "technology"],
    technologies: ["Blockly", "Python", "React.js", "Sistemas embarcados", "Integração de bibliotecas", "UI visual"],
  },
  {
    key: "aurea",
    logo: ImagesObject.aureaLogo,
    screenshot: ImagesObject.aureaSite,
    websiteLink: "https://www.aureaej.com",
    tagIds: ["websites", "technology"],
    technologies: ["React.js", "Javascript", "HTML", "CSS", "FireBase"],
  },
  {
    key: "cactus",
    logo: ImagesObject.cactusLogo,
    screenshot: ImagesObject.cactusSite,
    websiteLink: "https://www.cactussketchbooks.com",
    tagIds: ["websites", "technology"],
    technologies: ["React.js", "Javascript", "HTML", "CSS", "Consumo de API"],
  },
];

const localizedCopy = {
  "pt-BR": {
    tcc: {
      title: "TCC: Algoritmos Genéticos e Redes Neurais para o PPCCM",
      buttonLabel: "Ver página do TCC",
      description:
        "Trabalho de Conclusão de Curso em Engenharia de Computação investigando uma abordagem híbrida para o Problema da Partição Cromática de Custo Mínimo, combinando algoritmo genético e MLP para ranquear soluções candidatas.",
      note: "Pesquisa defendida no IFF Campus Campos Centro em abril de 2026.",
    },
    clickupDashboards: {
      title: "Dashboards e processos no ClickUp",
      buttonLabel: "Ver ferramenta ClickUp",
      description:
        "Dashboards, configurações de tarefas e organização de processos para rotinas operacionais na Rush Co e Food Digital, com foco em acompanhamento, clareza de fluxo e gestão de entregas.",
      note: "Dados e espaços reais não exibidos por confidencialidade.",
    },
    n8nAutomations: {
      title: "Automações ClickUp com n8n",
      buttonLabel: "Ver ferramenta n8n",
      description:
        "Automações criadas durante a atuação na Rush Co para criação e configuração automática de tarefas e projetos no ClickUp, conectando rotinas operacionais a fluxos no n8n.",
      note: "Fluxos internos não exibidos por confidencialidade.",
    },
    blockly: {
      title: "Implementação Blockly em sistema embarcado",
      buttonLabel: "Ver biblioteca Blockly",
      description:
        "Projeto profissional desenvolvido na Fichar.io com implementação da biblioteca Blockly em um sistema embarcado fechado. Por sigilo, a imagem é uma referência pública da documentação, não uma tela do produto real.",
      note: "Sistema real não exibido por confidencialidade.",
    },
    aurea: {
      title: "Site Aurea Empresa Júnior",
    },
    cactus: {
      title: "Site Cactus SketchBooks",
    },
  },
  en: {
    tcc: {
      title: "Thesis: Genetic Algorithms and Neural Networks for the MCCP",
      buttonLabel: "View thesis page",
      description:
        "Computer Engineering final thesis investigating a hybrid approach to the Minimum Cost Chromatic Partition Problem, combining a genetic algorithm and an MLP to rank candidate solutions.",
      note: "Research defended at IFF Campus Campos Centro in April 2026.",
    },
    clickupDashboards: {
      title: "Dashboards and processes in ClickUp",
      buttonLabel: "View ClickUp",
      description:
        "Dashboards, task setup, and process organization for operational routines at Rush Co and Food Digital, focused on visibility, workflow clarity, and delivery management.",
      note: "Real data and spaces are not shown for confidentiality.",
    },
    n8nAutomations: {
      title: "ClickUp automations with n8n",
      buttonLabel: "View n8n",
      description:
        "Automations created at Rush Co to automatically create and configure tasks and projects in ClickUp, connecting operational routines to n8n workflows.",
      note: "Internal flows are not shown for confidentiality.",
    },
    blockly: {
      title: "Blockly implementation in an embedded system",
      buttonLabel: "View Blockly library",
      description:
        "Professional project developed at Fichar.io implementing Blockly in a closed embedded system. For confidentiality, the image is a public reference from the documentation, not a real product screen.",
      note: "The real system is not shown for confidentiality.",
    },
    aurea: {
      title: "Aurea Empresa Júnior website",
    },
    cactus: {
      title: "Cactus SketchBooks website",
    },
  },
};

export const getProjects = (locale = "pt-BR") =>
  sharedProjects.map((project) => ({
    ...project,
    tags: project.tagIds.map((tagId) => {
      const tag = projectTags.find(({ id }) => id === tagId);
      return {
        id: tagId,
        label: tag?.labels[locale] || tag?.labels["pt-BR"] || tagId,
      };
    }),
    websiteLink: project.websiteLink?.startsWith("/")
      ? localizePath(project.websiteLink, locale)
      : project.websiteLink,
    ...localizedCopy[locale][project.key],
  }));

export const getProjectTags = (locale = "pt-BR") =>
  projectTags.map((tag) => ({
    id: tag.id,
    label: tag.labels[locale] || tag.labels["pt-BR"],
  }));

export default getProjects("pt-BR");
