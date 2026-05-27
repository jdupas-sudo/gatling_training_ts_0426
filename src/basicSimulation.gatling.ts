import { atOnceUsers, exec, feed, getParameter, jsonFile, scenario, simulation } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { addToCart, login, products, session } from "./endpoints/apiEndpoints";
import { homepage, loginPage } from "./endpoints/webEndpoints";

export default simulation((setUp) => {
  // Load VU count from system properties
  // Reference: https://docs.gatling.io/guides/passing-parameters/
  const vu = parseInt(getParameter("vu", "1"));

  // Credentials feeder — circular() recycles entries so we don't run out of users mid-test.
  const usersFeeder = jsonFile("data/users_dev.json").circular();
  const productFeeder = jsonFile("data/product.json").random();

  // Define HTTP configuration
  // Reference: https://docs.gatling.io/reference/script/protocols/http/protocol/
  const httpProtocol = http
    .baseUrl("https://api-ecomm.gatling.io")
    .acceptHeader("application/json")
    .userAgentHeader(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
    );

  // Define scenario
  // Reference: https://docs.gatling.io/reference/script/core/scenario/
  // Exercise 1-3 — browse the first page of products, pick one at random, add it to the cart.
  const scn = scenario("Scenario").exec(
    homepage,
    session,
    loginPage,
    feed(usersFeeder),
    login,
    // Seed query-param values for the products call.
    exec((s) => s.set("pageNumber", "0")),
    exec((s) => s.set("searchKey", "")),
    products,
    // Parse the products response, pick one at random, serialize back into the CartItems session var.
    exec((s) => {
      const productList = JSON.parse(s.get("Products") as string);
      const picked = productList[Math.floor(Math.random() * productList.length)];
      return s.set("CartItems", JSON.stringify([picked]));
    }),
    addToCart
  );

  // Define injection profile and execute the test
  // Reference: https://docs.gatling.io/reference/script/core/injection/
  setUp(scn.injectOpen(atOnceUsers(vu))).protocols(httpProtocol);
});
