export const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3009"
    : process.env.BASE_URL ??
      ("https://" +
        (
          process.env.VERCEL_ENV === "production"
            ? process.env.VERCEL_PROJECT_PRODUCTION_URL
            : process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
        ));
