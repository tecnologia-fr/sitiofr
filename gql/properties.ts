export const GQL_PROPERTIES_QUERY = () => {
  return `
query{
  propertyCollection{
    items{
      id
      imagesCollection{
        items{
          description
          height
          width
          title
          url
        }
      }
      destacado
      propertyType
      transactionType
      comuna
      address
      price
      priceCurrency
      totalArea
      usableArea
      bedrooms
      bathrooms
      description
    }
  }
}`;
};

export const GQL_PROPERTIES_QUERY_BY_FILTERS = () => {
  return `
query Properties(
  $transactionType: String!
  $propertyType: String
  $comuna: String
) {
  propertyCollection(
    where: {
      transactionType: $transactionType
      propertyType: $propertyType
      comuna: $comuna
    }
  ) {
    items {
      id
      imagesCollection {
        items {
          description
          height
          width
          title
          url
        }
      }
      destacado
      propertyType
      transactionType
      comuna
      address
      price
      priceCurrency
      totalArea
      usableArea
      bedrooms
      bathrooms
    }
  }
}`;
};
