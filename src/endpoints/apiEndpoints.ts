import { jmesPath } from "@gatling.io/core";
import { http } from "@gatling.io/http";
import { status } from "@gatling.io/http";

export const session = http("Session")
.get("/session")
.check(status().is(200));

export const products = http("Products")
  .get("/products?page=0&search=")
  .check(status().is(200),
  );

  export const login = http("Login")
  .post("/login")
  .asFormUrlEncoded()
  .formParam("username", "#{username}")
  .formParam("password", "#{password}")
  .check(status().is(200))
  .check(jmesPath("accessToken").saveAs("AccessToken"));
