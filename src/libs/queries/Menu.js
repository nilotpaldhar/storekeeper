import LinkQuery from '@libs/queries/Link';

/** Menu Query.*/
const MenuQuery = `
  title,
  "slug": slug.current,
  "menu": items[]{ 
    ${LinkQuery}
    "items": items[]{ 
      ${LinkQuery}
      "items": items[]{ ${LinkQuery} } 
    }
  }
`;

export default MenuQuery;
