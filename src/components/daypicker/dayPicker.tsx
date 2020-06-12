import React from "react";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "./dayPicker.scss";
import Input from "components/inputs/input";
import { DayPickerInputProps } from "react-day-picker/types/Props";
import { format } from "date-fns";

interface Props {
  header: string;
  value?: Date;
  onChange?: (
    day: Date,
    modifiers: any,
    dayPickerInput: DayPickerInput
  ) => void;
}

const DayPicker: React.StatelessComponent<Props> = (props: Props) => {
  const { header, value, onChange } = props;

  return (
    <DayPickerInput
      component={(props: DayPickerInputProps) => (
        <Input
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChange={props.onChange}
          header={header}
        />
      )}
      classNames={{
        container: "day-picker-input__container",
        overlayWrapper: "day-picker-input__overlayWrapper",
        overlay: "day-picker-input__overlay",
      }}
      hideOnDayClick
      dayPickerProps={{
        disabledDays: {
          before: new Date(),
        },
      }}
      format={"yyyy-MM-dd"}
      formatDate={(date, frmat) => format(date, frmat)}
      value={value}
      onDayChange={onChange}
    />
  );
};

export default DayPicker;
