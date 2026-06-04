import { exec } from "@gatling.io/core";



// Seed query-param values for the products call.
    export const setPagNumber = exec((s) => s.set("pageNumber", "0"));
    export const setSearchKey = exec((s) => s.set("searchKey", ""));

// Parse the products response, pick one at random, serialize back into the CartItems session var.
    export const createAddToCartBody = exec((s) => {
    try {
        const productList = JSON.parse(s.get("Products") as string);
        const picked = productList[Math.floor(Math.random() * productList.length)];
        return s.set("CartItems", JSON.stringify([picked]));
    } catch (error) {
        console.error("createAddToCartBody failed:", error)
        return s;
    }
});