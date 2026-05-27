import { http } from "@gatling.io/http";
import { status } from "@gatling.io/http";

export const homepage = http("Homepage")
.get("https://ecomm.gatling.io/")
.check(status().is(200));