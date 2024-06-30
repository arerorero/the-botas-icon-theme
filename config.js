import { alfabetically } from "./src/alfabetic.js";
import { createPaths } from "./src/createPaths.js";
import { createTests } from "./src/createTests.js";

await createPaths();
await alfabetically();
await createTests();
