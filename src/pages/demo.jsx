const array = new Array(100000).fill({ title: "xxxx" });

const Component = () => {
  return array.map((item, index) => <div key={index}>{item.title}</div>);
};

export default Component;
