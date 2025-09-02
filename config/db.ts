import { fetchContentful } from "@/utils/fetchContentful";
import { GQL_CTA_SECTION_QUERY } from "@/gql/ctaSection";
import { GQL_BANNER_QUERY } from "@/gql/banner";
import { GQL_METATAGS_QUERY } from "@/gql/metaTags";
import { GQL_PAGE_COMPONENTS_QUERY } from "@/gql/pageComponents";
import { GQL_COLUMN_SECTION_QUERY } from "@/gql/columnSection";
import { GQL_ACCORDION_SECTION_QUERY } from "@/gql/accordionSection";
import { GQL_CAROUSEL_CTA_QUERY } from "@/gql/carousel";
import { GQL_PROPERTIES_QUERY } from "@/gql/properties";
import { PropertyT } from "@/typings";

const fetchPageComponents = async (pathname: string) => {
  const query = GQL_PAGE_COMPONENTS_QUERY();

  const variables = {
    pathname: pathname,
  };
  const res = await fetchContentful(query, variables);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch page components");
  }
  const pageComponents = await res.json();

  const componentsToFetch =
    pageComponents.data.pageCollection.items[0].componentsCollection.items.map(
      (item: { sys: { id: string }; __typename: string }) => {
        return {
          id: item.sys?.id,
          __typename: item.__typename,
        };
      }
    );

  return componentsToFetch;
};

const fetchMetaTagsFromContentful = async (pathname: string) => {
  const query = GQL_METATAGS_QUERY(pathname);

  const variables = {
    pathname: pathname,
  };

  const res = await fetchContentful(query, variables);

  if (!res.ok) {
    throw new Error("Failed to fetch page components");
  }

  const { data } = await res.json();

  const metaTags = data?.pageCollection?.items?.[0];

  return {
    title: metaTags?.seoTitle || "",
    description: metaTags?.seoDescription || "",
    alternates: {
      canonical: `${process.env.BASE_URL}${pathname}` || "",
    },
  };
};

const fetchCTASectionById = async (id: string) => {
  const query = GQL_CTA_SECTION_QUERY();
  const variables = {
    id: id,
  };

  try {
    const res = await fetchContentful(query, variables);

    const { data } = await res.json();
    const ctaSection = data.ctaSection;
    return ctaSection;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchBannerById = async (id: string) => {
  const query = GQL_BANNER_QUERY();
  const variables = {
    id: id,
  };

  const res = await fetchContentful(query, variables);

  if (!res.ok) {
    throw new Error("Failed to fetch banner");
  }

  const { data } = await res.json();

  const banner = data.banner;
  return banner;
};

const fetchColumnSectionById = async (id: string) => {
  const query = GQL_COLUMN_SECTION_QUERY();
  const variables = { id };

  try {
    const res = await fetchContentful(query, variables);
    const { data } = await res.json();
    let columnSection = data.columnSection;
    columnSection.columns = columnSection.columnsCollection.items;
    return columnSection;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchAccordionSectionById = async (id: string) => {
  const query = GQL_ACCORDION_SECTION_QUERY();
  const variables = { id };

  try {
    const res = await fetchContentful(query, variables);
    const { data } = await res.json();
    let accordionSection = data.accordionSection;
    accordionSection.items = accordionSection.itemsCollection.items;
    return accordionSection;
  } catch (e) {
    console.error(e);
    return null;
  }
};

const fetchCarouselCTAById = async (id: string) => {
  const query = GQL_CAROUSEL_CTA_QUERY();
  const variables = { id };

  const res = await fetchContentful(query, variables);
  if (!res.ok) {
    throw new Error("Failed to fetch carousel");
  }

  const { data } = await res.json();
  const carousel = data.carousel;
  return carousel;
};

const fetchProperties = async () => {
  const query = GQL_PROPERTIES_QUERY();
  const res = await fetchContentful(query);
  const { data } = await res.json();
  const properties = data.propertyCollection.items;
  return properties;
};

export {
  fetchCTASectionById,
  fetchBannerById,
  fetchMetaTagsFromContentful,
  fetchPageComponents,
  fetchColumnSectionById,
  fetchAccordionSectionById,
  fetchCarouselCTAById,
  fetchProperties,
};
