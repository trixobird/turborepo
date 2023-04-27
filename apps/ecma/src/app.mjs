// app.mjs
import { addTwo, addTwoAsync } from "./addTwo.mjs";

// Prints: 6
console.log(addTwo(4));
console.log(await addTwoAsync(4));
