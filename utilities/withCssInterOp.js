import { cssInterop } from "nativewind";
const withCssInterop = (Component) =>
  cssInterop(Component, { className: "style" });
export default withCssInterop;
