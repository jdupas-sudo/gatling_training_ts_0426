import { ElFileBody, jmesPath } from "@gatling.io/core";
import { http, status } from "@gatling.io/http";

// API calls hitting the JSON backend (baseUrl set in the simulation).

// Session bootstrap — the e-commerce site fires this automatically when the home page loads.
// We now also save the sessionId; the cart body template needs it.
export const session = http("Session")
  .get("/session")
  .check(status().is(200))
  .check(jmesPath("sessionId").saveAs("SessionId"));

// Products listing — page index and search key come from session attributes via Gatling EL.
// Saving the response body so we can pick a random product from it.
export const products = http("Products")
  .get("/products")
  .queryParam("page", "#{pageNumber}")
  .queryParam("search", "#{searchKey}")
  .check(status().is(200))
  .check(jmesPath("products").saveAs("Products"));

// Login — feeder supplies username/password; we capture the bearer token for downstream calls.
export const login = http("Login")
  .post("/login")
  .asFormUrlEncoded()
  .formParam("username", "#{username}")
  .formParam("password", "#{password}")
  .check(status().is(200))
  .check(jmesPath("accessToken").saveAs("AccessToken"));

// Add to cart — body template lives in resources/bodies/cart.json and reads #{SessionId} + #{CartItems}.
export const addToCart = http("Add to cart")
  .post("/cart")
  .asJson()
  .body(ElFileBody("bodies/cart.json"))
  .check(status().is(200));
