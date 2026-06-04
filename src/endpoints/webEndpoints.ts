import { http } from "@gatling.io/http";
import { status } from "@gatling.io/http";

export const homepage = http("Homepage")
.get("https://ecomm.gatling.io/")
.check(status().is(200));

export const loginPage = http("LoginPage")
  .get("https://ecomm.gatling.io/login")
  .check(status().is(200));