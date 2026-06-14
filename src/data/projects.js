import ImagesObject from "../assets/images";

const projects = [
  {
    title:
      "TCC: Algoritmos Genéticos e Redes Neurais para o PPCCM",
    logo: ImagesObject.tccGraphExample,
    screenshot: ImagesObject.tccMethodologyFlow,
    websiteLink: "/tcc",
    buttonLabel: "Ver página do TCC",
    description:
      "Trabalho de Conclusão de Curso em Engenharia de Computação investigando uma abordagem híbrida para o Problema da Partição Cromática de Custo Mínimo, combinando algoritmo genético e MLP para ranquear soluções candidatas.",
    note: "Pesquisa defendida no IFF Campus Campos Centro em abril de 2026.",
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
    title: "Dashboards e processos no ClickUp",
    logo: ImagesObject.foodDigitalLogo,
    screenshot: ImagesObject.clickUpScreenshot,
    websiteLink: "https://clickup.com",
    buttonLabel: "Ver ferramenta ClickUp",
    description:
      "Dashboards, configurações de tarefas e organização de processos para rotinas operacionais na Rush Co e Food Digital, com foco em acompanhamento, clareza de fluxo e gestão de entregas.",
    note: "Dados e espaços reais não exibidos por confidencialidade.",
    technologies: [
      "ClickUp",
      "Dashboards",
      "Gestão de projetos",
      "Processos",
      "Operações",
      "Métricas",
    ],
  },
  {
    title: "Automações ClickUp com n8n",
    logo: ImagesObject.rushCoDigitalLogo,
    screenshot: ImagesObject.n8nScreenshot,
    websiteLink: "https://n8n.io",
    buttonLabel: "Ver ferramenta n8n",
    description:
      "Automações criadas durante a atuação na Rush Co para criação e configuração automática de tarefas e projetos no ClickUp, conectando rotinas operacionais a fluxos no n8n.",
    note: "Fluxos internos não exibidos por confidencialidade.",
    technologies: [
      "n8n",
      "ClickUp",
      "Automações",
      "Webhooks",
      "Gestão de tarefas",
      "Processos operacionais",
    ],
  },
  {
    title: "Implementação Blockly em sistema embarcado",
    logo: ImagesObject.ficharioLogo,
    screenshot: ImagesObject.blocklyScreenshot,
    websiteLink: "https://developers.google.com/blockly?hl=pt-br#build-with-blockly",
    buttonLabel: "Ver biblioteca Blockly",
    description:
      "Projeto profissional desenvolvido na Fichar.io com implementação da biblioteca Blockly em um sistema embarcado fechado. Por sigilo, a imagem é uma referência pública da documentação, não uma tela do produto real.",
    note: "Sistema real não exibido por confidencialidade.",
    technologies: [
      "Blockly",
      "Python",
      "React.js",
      "Sistemas embarcados",
      "Integração de bibliotecas",
      "UI visual",
    ],
  },
  {
    title: "Site Aurea Empresa Júnior",
    logo: ImagesObject.aureaLogo,
    screenshot: ImagesObject.aureaSite,
    websiteLink: "https://www.aureaej.com",
    technologies: ["React.js", "Javascript", "HTML", "CSS", "FireBase"],
  },
  {
    title: "Site Cactus SketchBooks",
    logo: ImagesObject.cactusLogo,
    screenshot: ImagesObject.cactusSite,
    websiteLink: "https://www.cactussketchbooks.com",
    technologies: ["React.js", "Javascript", "HTML", "CSS", "Consumo de API"],
  },
];

export default projects;
