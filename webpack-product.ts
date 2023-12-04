// @ts-nocheck

import merge from "webpack-merge";
import {
  commonMain,
  commonRenderer
} from "./webpack-develop";


const main = merge(commonMain, {
  mode: "production"
});

const renderer = merge(commonRenderer, {
  mode: "production"
});

export default [main, renderer];