import React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';

const Toc = () => {
  const data = useStaticQuery(graphql`
  query TableOfContents {
    allStatcFuseTableOfContents {
      nodes {
        id
        label
        isHeader
        path
        childItems {
          isHeader
          label
          path
        }
      }
    }
  }
`);

  const { nodes } = data.allStatcFuseTableOfContents;

  return nodes.map((doc) => {
    const linkOrHeader = doc.isHeader ? <div className="doc-section-header">{doc.label}</div> : <Link to={doc.path}>{doc.label}</Link>;

    return (
      <div className="doc-section" key={doc.id}>
        {linkOrHeader}
        {doc.childItems
          && doc.childItems.map((childDoc) => (
            <div key={childDoc.label + doc.isHeader} className="sub-doc">
              <Link to={childDoc.path}>{childDoc.label}</Link>
            </div>
          ))}
      </div>
    );
  });
};
export default Toc;