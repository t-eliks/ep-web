import React from "react";
import "./discussionInput.scss";
import Button from "components/buttons/button";
// @ts-ignore
import createToolbarPlugin from "draft-js-static-toolbar-plugin";
import { EditorState, convertToRaw } from "draft-js";
import Editor from "draft-js-plugins-editor";

interface Props {
  onSubmit: (content: string) => void;
  submitOnEnter?: boolean;
}

interface State {
  editorState: EditorState;
}

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;

class DiscussionInput extends React.Component<Props, State> {
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

  handleReturn = () => {
    const { submitOnEnter } = this.props;

    if (submitOnEnter) {
      this.onPostClick();

      return true;
    }

    return false;
  };

  render() {
    const { editorState } = this.state;
    const { submitOnEnter } = this.props;

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
        {!submitOnEnter && (
          <div>
            <Button
              disabled={!editorState.getCurrentContent().hasText()}
              onClick={this.onPostClick}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default DiscussionInput;
