export type Lesson = {
  id: string;
  title: string;
  objective: string;
  activity: string;
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
      },
      {
        id: "m1-a2",
        title: "Por que aprender espanhol",
        objective: "Criar motivacao e metas simples com os responsaveis.",
        activity: "Conversa guiada + cartao de objetivo da crianca.",
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
      },
      {
        id: "m2-a2",
        title: "Mi presentacion",
        objective: "Dizer nome, idade e origem em frases curtas.",
        activity: "Entrevista de TV em pares.",
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
      },
      {
        id: "m3-a2",
        title: "Mi casa",
        objective: "Criar frases curtas sobre rotina familiar.",
        activity: "Montagem da arvore genealogica.",
      },
    ],
  },
];
