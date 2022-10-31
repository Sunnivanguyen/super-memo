import React, { useEffect, useContext } from "react";
import { Context } from "../Context";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function NewAnswerEditor({ item }) {
  const { setUpdatedAnswer } = useContext(Context);

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(`<p>${item.answer}</p>`);
      quill.on("text-change", (delta, oldDelta, source) => {
        setUpdatedAnswer(quill.getText());
      });
    }
  }, [quill, item, setUpdatedAnswer]);
  return (
    <>
      <div className="answer">
        <div ref={quillRef} />
      </div>
    </>
  );
}
