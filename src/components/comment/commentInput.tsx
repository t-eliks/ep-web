import React from "react";
import Button from "components/buttons/button";
// @ts-ignore
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";

interface Props {
  onSubmit: (content: string) => void;
}

interface State {
  editorState: EditorState;
}

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

class CommentInput extends React.Component<Props, State> {
  state: State = {
    editorState: EditorState.createEmpty(),
  };

  onEditorStateChange = (editorState: EditorState) => {
    this.setState({
      editorState,
    });
  };

  onPostClick = () => {
    const { onSubmit } = this.props;
    const { editorState } = this.state;

    const content = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );

    this.setState({
      editorState: EditorState.createEmpty(),
    });

    onSubmit(content);
  };

  render() {
    const { editorState } = this.state;

    return (
      <div>
        <div className="toolbar">
          <Toolbar />
        </div>
        <div className="discussion-input__editor">
          <Editor
            editorState={editorState}
            onChange={this.onEditorStateChange}
            plugins={[toolbarPlugin]}
          />
        </div>
        <div>
          <Button
            disabled={!editorState.getCurrentContent().hasText()}
            onClick={this.onPostClick}
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default CommentInput;
