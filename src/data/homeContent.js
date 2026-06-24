import ImagesObject from "../assets/images";

export const formatDurationSince = (
  startYear,
  startMonthIndex,
  locale,
  referenceDate = new Date(),
) => {
  const currentYear = referenceDate.getFullYear();
  const currentMonthIndex = referenceDate.getMonth();
  const totalMonths =
    (currentYear - startYear) * 12 + currentMonthIndex - startMonthIndex + 1;

  if (totalMonths <= 0) {
    return locale === "en" ? "0 months" : "0 meses";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts = [];

  if (years > 0) {
    parts.push(
      locale === "en"
        ? `${years} ${years === 1 ? "year" : "years"}`
        : `${years} ${years === 1 ? "ano" : "anos"}`,
    );
  }

  if (months > 0) {
    parts.push(
      locale === "en"
        ? `${months} ${months === 1 ? "month" : "months"}`
        : `${months} ${months === 1 ? "mês" : "meses"}`,
    );
  }

  return parts.join(" ");
};

const companyLogos = {
  "Food Digital": ImagesObject.foodDigitalLogo,
  "Rush Co": ImagesObject.rushCoDigitalLogo,
  "Infinite Growth": ImagesObject.infiniteLogo,
  "Fichar.io": ImagesObject.ficharioLogo,
  "Vetta.Digital": ImagesObject.vettaLogo,
  "Retornar Tecnologia": ImagesObject.retornarLogo,
  "Aurea Empresa Júnior": ImagesObject.aureaLogo,
};

const content = {
  "pt-BR": {
    hero: {
      greeting: "Olá mundo, meu nome é",
      name: "Guilherme Vilas",
      title: "Engenheiro da Computação",
      paragraphs: [
        "Trabalho na interseção entre tecnologia, marketing digital e criação visual. Atuo com estratégia de conteúdo para restaurantes, edição de vídeos, social media, disparos de mensagens e otimização de Google Meu Negócio.",
        "Tenho experiência com Front-End em React.js e JavaScript, além de formação inicial em design e fotografia. Formado em engenharia pelo",
      ],
      institute: "Instituto Federal Fluminense.",
      linkedin: "Meu Linkedin",
      shareText: "Projetos, blog e astrofotografia por Guilherme Barreto.",
      scrollAlt: "Role para baixo",
      credit: "Imagem: NASA.gov",
    },
    about: {
      title: "01. Sobre mim",
      paragraphs: [
        "Sou engenheiro da computação e trabalho na interseção entre produto digital, conteúdo e operação de marketing. Minha trajetória passou por desenvolvimento front-end, projetos em React.js e, mais recentemente, pela rotina de social media, gestão de contas e presença digital para marcas e restaurantes.",
        "Gosto de atuar onde a parte técnica encontra o problema de negócio: estruturar interfaces, consumir APIs, organizar processos, criar narrativas para redes sociais, acompanhar métricas e transformar demandas soltas em entregas mais claras para clientes e equipes.",
        "Hoje meu trabalho conecta:",
      ],
      pillars: [
        {
          title: "Estratégia e conteúdo",
          text: "Planejamento editorial, narrativas para redes sociais, criativos e consistência de comunicação.",
        },
        {
          title: "Operação e relacionamento",
          text: "Gestão de contas, suporte, rotina com clientes e alinhamento de expectativas.",
        },
        {
          title: "Produto e tecnologia",
          text: "React, JavaScript, APIs, interfaces, automações e pensamento de engenharia aplicado.",
        },
        {
          title: "Métricas e melhoria contínua",
          text: "Google Meu Negócio, campanhas, leitura de resultados e ajustes de presença digital.",
        },
      ],
      credential: {
        alt: "Selo ClickUp Power User",
        title: "ClickUp Power User",
        text: "Usuário avançado autenticado pela ClickUp, reconhecimento associado ao uso intenso da plataforma em operações, dashboards, tarefas e processos.",
        link: "Ver programa ClickUp Verified",
      },
    },
    sections: {
      career: "02. Minha carreira",
      projects: "03. Alguns projetos que fiz",
      allProjects: "Ver todos os projetos",
      audiovisual: "04. Portfólio Audiovisual",
      audiovisualIntro:
        "Conheça meu trabalho com edição de vídeos, criação visual e conteúdo pensado para redes sociais.",
      audiovisualCta: "Ver portfólio audiovisual",
      culture: "05. Outros",
      cultureIntro: "Músicas e filmes que eu gosto.",
      filmDiary: "Meu diário de filmes",
      filmDiaryText: "Não espere resenhas profundas.",
      openLetterboxd: "Abrir Letterboxd",
      contact: "05. Entre em contato comigo",
      contactCopy:
        "Para conversar sobre projetos, conteúdo, tecnologia ou uma boa ideia ainda meio solta, estes são os melhores caminhos.",
      skills: "Competências:",
    },
    companies: [
      {
        value: "Food Digital",
        companyMeta: "Tempo integral",
        location: "Remota",
        roles: [
          {
            title: "Gerente de mídias sociais",
            periodPrefix: "abr de 2025 - o momento",
            dynamicDuration: true,
            description:
              "Gestão de mídias sociais. Edição de vídeos e imagens. Planejamento estratégico de marketing. Gestão de projetos.",
            stack:
              "Gestão de projetos · Publicidade em mídias sociais · Edição de vídeo · Planejamento estratégico",
          },
        ],
      },
      {
        value: "Rush Co",
        companyMeta: "Tempo integral · 10 m",
        location: "Remota",
        roles: [
          {
            title: "Gerente de contas",
            period: "mar de 2025 - abr de 2025 · 2 meses",
            description:
              "Gestão de projetos e liderança de equipes multidisciplinar. Manutenção de relacionamento próximo e produtivo com a carteira de clientes. Identificação de oportunidades de negócios. Gestão de expectativas dos clientes. Monitoramento do uso de produtos e serviços. Gestão de crises. Representação da empresa e das necessidades dos clientes. Provisão de suporte diário para atender às necessidades dos clientes.",
            stack:
              "Gestão de projetos · Suporte ao cliente · Métricas de mídias sociais · Gestão de tráfego",
          },
          {
            title: "Social Media",
            period: "jul de 2024 - mar de 2025 · 9 meses",
            description:
              "Gerenciamento, planejamento, estruturação e manutenção de redes sociais.",
            stack: "Instagram · Copywriting",
          },
        ],
      },
      {
        value: "Infinite Growth",
        companyMeta: "Tempo integral",
        location: "Campos dos Goytacazes · Híbrida",
        roles: [
          {
            title: "Social Media",
            period: "jan de 2024 - jun de 2024 · 6 meses",
            description:
              "Elaboração e desenvolvimento de criativos para redes sociais, assim como idealização de roteiros e editoriais de postagens para utilização em campanhas ou em simples posts em plataformas, como: Meta, Google, Tiktok, Kwai e outras similares.",
            stack:
              "Desenvolvimento de ideias · Marketing de mídias sociais · Narrativas visuais · Produção de vídeo",
          },
        ],
      },
      {
        value: "Fichar.io",
        roles: [
          {
            title: "Desenvolvedor Front-End",
            period: "jun de 2023 - jan de 2024 · 8 meses",
            description:
              "Desenvolvimento em Front-End com React + Vite, usando Bootstrap. Trabalhando como bolsista a partir do Instituto Federal Fluminense em parceria com a Fichar.io.",
            stack:
              "React · Javascript · CSS Bootstrap · Consumo de APIs · Vite",
          },
        ],
      },
      {
        value: "Vetta.Digital",
        roles: [
          {
            title: "Estagiário de desenvolvimento",
            period: "nov de 2022 - jun de 2023 · 8 meses",
            description:
              "Estágio de desenvolvimento de programas e sistemas em Javascript e Back-End em Java, mobile e desktop. Pair programming e uso de frameworks próprios da empresa.",
            stack: "React · Javascript · Java · PostGre · React Native",
          },
        ],
      },
      {
        value: "Retornar Tecnologia",
        roles: [
          {
            title: "Desenvolvedor Front-End",
            period: "nov de 2021 - ago de 2022 · 10 meses",
            description:
              "Lançamento e manutenção de landing pages feitas com HTML, CSS e Javascript, além de auxiliar na manutenção de projetos em React.js, trabalhando em conjunto com designers UI/UX.",
            stack:
              "GitFlow · Git · HTML · JavaScript · React.js · E-mails em HTML · Bootstrap · CSS",
          },
        ],
      },
      {
        value: "Aurea Empresa Júnior",
        companyMeta: "2 anos 10 meses",
        location: "Campos dos Goytacazes, Rio de Janeiro, Brasil",
        roles: [
          {
            title: "Desenvolvedor da web",
            period: "abr de 2019 - jan de 2022 · 2 anos 10 meses",
            description:
              "Primeiro contato profissional com desenvolvimento web e front-end, criando sites em WordPress e React.js.",
            stack:
              "CSS · React.js · GitFlow · Git · Informática · SASS · JavaScript · HTML",
          },
          {
            title: "Coordenador de Endomarketing",
            period: "jan de 2021 - dez de 2021 · 1 ano",
            description:
              "Coordenação de comunicação interna, ações de endomarketing e alinhamento da equipe.",
            stack:
              "Mídias sociais · Adobe Photoshop · Edição de imagens · Design gráfico · Adobe Premiere",
          },
          {
            title: "Assessor de comunicação",
            period: "abr de 2019 - jan de 2021 · 1 ano 10 meses",
            description:
              "Atuação com comunicação, marketing interno, edição de imagem e vídeo, divulgação da marca e aprendizado sobre equipe, liderança e relações com clientes.",
            stack:
              "Mídias sociais · Adobe Photoshop · Edição de imagens · Design gráfico · Adobe Premiere",
          },
        ],
      },
    ],
  },
  en: {
    hero: {
      greeting: "Hello world, my name is",
      name: "Guilherme Vilas",
      title: "Computer Engineer",
      paragraphs: [
        "I work at the intersection of technology, digital marketing, and visual creation. My current work includes content strategy for restaurants, video editing, social media, message campaigns, and Google Business Profile optimization.",
        "I have experience with Front-End development in React.js and JavaScript, plus an early background in design and photography. I graduated in engineering from",
      ],
      institute: "Instituto Federal Fluminense.",
      linkedin: "My LinkedIn",
      shareText: "Projects, blog, and astrophotography by Guilherme Barreto.",
      scrollAlt: "Scroll down",
      credit: "Image: NASA.gov",
    },
    about: {
      title: "01. About me",
      paragraphs: [
        "I am a computer engineer working at the intersection of digital product, content, and marketing operations. My path includes front-end development, React.js projects, and more recently social media, account management, and digital presence for brands and restaurants.",
        "I like working where technical decisions meet business problems: building interfaces, consuming APIs, organizing processes, creating social narratives, tracking metrics, and turning loose demands into clearer deliverables for clients and teams.",
        "Today my work connects:",
      ],
      pillars: [
        {
          title: "Strategy and content",
          text: "Editorial planning, social media narratives, creative assets, and communication consistency.",
        },
        {
          title: "Operations and relationships",
          text: "Account management, support, client routines, and expectation alignment.",
        },
        {
          title: "Product and technology",
          text: "React, JavaScript, APIs, interfaces, automations, and engineering thinking applied to real workflows.",
        },
        {
          title: "Metrics and continuous improvement",
          text: "Google Business Profile, campaigns, performance reading, and digital presence adjustments.",
        },
      ],
      credential: {
        alt: "ClickUp Power User badge",
        title: "ClickUp Power User",
        text: "Advanced user verified by ClickUp, a recognition associated with intensive use of the platform in operations, dashboards, tasks, and processes.",
        link: "See the ClickUp Verified program",
      },
    },
    sections: {
      career: "02. My career",
      projects: "03. Selected projects",
      allProjects: "See all projects",
      audiovisual: "04. Audiovisual Portfolio",
      audiovisualIntro:
        "Explore my work with video editing, visual creation, and content designed for social media.",
      audiovisualCta: "See audiovisual portfolio",
      culture: "05. Other",
      cultureIntro: "Music and films I like.",
      filmDiary: "My film diary",
      filmDiaryText: "Do not expect deep reviews.",
      openLetterboxd: "Open Letterboxd",
      contact: "05. Contact me",
      contactCopy:
        "To talk about projects, content, technology, or a good idea that is still a little loose, these are the best channels.",
      skills: "Skills:",
    },
    companies: [
      {
        value: "Food Digital",
        companyMeta: "Full-time",
        location: "Remote",
        roles: [
          {
            title: "Social Media Manager",
            periodPrefix: "Apr 2025 - Present",
            dynamicDuration: true,
            description:
              "Social media management. Video and image editing. Strategic marketing planning. Project management.",
            stack:
              "Project management · Social media advertising · Video editing · Strategic planning",
          },
        ],
      },
      {
        value: "Rush Co",
        companyMeta: "Full-time · 10 mo",
        location: "Remote",
        roles: [
          {
            title: "Account Manager",
            period: "Mar 2025 - Apr 2025 · 2 mo",
            description:
              "Project management and leadership of multidisciplinary teams. Close client relationship management, opportunity identification, expectation alignment, product/service monitoring, and crisis management.",
            stack:
              "Project management · Customer support · Social media metrics · Traffic management",
          },
          {
            title: "Social Media",
            period: "Jul 2024 - Mar 2025 · 9 mo",
            description:
              "Management, planning, structuring, and maintenance of social networks.",
            stack: "Instagram · Copywriting",
          },
        ],
      },
      {
        value: "Infinite Growth",
        companyMeta: "Full-time",
        location: "Campos dos Goytacazes · Hybrid",
        roles: [
          {
            title: "Social Media",
            period: "Jan 2024 - Jun 2024 · 6 mo",
            description:
              "Creative development for social media, including scripts and editorial concepts for campaign posts and platform content.",
            stack:
              "Idea development · Social media marketing · Visual storytelling · Video production",
          },
        ],
      },
      {
        value: "Fichar.io",
        roles: [
          {
            title: "Front-End Developer",
            period: "Jun 2023 - Jan 2024 · 8 mo",
            description:
              "Front-End development with React + Vite and Bootstrap through a partnership with Instituto Federal Fluminense.",
            stack: "React · JavaScript · Bootstrap CSS · APIs · Vite",
          },
        ],
      },
      {
        value: "Vetta.Digital",
        roles: [
          {
            title: "Development Intern",
            period: "Nov 2022 - Jun 2023 · 8 mo",
            description:
              "Internship developing systems with JavaScript, Java back-end, mobile and desktop tools, pair programming, and internal frameworks.",
            stack: "React · JavaScript · Java · PostGre · React Native",
          },
        ],
      },
      {
        value: "Retornar Tecnologia",
        roles: [
          {
            title: "Front-End Developer",
            period: "Nov 2021 - Aug 2022 · 10 mo",
            description:
              "Launch and maintenance of landing pages built with HTML, CSS, and JavaScript, plus support for React.js projects.",
            stack:
              "GitFlow · Git · HTML · JavaScript · React.js · HTML emails · Bootstrap · CSS",
          },
        ],
      },
      {
        value: "Aurea Empresa Júnior",
        companyMeta: "2 yr 10 mo",
        location: "Campos dos Goytacazes, Rio de Janeiro, Brazil",
        roles: [
          {
            title: "Web Developer",
            period: "Apr 2019 - Jan 2022 · 2 yr 10 mo",
            description:
              "First professional contact with web and front-end development, creating websites in WordPress and React.js.",
            stack:
              "CSS · React.js · GitFlow · Git · IT · SASS · JavaScript · HTML",
          },
          {
            title: "Internal Marketing Coordinator",
            period: "Jan 2021 - Dec 2021 · 1 yr",
            description:
              "Internal communication coordination, endomarketing actions, and team alignment.",
            stack:
              "Social media · Adobe Photoshop · Image editing · Graphic design · Adobe Premiere",
          },
          {
            title: "Communications Assistant",
            period: "Apr 2019 - Jan 2021 · 1 yr 10 mo",
            description:
              "Communication, internal marketing, image and video editing, brand promotion, and learning about teamwork and leadership.",
            stack:
              "Social media · Adobe Photoshop · Image editing · Graphic design · Adobe Premiere",
          },
        ],
      },
    ],
  },
};

export const getHomeContent = (locale) => ({
  ...content[locale],
  companies: content[locale].companies.map((company) => ({
    ...company,
    logo: companyLogos[company.value],
  })),
});
