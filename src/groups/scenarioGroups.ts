import { jsonFile, group, feed, repeat } from "@gatling.io/core";
import { homepage, loginPage } from "../endpoints/webEndpoints";
import { addToCart, login, products, session, checkout } from "../endpoints/apiEndpoints";
import { createAddToCartBody, setPagNumber, setSearchKey } from "../actions/actions";


  // Credentials feeder — circular() recycles entries so we don't run out of users mid-test.
  const usersFeeder = jsonFile("data/users_dev.json").circular();

  export const homeAnonymous = group("HomeAnonymous").on(homepage, session);

  export const authenticate = group("authenticate").on(
    loginPage,
    feed(usersFeeder),
    login,
  );

  export const browseAndAddToCart = group("browseAndAddToCart").on(
    setPagNumber,
    setSearchKey,
    products,
    createAddToCartBody,
    addToCart
  )

  export const buy = group("buy").on(checkout);


// Total pages exposed by the catalog (see /products response field `totalPages`).
// Hard-coded here since the site only has 4 pages; could be made dynamic by saving
// `totalPages` from the first /products response and using an `asLongAs` loop instead.
const PAGE_COUNT = 4;

// Walk every catalog page, picking a random product to add to the cart each time.
// repeat(n, "pageNumber") overwrites the session var `pageNumber` with the loop
// counter (0..n-1), which the existing products endpoint already reads via #{pageNumber}.
export const browseAllPagesAndAddToCart = group("browseAllPagesAndAddToCart").on(
  setSearchKey,
  repeat(PAGE_COUNT, "pageNumber").on(
    products,
    // pause(5, 15),
    createAddToCartBody,
    addToCart
  )
);