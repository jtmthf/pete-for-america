const React = require('react');
const { HeadProvider } = require('react-head');
const { DocumentProvider } = require('react-document-attributes');

const headTagsByPathname = new Map();
const htmlAttributesByPathname = new Map();
const bodyAttributesByPathname = new Map();

exports.wrapRootElement = ({ element, pathname }) => {
  const headTags = [];
  const htmlAttributes = {};
  const bodyAttributes = {};

  headTagsByPathname.set(pathname, headTags);
  htmlAttributesByPathname.set(pathname, htmlAttributes);
  bodyAttributesByPathname.set(pathname, bodyAttributes);

  return (
    <DocumentProvider
      htmlAttributes={htmlAttributes}
      bodyAttributes={bodyAttributes}
    >
      <HeadProvider headTags={headTags}>{element}</HeadProvider>
    </DocumentProvider>
  );
};

exports.onRenderBody = ({
  setHeadComponents,
  pathname,
  setHtmlAttributes,
  setBodyAttributes,
}) => {
  setHtmlAttributes(htmlAttributesByPathname.get(pathname));
  setBodyAttributes(bodyAttributesByPathname.get(pathname));

  const headTags = headTagsByPathname.get(pathname);

  if (headTags) {
    setHeadComponents(headTags);
    headTagsByPathname.delete(pathname);
  }
};
