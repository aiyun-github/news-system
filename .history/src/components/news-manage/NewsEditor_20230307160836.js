import React, { useState } from 'react'
import { convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// 富文本编辑器组件
export default function NewsEditor() {
    const [editorState, setEditorState] = useState('')

    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) => setEditorState(editorState)}
                onBlur={() => {
                    draftToHtml(convertToRaw(editorState.getCurrentContent()))
                }}
            />
        </div>
    )
}
