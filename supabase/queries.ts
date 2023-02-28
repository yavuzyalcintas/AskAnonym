export const questionQuery = `
    *,
    answers (
        *,
        user:profiles (
        username,
        avatar_url
        )
    ),
    topic:topics (
        *
    )
`;