import * as React from "react";

// Layout object for wrapping div for individual web pages
const Page: React.SFC = ({ children }) => (
  <div className="container">{children}</div>
);

export default Page;
