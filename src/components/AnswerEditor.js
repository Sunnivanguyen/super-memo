import React, { useEffect, useContext } from "react";
import { Context } from "../Context";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function AnswerEditor() {
  const { setAnswer } = useContext(Context);

  const placeholder = "Answer";
  const { quill, quillRef } = useQuill({
    placeholder,
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setAnswer(quill.getText());
      });
    }
  }, [quill, setAnswer]);
  return (
    <>
      <div className="answer">
        <div ref={quillRef} />
      </div>
    </>
  );
}
