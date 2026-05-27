import { http } from "@gatling.io/http";
import { status } from "@gatling.io/http";

export const session = http("Session")
.get("/session")
.check(status().is(200));