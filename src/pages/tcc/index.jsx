import { Button, Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/Footer";
import NavBar from "../../components/navbar";
import ShareButton from "../../components/ShareButton";
import ImagesObject from "../../assets/images";
import "./style.css";

const tccLibraryUrl = "http://bd.centro.iff.edu.br/jspui/handle/123456789/5258";

const highlights = [
  {
    value: "29",
    label: "instâncias em que o GA atingiu o melhor valor conhecido",
  },
  {
    value: "0,18 → 0,24",
    label: "evolução do hit@10 com o conjunto ampliado",
  },
  {
    value: "GA + MLP",
    label: "pipeline híbrido para geração e ranqueamento de candidatos",
  },
];

const approachSteps = [
  {
    title: "1. O GA gera candidatos viáveis",
    text: "O Algoritmo Genético percorre o espaço de busca criando cromossomos que representam colorações possíveis para o PPCCM.",
  },
  {
    title: "2. A coleta equilibra qualidade e diversidade",
    text: "Em pontos regulares da execução, são salvos os melhores indivíduos por custo (Top-K) e uma amostra aleatória dos demais (Rand-K).",
  },
  {
    title: "3. Cada solução vira dado de treino",
    text: "Cada cromossomo é convertido em um vetor numérico de dimensão fixa, permitindo treinar uma MLP sobre instâncias de tamanhos diferentes.",
  },
  {
    title: "4. A MLP ordena os candidatos",
    text: "O modelo prediz o desvio relativo de cada cromossomo e o ranking prioriza os menores valores previstos.",
  },
];

const rankingCards = [
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
];

const modelCards = [
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
];

const rigorCards = [
  {
    title: "Separação por instância",
    text: "Cromossomos de uma mesma instância não aparecem simultaneamente em treino e teste, reduzindo risco de vazamento de informação.",
  },
  {
    title: "GroupKFold no ajuste",
    text: "O tuning valida o modelo em grupos de instâncias não vistas, aproximando a avaliação do cenário real de generalização.",
  },
  {
    title: "Grid search controlado",
    text: "Foram avaliadas 81 configurações de MLP, com seleção baseada principalmente em RMSE para penalizar erros grandes.",
  },
  {
    title: "Pipeline sem vazamento",
    text: "O StandardScaler fica dentro do pipeline, ajustado apenas nos dados de treino de cada partição antes da regressão com MLP.",
  },
  {
    title: "Execuções reprodutíveis",
    text: "Múltiplas sementes, limite de tempo por instância e parâmetros fixos tornam as comparações mais auditáveis.",
  },
  {
    title: "Persistência experimental",
    text: "Resultados parciais, logs e locks permitem retomar execuções longas e evitar duplicação de trabalho em ambiente paralelo.",
  },
];

const visualSections = [
  {
    title: "Pipeline metodológico",
    description:
      "Visão geral da integração entre execução do GA, coleta de populações, treinamento e avaliação do modelo neural.",
    image: ImagesObject.tccMethodologyFlow,
  },
  {
    title: "Fluxo do algoritmo genético",
    description:
      "Estrutura evolutiva usada para inicializar, avaliar, selecionar, cruzar, mutar e formar novas populações.",
    image: ImagesObject.tccGAFlow,
  },
  {
    title: "Operadores sobre grafos",
    description:
      "Cruzamento e mutação alteram candidatos mantendo a busca por colorações viáveis e de menor custo.",
    image: ImagesObject.tccCrossoverGraph,
  },
  {
    title: "Mutação de candidatos",
    description:
      "A mutação introduz variações controladas na população, ajudando a explorar novas regiões do espaço de busca.",
    image: ImagesObject.tccMutationGraph,
  },
  {
    title: "Rede neural auxiliar",
    description:
      "A MLP aprende a ranquear cromossomos produzidos pelo GA, apoiando decisões de seleção sob orçamento limitado.",
    image: ImagesObject.tccNeuralNetwork,
  },
  {
    title: "Distribuição de ganho",
    description:
      "Os resultados com gain@10 mostram que a melhoria existe em parte das instâncias, mas ainda não é uniforme.",
    image: ImagesObject.tccBoxGain,
  },
];

const resultImages = [
  {
    title: "Variação do ganho",
    image: ImagesObject.tccGainHistogram,
  },
  {
    title: "Melhores ganhos por instância",
    image: ImagesObject.tccTopInstances,
  },
];

export default function Tcc() {
  return (
    <>
      <NavBar />
      <main className="tcc-page text-light">
        <section className="tcc-hero">
          <Container>
            <Row className="align-items-center g-4">
              <Col lg={7}>
                <p className="tcc-kicker">Trabalho de Conclusão de Curso</p>
                <h2>
                  Algoritmos Genéticos e Redes Neurais para o Problema da
                  Partição Cromática de Custo Mínimo (PPCCM)
                </h2>
                <p className="tcc-hero-copy">
                  Construí um pipeline híbrido para gerar, ranquear e avaliar
                  soluções candidatas para um problema NP-difícil em grafos,
                  combinando busca evolutiva, aprendizado supervisionado e
                  avaliação experimental controlada.
                </p>
                <div className="tcc-meta-list" aria-label="Dados do TCC">
                  <span>IFF Campus Campos Centro</span>
                  <span>Engenharia de Computação</span>
                  <span>
                    Orientador: Prof. Dr. Philippe Leal Freire dos Santos
                  </span>
                  <span>Abril de 2026</span>
                </div>
                <div className="tcc-actions">
                  <Button
                    href={tccLibraryUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="outline-primary"
                    size="lg"
                  >
                    Ler TCC completo
                  </Button>
                  <ShareButton
                    title="TCC - Gui Vilas"
                    text="Algoritmos Genéticos e Redes Neurais para o PPCCM."
                    path="/tcc"
                    imagePath="/social/og-default.png"
                  />
                </div>
              </Col>
              <Col lg={5}>
                <figure className="tcc-hero-figure">
                  <img
                    src={ImagesObject.tccGraphExample}
                    alt="Exemplo de grafo colorido usado para ilustrar o PPCCM"
                  />
                  <figcaption>
                    Coloração própria em grafo: Vértices adjacentes não podem
                    compartilhar a mesma cor. O PPCCM busca uma coloração de
                    custo mínimo, onde cada cor tem um valor associado.
                  </figcaption>
                </figure>
              </Col>
            </Row>
          </Container>
        </section>

        <Container>
          <section className="tcc-section tcc-problem-section">
            <Row className="g-4">
              <Col lg={5}>
                <p className="tcc-section-label">O problema</p>
                <h2>Colorir grafos também pode ser uma decisão de custo.</h2>
              </Col>
              <Col lg={7}>
                <p>
                  O PPCCM pede que os vértices de um grafo recebam cores de
                  forma que vértices adjacentes não compartilhem a mesma cor.
                  Além da viabilidade da coloração, o objetivo é minimizar o
                  custo total associado às cores utilizadas.
                </p>
                <p>
                  Como o problema é NP-difícil, soluções exatas tendem a se
                  tornar caras em instâncias maiores. Por isso, o trabalho
                  investiga uma abordagem prática: usar um Algoritmo Genético
                  para buscar boas soluções e uma rede neural treinada para
                  avaliar e ranquear os candidatos promissores.
                </p>
              </Col>
            </Row>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">Minha abordagem</p>
              <h2>
                Um pipeline de pesquisa aplicada: buscar, coletar, aprender e
                priorizar.
              </h2>
              <p>
                A ideia central foi tratar o GA como motor de geração de
                candidatos e a MLP como uma camada auxiliar de decisão. O
                resultado não é uma rede neural tentando resolver o PPCCM do
                zero, mas um fluxo que transforma a própria busca em dados para
                escolher melhor.
              </p>
            </div>
            <div className="tcc-approach-grid">
              {approachSteps.map((step) => (
                <article className="tcc-approach-item" key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="tcc-section tcc-ranking-section">
            <Row className="g-4 align-items-center">
              <Col lg={5}>
                <p className="tcc-section-label">Ranqueamento</p>
                <h2>
                  Como a MLP decide quais cromossomos valem olhar primeiro.
                </h2>
                <p>
                  Para cada instância, o GA produz um conjunto de candidatos. A
                  MLP recebe cada cromossomo, estima sua qualidade relativa e
                  ordena os candidatos do menor para o maior desvio previsto.
                </p>
                <p>
                  Em termos de produto, a pergunta é simples: se existe um
                  limite de inspeção, quais soluções entram primeiro na fila?
                </p>
              </Col>
              <Col lg={7}>
                <figure className="tcc-feature-figure">
                  <img
                    src={ImagesObject.tccNeuralNetwork}
                    alt="Arquitetura da rede neural usada no ranqueamento"
                    loading="lazy"
                  />
                  <figcaption>
                    A MLP opera como modelo auxiliar: ela estima qualidade
                    relativa e apoia a seleção Top-K dos cromossomos gerados
                    pelo GA.
                  </figcaption>
                </figure>
              </Col>
            </Row>
            <div className="tcc-insight-grid">
              {rankingCards.map((card) => (
                <article className="tcc-insight-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">Modelo ampliado</p>
              <h2>O Modelo B mede o efeito de treinar com mais diversidade.</h2>
              <p>
                Depois do ajuste de hiperparâmetros, a configuração vencedora
                foi mantida fixa. A comparação entre Modelo A e Modelo B isola
                uma pergunta metodológica: ampliar o conjunto de treino melhora
                a priorização dos candidatos?
              </p>
            </div>
            <div className="tcc-model-grid">
              {modelCards.map((card) => (
                <article className="tcc-model-card" key={card.title}>
                  <span>{card.eyebrow}</span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
            <div className="tcc-model-outcome">
              <strong>Resultado observado:</strong>
              <span>
                o Modelo B elevou o hit@10 de 0,18 para 0,24, aumentando a
                chance de colocar o melhor candidato disponível entre os 10
                primeiros do ranking.
              </span>
            </div>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">Rigor metodológico</p>
              <h2>
                O ponto forte do trabalho não foi só rodar modelos, foi
                controlar o experimento.
              </h2>
              <p>
                A pesquisa foi desenhada para evitar conclusões fáceis: separou
                instâncias, controlou orçamento de execução, registrou
                resultados parciais e avaliou a rede neural com protocolos que
                reduzem vazamento e melhoram rastreabilidade.
              </p>
            </div>
            <div className="tcc-rigor-grid">
              {rigorCards.map((card) => (
                <article className="tcc-rigor-card" key={card.title}>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="tcc-section">
            <div className="tcc-section-heading">
              <p className="tcc-section-label">Visualização</p>
              <h2>Da heurística evolutiva ao modelo de ranqueamento.</h2>
            </div>
            <div className="tcc-visual-grid">
              {visualSections.map((item) => (
                <figure className="tcc-visual-item" key={item.title}>
                  <img src={item.image} alt={item.title} loading="lazy" />
                  <figcaption>
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className="tcc-section tcc-results-section">
            <Row className="g-4 align-items-start">
              <Col lg={5}>
                <p className="tcc-section-label">Resultados</p>
                <h2>O GA foi o motor principal; a MLP funcionou como apoio.</h2>
                <p>
                  O Algoritmo Genético atingiu o melhor valor conhecido em 29
                  instâncias do conjunto de teste. Na etapa de ranqueamento, o
                  modelo treinado com conjunto ampliado elevou o hit@10 de 0,18
                  para 0,24 em relação ao modelo inicial.
                </p>
                <p>
                  Os ganhos por gain@10 permaneceram modestos em muitas
                  instâncias e ficaram próximos de zero em parte do conjunto.
                  Isso é justamente a leitura madura do experimento: a abordagem
                  é promissora para priorização sob orçamento limitado, mas não
                  deve ser vendida como se a IA resolvesse tudo sozinha.
                </p>
              </Col>
              <Col lg={7}>
                <div className="tcc-highlight-grid">
                  {highlights.map((highlight) => (
                    <article className="tcc-highlight" key={highlight.value}>
                      <strong>{highlight.value}</strong>
                      <span>{highlight.label}</span>
                    </article>
                  ))}
                </div>
                <div className="tcc-result-images">
                  {resultImages.map((item) => (
                    <figure key={item.title}>
                      <img src={item.image} alt={item.title} loading="lazy" />
                      <figcaption>{item.title}</figcaption>
                    </figure>
                  ))}
                </div>
              </Col>
            </Row>
          </section>

          <section className="tcc-section tcc-conclusion-section">
            <Row className="g-4 align-items-center">
              <Col lg={7}>
                <p className="tcc-section-label">Conclusão técnica</p>
                <h2>
                  O aprendizado de máquina entra como componente de priorização.
                </h2>
                <p>
                  A pesquisa mostrou que a estratégia GA → base de cromossomos →
                  MLP para ranqueamento é viável e reprodutível. O resultado
                  mais interessante não é trocar a heurística por uma rede
                  neural, mas usar dados gerados pela própria busca para apoiar
                  escolhas futuras.
                </p>
              </Col>
              <Col lg={5}>
                <div className="tcc-final-cta">
                  <h3>Texto completo</h3>
                  <p>
                    O trabalho está disponível na Biblioteca Digital Anton
                    Dakitsch do IFF Campus Campos Centro.
                  </p>
                  <Button
                    href={tccLibraryUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                  >
                    Abrir na biblioteca digital
                  </Button>
                </div>
              </Col>
            </Row>
          </section>
        </Container>
      </main>
      <Footer />
    </>
  );
}
