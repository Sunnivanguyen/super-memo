import React, { useState } from "react";
import { useQuill } from "react-quilljs";
//import { Context } from "../Context";
import "quill/dist/quill.snow.css";
import fetch from "isomorphic-unfetch";

export default function GlobalEditor() {
  const [img, setImg] = useState("");
  console.log(img);
  const { quill, quillRef } = useQuill();

  // Insert Image(selected by user) to quill
  const insertToEditor = (url) => {
    const range = quill.getSelection();
    quill.insertEmbed(range.index, "image", url);
  };

  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData();
    console.log(body);
    body.append("file", file);

    const res = await fetch(
      "https://api.unsplash.com/search/collections?page=1&query=office",
      { method: "POST", body }
    );
    insertToEditor(res.uploadedImageUrl);
  };

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    console.log(input);
    input.click();

    input.onchange = () => {
      const file = input.files[0];
      console.log(file);
      saveToServer(file);
    };
  };

  React.useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule("toolbar").addHandler("image", selectLocalImage);
    }
  }, [quill]);

  return (
    <div
      className="box"
      style={{
        height: 500,
        width: 500,
        backgroundColor: "red",
        display: "flex",
        justifyContent: " center",
        alignItems: "center",
        margin: 0,
      }}
    >
      <div
        className="global-editor"
        style={{
          height: 400,
          width: 400,
          backgroundColor: "white",
          display: "flex",
          justifyContent: " center",
          alignItem: "center",
        }}
      >
        <div
          style={{ width: 350, height: 300, border: "1px solid lightgray" }}
          className="editor-area"
        >
          <div ref={quillRef} />
        </div>
      </div>
    </div>
  );
}
