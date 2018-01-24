import * as clink from "./clink";
import * as cmd from "./cmd";
import * as powershell from "./powershell";

const terminals = {clink, cmd, powershell};

export default (terminal) => terminals[terminal];
