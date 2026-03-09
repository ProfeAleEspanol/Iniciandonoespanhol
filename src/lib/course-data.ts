export type Lesson = {
  id: string;
  title: string;
  objective: string;
  activity: string;
  hook: string;
  practice: string;
  homeMission: string;
};

export type Module = {
  id: string;
  title: string;
  summary: string;
  lessons: Lesson[];
};

export const modules: Module[] = [
  {
    id: "m1",
    title: "Boas-vindas e motivacao",
    summary: "Abertura do curso com apresentacao da Profe Ale e meta da familia.",
    lessons: [
      {
        id: "m1-a1",
        title: "Quem e a Profe Ale",
        objective: "Ouvir espanhol em contexto real e reconhecer palavras-chave.",
        activity: "Assistir video curto + jogo 'o que eu entendi?'.",
        hook: "Video de boas-vindas com palavras simples e gestos de apoio.",
        practice: "Repetir as palavras que a crianca reconhecer e apontar imagens correspondentes.",
        homeMission: "Contar para a familia tres palavras novas ouvidas na aula.",
      },
      {
        id: "m1-a2",
        title: "Por que aprender espanhol",
        objective: "Criar motivacao e metas simples com os responsaveis.",
        activity: "Conversa guiada + cartao de objetivo da crianca.",
        hook: "Conversar sobre desenhos, viagens e musicas em espanhol.",
        practice: "Escolher um motivo para aprender espanhol e desenhar essa meta.",
        homeMission: "Guardar o cartao da meta em um lugar visivel da casa.",
      },
    ],
  },
  {
    id: "m2",
    title: "Saudacoes e apresentacoes",
    summary: "Cumprimentar, falar nome, idade e preferencias.",
    lessons: [
      {
        id: "m2-a1",
        title: "Los saludos",
        objective: "Usar saudacoes formais e informais em espanhol.",
        activity: "Bingo de saudacoes em dupla.",
        hook: "Escutar saudacoes comuns e identificar o momento certo de usar cada uma.",
        practice: "Fazer rodadas curtas de cumprimento com voz, gesto e expressao facial.",
        homeMission: "Cumprimentar duas pessoas em espanhol durante o dia.",
      },
      {
        id: "m2-a2",
        title: "Mi presentacion",
        objective: "Dizer nome, idade e origem em frases curtas.",
        activity: "Entrevista de TV em pares.",
        hook: "Modelos simples de apresentacao com nome, idade e cidade.",
        practice: "Gravar ou encenar uma mini entrevista com a crianca.",
        homeMission: "Treinar a apresentacao completa na frente do espelho.",
      },
    ],
  },
  {
    id: "m3",
    title: "Familia e hogar",
    summary: "Vocabulos de familia e descricao basica do lar.",
    lessons: [
      {
        id: "m3-a1",
        title: "Mi familia",
        objective: "Nomear membros da familia.",
        activity: "Flashcards + jogo 'quem e quem?'.",
        hook: "Apresentar pai, mae, irmao, irma e avos com figuras coloridas.",
        practice: "Montar pares entre personagem e vocabulario da familia.",
        homeMission: "Mostrar uma foto da familia e nomear pelo menos tres pessoas em espanhol.",
      },
      {
        id: "m3-a2",
        title: "Mi casa",
        objective: "Criar frases curtas sobre rotina familiar.",
        activity: "Montagem da arvore genealogica.",
        hook: "Relacionar comodos da casa com a rotina da crianca.",
        practice: "Dizer frases curtas sobre onde a familia come, dorme e brinca.",
        homeMission: "Escolher um comodo da casa e descreve-lo com ajuda da familia.",
      },
    ],
  },
];

export type LessonWithModule = Lesson & {
  moduleId: string;
  moduleTitle: string;
  moduleSummary: string;
};

export const allLessons: LessonWithModule[] = modules.flatMap((module) =>
  module.lessons.map((lesson) => ({
    ...lesson,
    moduleId: module.id,
    moduleTitle: module.title,
    moduleSummary: module.summary,
  })),
);

export function getLessonById(lessonId: string) {
  return allLessons.find((lesson) => lesson.id === lessonId) ?? null;
}
