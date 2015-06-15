import Alt = require("alt");
import chromeDebug = require("alt/utils/chromeDebug");

const altInstance = new Alt();
chromeDebug(altInstance);

export const alt = altInstance;
