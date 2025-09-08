export const GQL_PROPERTIES_QUERY = () => {
  return `
query{
  propertyCollection{
    items{
      propertyId
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
      propertyId
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
      description
    }
  }
}`;
};

export const GQL_PROPERTIES_QUERY_BY_PROPERTY_ID = () => {
  return `
query PropertiesByPropertyId(
  $propertyId: String!
) {
  propertyCollection(
    where: {
      propertyId: $propertyId
    }
  ) {
    items {
      propertyId
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
      description
    }
  }
}`;
};
