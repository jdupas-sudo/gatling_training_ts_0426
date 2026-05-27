import { jsonFile, group, feed } from "@gatling.io/core";
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