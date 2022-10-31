import React, { useEffect, useContext } from "react";
import { Context } from "../Context";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function NewQuestionEditor({ item }) {
  const { setUpdatedQuestion } = useContext(Context);

  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(`<p>${item.question}</p>`);
      quill.on("text-change", (delta, oldDelta, source) => {
        setUpdatedQuestion(quill.getText());
      });
    }
  }, [quill, quillRef, item, setUpdatedQuestion]);
  return (
    <>
      <div className="question">
        <div ref={quillRef} />
      </div>
    </>
  );
}
