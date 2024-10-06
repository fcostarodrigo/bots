#!/usr/bin/env node
import cdk from "aws-cdk-lib";

import { BotsStack } from "./BotsStack.js";

const app = new cdk.App();

new BotsStack(app, "BotsStack", {
  tags: {
    project: "bots",
  },
});
