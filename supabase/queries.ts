export const questionQuery = `
    *,
    topic:topics(*),
    user:profiles(*)
`;

export const answerQuery = `
      *,
      question:questions(
        *,
        topic:topics(*)
      ),
      user:profiles(*)
    `;
