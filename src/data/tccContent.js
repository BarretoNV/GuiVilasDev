import ImagesObject from "../assets/images";

export const tccLibraryUrl = "http://bd.centro.iff.edu.br/jspui/handle/123456789/5258";

const visualImageMap = {
  methodology: ImagesObject.tccMethodologyFlow,
  gaFlow: ImagesObject.tccGAFlow,
  crossover: ImagesObject.tccCrossoverGraph,
  mutation: ImagesObject.tccMutationGraph,
  neural: ImagesObject.tccNeuralNetwork,
  boxGain: ImagesObject.tccBoxGain,
};

const resultImageMap = {
  histogram: ImagesObject.tccGainHistogram,
  topInstances: ImagesObject.tccTopInstances,
};

const content = {
  "pt-BR": {
    shareText: "Algoritmos Genéticos e Redes Neurais para o PPCCM.",
    hero: {
      kicker: "Trabalho de Conclusão de Curso",
      title:
        "Algoritmos Genéticos e Redes Neurais para o Problema da Partição Cromática de Custo Mínimo (PPCCM)",
      copy:
        "Construí um pipeline híbrido para gerar, ranquear e avaliar soluções candidatas para um problema NP-difícil em grafos, combinando busca evolutiva, aprendizado supervisionado e avaliação experimental controlada.",
      meta: [
        "IFF Campus Campos Centro",
        "Engenharia de Computação",
        "Orientador: Prof. Dr. Philippe Leal Freire dos Santos",
        "Abril de 2026",
      ],
      cta: "Ler TCC completo",
      imageAlt: "Exemplo de grafo colorido usado para ilustrar o PPCCM",
      imageCaption:
        "Coloração própria em grafo: vértices adjacentes não podem compartilhar a mesma cor. O PPCCM busca uma coloração de custo mínimo, onde cada cor tem um valor associado.",
    },
    problem: {
      label: "O problema",
      title: "Colorir grafos também pode ser uma decisão de custo.",
      paragraphs: [
        "O PPCCM pede que os vértices de um grafo recebam cores de forma que vértices adjacentes não compartilhem a mesma cor. Além da viabilidade da coloração, o objetivo é minimizar o custo total associado às cores utilizadas.",
        "Como o problema é NP-difícil, soluções exatas tendem a se tornar caras em instâncias maiores. Por isso, o trabalho investiga uma abordagem prática: usar um Algoritmo Genético para buscar boas soluções e uma rede neural treinada para avaliar e ranquear os candidatos promissores.",
      ],
    },
    approach: {
      label: "Minha abordagem",
      title: "Um pipeline de pesquisa aplicada: buscar, coletar, aprender e priorizar.",
      copy:
        "A ideia central foi tratar o GA como motor de geração de candidatos e a MLP como uma camada auxiliar de decisão. O resultado não é uma rede neural tentando resolver o PPCCM do zero, mas um fluxo que transforma a própria busca em dados para escolher melhor.",
      steps: [
        {
          title: "1. O GA gera candidatos viáveis",
          text: "O Algoritmo Genético percorre o espaço de busca criando cromossomos que representam colorações possíveis para o PPCCM.",
        },
        {
          title: "2. A coleta equilibra qualidade e diversidade",
          text: "Em pontos regulares da execução, são salvos os melhores indivíduos por custo e uma amostra aleatória dos demais.",
        },
        {
          title: "3. Cada solução vira dado de treino",
          text: "Cada cromossomo é convertido em um vetor numérico de dimensão fixa, permitindo treinar uma MLP sobre instâncias de tamanhos diferentes.",
        },
        {
          title: "4. A MLP ordena os candidatos",
          text: "O modelo prediz o desvio relativo de cada cromossomo e o ranking prioriza os menores valores previstos.",
        },
      ],
    },
    ranking: {
      label: "Ranqueamento",
      title: "Como a MLP decide quais cromossomos valem olhar primeiro.",
      paragraphs: [
        "Para cada instância, o GA produz um conjunto de candidatos. A MLP recebe cada cromossomo, estima sua qualidade relativa e ordena os candidatos do menor para o maior desvio previsto.",
        "Em termos de produto, a pergunta é simples: se existe um limite de inspeção, quais soluções entram primeiro na fila?",
      ],
      imageAlt: "Arquitetura da rede neural usada no ranqueamento",
      imageCaption:
        "A MLP opera como modelo auxiliar: ela estima qualidade relativa e apoia a seleção Top-K dos cromossomos gerados pelo GA.",
      cards: [
        {
          title: "O que a MLP aprende",
          text: "Ela aprende a estimar se um cromossomo parece próximo do melhor candidato observado na própria instância. Valor 0 significa tão bom quanto o melhor observado; valores maiores indicam piora relativa.",
        },
        {
          title: "O que ela não faz",
          text: "A rede não prevê o ótimo global e não substitui o Algoritmo Genético. Ela funciona como uma camada de priorização em cima dos candidatos que o GA já produziu.",
        },
        {
          title: "Por que ranquear",
          text: "O cenário prático é de orçamento limitado: se só posso inspecionar 10 cromossomos, faz diferença escolher quais candidatos entram nesse Top-10.",
        },
        {
          title: "Como medir a decisão",
          text: "hit@10 mede se o melhor candidato disponível apareceu entre os 10 primeiros. gain@10 compara a qualidade dessa escolha contra selecionar 10 candidatos ao acaso.",
        },
      ],
    },
    model: {
      label: "Modelo ampliado",
      title: "O Modelo B mede o efeito de treinar com mais diversidade.",
      copy:
        "Depois do ajuste de hiperparâmetros, a configuração vencedora foi mantida fixa. A comparação entre Modelo A e Modelo B isola uma pergunta metodológica: ampliar o conjunto de treino melhora a priorização dos candidatos?",
      cards: [
        {
          title: "Modelo A",
          eyebrow: "Treino inicial",
          text: "MLP treinada com cromossomos coletados a partir das 20 instâncias iniciais. Foi a primeira versão final avaliada no conjunto fixo de teste.",
        },
        {
          title: "Modelo B",
          eyebrow: "Treino ampliado",
          text: "A mesma configuração vencedora foi treinada novamente com 70 instâncias: as 20 iniciais mais 50 novas instâncias adicionadas ao treinamento.",
        },
        {
          title: "O que foi comparado",
          eyebrow: "Mesma arquitetura, mais diversidade",
          text: "A comparação não troca a arquitetura da MLP. Ela mede o efeito de aumentar a diversidade do conjunto de treino sobre o ranqueamento.",
        },
      ],
      outcomeLabel: "Resultado observado:",
      outcome:
        "o Modelo B elevou o hit@10 de 0,18 para 0,24, aumentando a chance de colocar o melhor candidato disponível entre os 10 primeiros do ranking.",
    },
    rigor: {
      label: "Rigor metodológico",
      title: "O ponto forte do trabalho não foi só rodar modelos, foi controlar o experimento.",
      copy:
        "A pesquisa foi desenhada para evitar conclusões fáceis: separou instâncias, controlou orçamento de execução, registrou resultados parciais e avaliou a rede neural com protocolos que reduzem vazamento e melhoram rastreabilidade.",
      cards: [
        { title: "Separação por instância", text: "Cromossomos de uma mesma instância não aparecem simultaneamente em treino e teste, reduzindo risco de vazamento de informação." },
        { title: "GroupKFold no ajuste", text: "O tuning valida o modelo em grupos de instâncias não vistas, aproximando a avaliação do cenário real de generalização." },
        { title: "Grid search controlado", text: "Foram avaliadas 81 configurações de MLP, com seleção baseada principalmente em RMSE para penalizar erros grandes." },
        { title: "Pipeline sem vazamento", text: "O StandardScaler fica dentro do pipeline, ajustado apenas nos dados de treino de cada partição antes da regressão com MLP." },
        { title: "Execuções reprodutíveis", text: "Múltiplas sementes, limite de tempo por instância e parâmetros fixos tornam as comparações auditáveis." },
        { title: "Persistência experimental", text: "Resultados parciais, logs e locks permitem retomar execuções longas e evitar duplicação de trabalho em ambiente paralelo." },
      ],
    },
    visuals: {
      label: "Visualização",
      title: "Da heurística evolutiva ao modelo de ranqueamento.",
      items: [
        { key: "methodology", title: "Pipeline metodológico", description: "Visão geral da integração entre execução do GA, coleta de populações, treinamento e avaliação do modelo neural." },
        { key: "gaFlow", title: "Fluxo do algoritmo genético", description: "Estrutura evolutiva usada para inicializar, avaliar, selecionar, cruzar, mutar e formar novas populações." },
        { key: "crossover", title: "Operadores sobre grafos", description: "Cruzamento e mutação alteram candidatos mantendo a busca por colorações viáveis e de menor custo." },
        { key: "mutation", title: "Mutação de candidatos", description: "A mutação introduz variações controladas na população, ajudando a explorar novas regiões do espaço de busca." },
        { key: "neural", title: "Rede neural auxiliar", description: "A MLP aprende a ranquear cromossomos produzidos pelo GA, apoiando decisões de seleção sob orçamento limitado." },
        { key: "boxGain", title: "Distribuição de ganho", description: "Os resultados com gain@10 mostram que a melhoria existe em parte das instâncias, mas ainda não é uniforme." },
      ],
    },
    results: {
      label: "Resultados",
      title: "O GA foi o motor principal; a MLP funcionou como apoio.",
      paragraphs: [
        "O Algoritmo Genético atingiu o melhor valor conhecido em 29 instâncias do conjunto de teste. Na etapa de ranqueamento, o modelo treinado com conjunto ampliado elevou o hit@10 de 0,18 para 0,24 em relação ao modelo inicial.",
        "Os ganhos por gain@10 permaneceram modestos em muitas instâncias e ficaram próximos de zero em parte do conjunto. Isso é justamente a leitura madura do experimento: a abordagem é promissora para priorização sob orçamento limitado, mas não deve ser vendida como se a IA resolvesse tudo sozinha.",
      ],
      highlights: [
        { value: "29", label: "instâncias em que o GA atingiu o melhor valor conhecido" },
        { value: "0,18 → 0,24", label: "evolução do hit@10 com o conjunto ampliado" },
        { value: "GA + MLP", label: "pipeline híbrido para geração e ranqueamento de candidatos" },
      ],
      images: [
        { key: "histogram", title: "Variação do ganho" },
        { key: "topInstances", title: "Melhores ganhos por instância" },
      ],
    },
    conclusion: {
      label: "Conclusão técnica",
      title: "O aprendizado de máquina entra como componente de priorização.",
      copy:
        "A pesquisa mostrou que a estratégia GA → base de cromossomos → MLP para ranqueamento é viável e reprodutível. O resultado mais interessante não é trocar a heurística por uma rede neural, mas usar dados gerados pela própria busca para apoiar escolhas futuras.",
      boxTitle: "Texto completo",
      boxText:
        "O trabalho está disponível na Biblioteca Digital Anton Dakitsch do IFF Campus Campos Centro.",
      boxCta: "Abrir na biblioteca digital",
    },
  },
  en: {
    shareText: "Genetic Algorithms and Neural Networks for the MCCP.",
    hero: {
      kicker: "Final undergraduate thesis",
      title:
        "Genetic Algorithms and Neural Networks for the Minimum Cost Chromatic Partition Problem (MCCP)",
      copy:
        "I built a hybrid pipeline to generate, rank, and evaluate candidate solutions for an NP-hard graph problem, combining evolutionary search, supervised learning, and controlled experimental evaluation.",
      meta: [
        "IFF Campus Campos Centro",
        "Computer Engineering",
        "Advisor: Prof. Dr. Philippe Leal Freire dos Santos",
        "April 2026",
      ],
      cta: "Read full thesis",
      imageAlt: "Colored graph example used to illustrate the MCCP",
      imageCaption:
        "Proper graph coloring: adjacent vertices cannot share the same color. The MCCP seeks a minimum-cost coloring where each color has an associated value.",
    },
    problem: {
      label: "The problem",
      title: "Coloring graphs can also be a cost decision.",
      paragraphs: [
        "The MCCP asks graph vertices to receive colors so that adjacent vertices do not share the same color. Beyond feasibility, the goal is to minimize the total cost associated with the colors used.",
        "Because the problem is NP-hard, exact solutions tend to become expensive on larger instances. The work investigates a practical approach: using a Genetic Algorithm to search for good solutions and a neural network to evaluate and rank promising candidates.",
      ],
    },
    approach: {
      label: "My approach",
      title: "An applied research pipeline: search, collect, learn, and prioritize.",
      copy:
        "The central idea was to treat the GA as a candidate-generation engine and the MLP as an auxiliary decision layer. The result is not a neural network solving the MCCP from scratch, but a flow that turns the search itself into data for better choices.",
      steps: [
        { title: "1. The GA generates feasible candidates", text: "The Genetic Algorithm explores the search space by creating chromosomes that represent possible MCCP colorings." },
        { title: "2. Collection balances quality and diversity", text: "At regular points, the best individuals by cost and a random sample of the others are saved." },
        { title: "3. Each solution becomes training data", text: "Each chromosome is converted into a fixed-size numeric vector, allowing an MLP to train across different instance sizes." },
        { title: "4. The MLP ranks candidates", text: "The model predicts the relative deviation of each chromosome and prioritizes the lowest predicted values." },
      ],
    },
    ranking: {
      label: "Ranking",
      title: "How the MLP decides which chromosomes deserve attention first.",
      paragraphs: [
        "For each instance, the GA produces a set of candidates. The MLP receives each chromosome, estimates its relative quality, and orders candidates from lowest to highest predicted deviation.",
        "In product terms, the question is simple: if inspection budget is limited, which solutions should enter the queue first?",
      ],
      imageAlt: "Neural network architecture used for ranking",
      imageCaption:
        "The MLP acts as an auxiliary model: it estimates relative quality and supports Top-K selection of chromosomes generated by the GA.",
      cards: [
        { title: "What the MLP learns", text: "It learns to estimate whether a chromosome seems close to the best candidate observed in its instance." },
        { title: "What it does not do", text: "The network does not predict the global optimum and does not replace the Genetic Algorithm. It works as a prioritization layer." },
        { title: "Why ranking matters", text: "In a limited-budget scenario, choosing which 10 chromosomes to inspect can make a real difference." },
        { title: "How the decision is measured", text: "hit@10 checks whether the best candidate appears in the top 10; gain@10 compares this choice against random selection." },
      ],
    },
    model: {
      label: "Expanded model",
      title: "Model B measures the effect of training with more diversity.",
      copy:
        "After hyperparameter tuning, the winning configuration was kept fixed. The comparison between Model A and Model B isolates one methodological question: does expanding the training set improve candidate prioritization?",
      cards: [
        { title: "Model A", eyebrow: "Initial training", text: "MLP trained with chromosomes collected from the initial 20 instances." },
        { title: "Model B", eyebrow: "Expanded training", text: "The same winning configuration was trained again with 70 instances." },
        { title: "What was compared", eyebrow: "Same architecture, more diversity", text: "The comparison measures the effect of increasing training-set diversity on ranking." },
      ],
      outcomeLabel: "Observed result:",
      outcome:
        "Model B increased hit@10 from 0.18 to 0.24, improving the chance of placing the best available candidate among the top 10 ranked solutions.",
    },
    rigor: {
      label: "Methodological rigor",
      title: "The strongest part of the work was not just running models, but controlling the experiment.",
      copy:
        "The research was designed to avoid easy conclusions: it separated instances, controlled execution budget, logged partial results, and evaluated the neural network with protocols that reduce leakage and improve traceability.",
      cards: [
        { title: "Instance separation", text: "Chromosomes from the same instance do not appear in both training and test sets." },
        { title: "GroupKFold tuning", text: "Tuning validates the model on groups of unseen instances." },
        { title: "Controlled grid search", text: "81 MLP configurations were evaluated." },
        { title: "Leakage-safe pipeline", text: "The StandardScaler stays inside the pipeline and is fitted only on training data." },
        { title: "Reproducible runs", text: "Multiple seeds, time limits, and fixed parameters make comparisons auditable." },
        { title: "Experimental persistence", text: "Partial results, logs, and locks allow long runs to resume safely." },
      ],
    },
    visuals: {
      label: "Visualization",
      title: "From evolutionary heuristic to ranking model.",
      items: [
        { key: "methodology", title: "Methodological pipeline", description: "Overview of the integration between GA execution, collection, training, and evaluation." },
        { key: "gaFlow", title: "Genetic algorithm flow", description: "Evolutionary structure used to initialize, evaluate, select, cross, mutate, and form populations." },
        { key: "crossover", title: "Graph operators", description: "Crossover and mutation alter candidates while preserving the search for feasible colorings." },
        { key: "mutation", title: "Candidate mutation", description: "Mutation introduces controlled variation into the population." },
        { key: "neural", title: "Auxiliary neural network", description: "The MLP learns to rank chromosomes produced by the GA." },
        { key: "boxGain", title: "Gain distribution", description: "gain@10 results show improvement on part of the instances." },
      ],
    },
    results: {
      label: "Results",
      title: "The GA was the main engine; the MLP worked as support.",
      paragraphs: [
        "The Genetic Algorithm reached the best known value in 29 test instances. In the ranking stage, the model trained with the expanded set increased hit@10 from 0.18 to 0.24.",
        "gain@10 improvements remained modest in many instances. The approach is promising for limited-budget prioritization, but it should not be framed as if AI solved everything alone.",
      ],
      highlights: [
        { value: "29", label: "instances where the GA reached the best known value" },
        { value: "0.18 → 0.24", label: "hit@10 improvement with the expanded set" },
        { value: "GA + MLP", label: "hybrid pipeline for candidate generation and ranking" },
      ],
      images: [
        { key: "histogram", title: "Gain variation" },
        { key: "topInstances", title: "Best gains by instance" },
      ],
    },
    conclusion: {
      label: "Technical conclusion",
      title: "Machine learning enters as a prioritization component.",
      copy:
        "The research showed that the GA → chromosome base → MLP ranking strategy is viable and reproducible. The most interesting result is not replacing the heuristic with a neural network, but using data generated by the search itself to support future choices.",
      boxTitle: "Full text",
      boxText:
        "The thesis is available at the Anton Dakitsch Digital Library of IFF Campus Campos Centro.",
      boxCta: "Open in the digital library",
    },
  },
};

export const getTccContent = (locale) => ({
  ...content[locale],
  visuals: {
    ...content[locale].visuals,
    items: content[locale].visuals.items.map((item) => ({
      ...item,
      image: visualImageMap[item.key],
    })),
  },
  results: {
    ...content[locale].results,
    images: content[locale].results.images.map((item) => ({
      ...item,
      image: resultImageMap[item.key],
    })),
  },
});
