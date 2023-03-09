export const questionQuery = `
    *,
    topic:topics(*),
    user:profiles(
      *,
      is_verified:verified_users(id)
    )
`;

export const answerQuery = `
      *,
      question:questions(
        *,
        topic:topics(*)
      ),
      user:profiles(
        *,
        is_verified:verified_users(id)
      )
    `;
