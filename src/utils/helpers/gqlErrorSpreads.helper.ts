const errorSpreads = `
      ... on ServerError {
        message
      }
      ... on Unauthenticated {
        message
      }
      ... on Unauthorized {
        message
        }
    `;

export default errorSpreads;