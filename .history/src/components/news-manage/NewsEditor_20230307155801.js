import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function NewsEditor() {
    const [editorState, setEditorState] = useState('')

    const onEditorStateChange = (editorState) => {

    }
    return (
        <div>
            <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={(editorState) => onEditorStateChange(editorState)}
            />
        </div>
    )
}
