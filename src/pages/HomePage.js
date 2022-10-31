import React from "react";
import GlobalEditor from "../components/GlobalEditor";
import KeyBoard from "../components/KeyBoard";

export default function HomePage() {
  return (
    <nav
      style={{
        margin: " 20px",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <GlobalEditor />
      <KeyBoard />
    </nav>
  );
}
