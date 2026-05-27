import { atOnceUsers, exec, feed, getParameter, jsonFile, pause, PopulationBuilder, scenario, ScenarioBuilder, simulation, stressPeakUsers } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { addToCart, checkout, login, products, session } from "./endpoints/apiEndpoints";
import { homepage, loginPage } from "./endpoints/webEndpoints";
import { authenticate, browseAndAddToCart, buy, homeAnonymous } from "./groups/scenarioGroups";

export default simulation((setUp) => {
  // Load VU count from system properties
  // Reference: https://docs.gatling.io/guides/passing-parameters/
  const vu = parseInt(getParameter("vu", "1"));
  // Test profile selector — drives injection profile (1-7) and assertions (1-8).
  const testType = getParameter("testType", "smoke");
  const duration = parseInt(getParameter("duration", "10"));

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
    homeAnonymous,
    pause(1, 2),
    authenticate,
    pause(1, 3),
    browseAndAddToCart,
    pause(2),
    buy
  );

  // Pick an injection profile based on the testType system property.
  // Reference: https://docs.gatling.io/reference/script/core/injection/
  const injectionProfile = (scn: ScenarioBuilder): PopulationBuilder => {
    switch (testType) {
      case "stress":
        return scn.injectOpen(stressPeakUsers(vu).during(duration));
      case "smoke":
        return scn.injectOpen(atOnceUsers(1));
      default:
        return scn.injectOpen(atOnceUsers(vu));
    }
  };

  // Define injection profile and execute the test
  setUp(injectionProfile(scn))
    .protocols(httpProtocol);
});
