import React from "react";
import "./backlog.scss";
import Button from "components/buttons/button";
import { IBacklogInfo } from "models/IBacklogInfo";
import BacklogEpic from "components/epic/backlogEpic/backlogEpic";
import Loader from "components/loader/loader";
import { IBacklogEpicInfo } from "models/IBacklogEpicInfo";

interface Props {
  backlogInfo?: IBacklogInfo;
  isFetchingBacklog: boolean;
  onCreateEpicClick: () => any;
  onCreateAssignmentClick: (epicId: string) => () => any;
  onEditClick: (epic: IBacklogEpicInfo) => () => any;
  onDeleteClick: (epicId: string, epicName?: string) => () => any;
}
const renderNone = () => {
  return (
    <div className="card card-flow--column top-margin">
      No epics. Create one now!
    </div>
  );
};

const Backlog: React.FunctionComponent<Props> = (props: Props) => {
  const {
    backlogInfo,
    onCreateEpicClick,
    onCreateAssignmentClick,
    isFetchingBacklog,
    onEditClick,
    onDeleteClick,
  } = props;

  if (isFetchingBacklog) {
    return <Loader showSpinner />;
  }

  if (!backlogInfo) {
    return null;
  }

  const { epics } = backlogInfo;

  return (
    <div className="backlog-container">
      <div className="card card--flow-row backlog-header">
        <h1 className="header-title">Backlog</h1>
        <Button
          onClick={onCreateEpicClick}
          appendClass="backlog-container__button"
          icon="plus"
        >
          New Epic
        </Button>
      </div>
      {epics &&
        epics.map((x) => (
          <BacklogEpic
            key={x.id}
            info={x}
            onCreateClick={onCreateAssignmentClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
          />
        ))}
      {!epics && renderNone()}
    </div>
  );
};

export default Backlog;
