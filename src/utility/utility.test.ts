
it("reads settings from config", () => {
  const api = process.env.REACT_APP_API;
  expect(api).toEqual("https://meoggef6d3.execute-api.us-west-2.amazonaws.com/dev/");
});
