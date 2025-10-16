export const GQL_PROPERTIES_QUERY = () => {
  return `
query{
  propertyCollection{
    items{
      propertyId
      name
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
      parking
      storeroom
      orientation
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
      name
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
      parking
      storeroom
      orientation
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
      name
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
      parking
      storeroom
      orientation
      description
      mapa {
        description
        height
        width
        title
        url
      }
      highlights
      requirements
    }
  }
}`;
};
