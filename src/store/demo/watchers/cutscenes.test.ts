
interface Mock {
  value?: boolean;
}

// TODO: rewrite for proper unit testing...

it("nullable boolean check", () => {
  const input1: Mock = {};
  const input2: Mock = { value: false };
  const input3: Mock = { value: true};

  expect(input1.value != null).toBeFalsy();
  expect(input2.value != null).toBeTruthy();
  expect(input3.value != null).toBeTruthy();
});
