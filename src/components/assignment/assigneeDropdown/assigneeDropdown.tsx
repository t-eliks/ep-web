import React from "react";
import { ICollaboratorOverview } from "models/ICollaboratorOverview";
import { Option } from "react-select/src/filters";
import { RESOURCES } from "localization/resources";
import Select from "components/selects/select";

interface Props {
  collaborators: ICollaboratorOverview[];
  selectedId: string;
  isFetching: boolean;
  onChange: (option: any) => void;
}

const buildOptions = (collaborators?: ICollaboratorOverview[]): Option[] => {
  if (collaborators) {
    const options = collaborators.map(x => ({
      value: String(x.id),
      label: `${x.firstName} ${x.lastName}`,
      data: "."
    }));

    options.splice(0, 0, {
      value: "-1",
      label: "Unassigned",
      data: "."
    });

    return options;
  }

  return [];
};

const AssigneeDropdown: React.FunctionComponent<Props> = (props: Props) => {
  const { collaborators, selectedId, onChange, isFetching } = props;

  const options = buildOptions(collaborators);

  return (
    <Select
      options={options}
      header={RESOURCES.NEW_ASSIGNMENT.ASSIGNEE}
      selectedValue={options.find(x => x.value === selectedId)}
      loading={isFetching}
      onChange={onChange}
    />
  );
};

export default AssigneeDropdown;
