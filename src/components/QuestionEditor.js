import React, { useEffect, useContext } from "react";
import { Context } from "../Context";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

export default function QuestionEditor() {
  const { setQuestion } = useContext(Context);

  const placeholder = "Question";
  const { quill, quillRef } = useQuill({
    placeholder,
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        setQuestion(quill.getText());
      });
    }
  }, [quill, setQuestion]);
  return (
    <div className="question">
      <div ref={quillRef} />
    </div>
  );
}
