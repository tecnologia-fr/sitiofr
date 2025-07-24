export const GQL_METATAGS_QUERY = (pathname: string) => {
  return `
      query ($pathname: String!) {
        pageCollection(where: {pathname :$pathname}, limit: 1) {
          items {
            seoTitle
            seoDescription
          }
        }
      }
    `;
};
