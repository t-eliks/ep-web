import React from "react";
import { IBacklogEpicInfo } from "models/IBacklogEpicInfo";
import Button from "components/buttons/button";
import "./backlogEpic.scss";
import BacklogAssignmentList from "components/assignment/backlogAssignment/backlogAssignmentList";
import Popup from "components/popups/popup";
import PopupMenu from "components/menus/popupMenu";
import PopupMenuItem from "components/menus/popupMenuItem";

interface Props {
  info: IBacklogEpicInfo;
  onCreateClick: (epicId: string) => () => any;
  onEditClick: (epic: IBacklogEpicInfo) => () => any;
  onDeleteClick: (epicId: string, epicName?: string) => () => any;
}

const BacklogEpic: React.FunctionComponent<Props> = (props: Props) => {
  const { info, onCreateClick, onEditClick, onDeleteClick } = props;
  const { id, name, description, assignments } = info;

  return (
    <div key={id} className="backlog-epic">
      <div className="backlog-epic__header">
        <div className="backlog-epic__header--text">
          <h1>{name}</h1>
          <span>{description}</span>
        </div>
        <div className="backlog-epic__header--buttons">
          <Button
            onClick={onCreateClick(id)}
            appendClass="backlog-epic__header--button"
            icon="plus"
          >
            New Assignment
          </Button>
          <Popup
            renderOwner={() => <Button icon="ellipsis-v" variant="icon" />}
          >
            <PopupMenu>
              <PopupMenuItem
                icon="pen"
                header="Edit"
                onClick={onEditClick(info)}
              />
              <PopupMenuItem
                icon="trash"
                header="Delete"
                onClick={onDeleteClick(info.id, info.name)}
              />
            </PopupMenu>
          </Popup>
        </div>
      </div>
      <div className="card card--flow-column">
        <h1>Assignments</h1>
        {assignments && <BacklogAssignmentList assignments={assignments} />}
        {!assignments ||
          (assignments.length === 0 && <span>No assignments yet.</span>)}
      </div>
    </div>
  );
};

export default BacklogEpic;
