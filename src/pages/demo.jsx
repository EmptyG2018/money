import bbob from "@bbob/core";
import html5Preset from "@bbob/preset-html5";
import { render } from "@bbob/html";
import { createPreset } from "@bbob/preset";

const Custom = createPreset({
  baidu: (node) => {
    console.log("node", node);
    return {
      tag: "div",
      attrs: { style: node.attrs[1] ? 'ww' : 'ss' },
      content: "wogege",
    };
  },
});

const Component = () => {
  console.log(
    bbob([html5Preset(), Custom()]).process(
      `[password]Text[/password][baidu=1,1]xxx[/baidu]`,
      {
        render,
      }
    ).html
  );
  return <>www</>;
};

export default Component;
