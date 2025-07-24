export const GQL_COLUMN_SECTION_QUERY = () => {
  return `

  query ($id: String!) {
    columnSection(id:$id){
      name
      title
      desc
      bgColor
      textColor
      gridCols
      columnsCollection {
        items {
          name
          title
          desc
          bgColor
          textColor
          image {
            title
            url
            description
            width
            height
            sys {
              id
            }
          }
          isImageFull
          imageRound
          btnBgColor
          btnTextColor
          btnText
          btnLink
        }
      }
    }
  }`;
};
