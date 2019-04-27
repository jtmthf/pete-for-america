import React from 'react';
import { Title, Meta } from 'react-head';
import { useStaticQuery, graphql } from 'gatsby';
import { useHtmlAttributes } from 'react-document-attributes';

type SEOProps = {
  description: string;
  lang: string;
  meta: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  keywords: string[];
  title: string;
};

function SEO({ description, lang, meta, keywords, title }: SEOProps) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `,
  );
  useHtmlAttributes({ lang });

  const metaDescription = description || site.siteMetadata.description;

  return (
    <>
      <Title>
        {title} | {site.siteMetadata.title}
      </Title>
      <Meta name="description" content={metaDescription} />
      <Meta name="og:title" content={title} />
      <Meta name="og:description" content={metaDescription} />
      <Meta name="og:type" content="website" />
      <Meta name="twitter:card" content="summary" />
      <Meta name="twitter:creator" content={site.siteMetadata.author} />
      <Meta name="twitter:title" content={title} />
      <Meta name="twitter:description" content={metaDescription} />
      {keywords && <Meta name="keywords" content={keywords.join(', ')} />}
      {meta.map(props => (
        <Meta key={props.name} {...props} />
      ))}
    </>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  keywords: [],
  description: ``,
};

export default SEO;
