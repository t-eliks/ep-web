import React, { CSSProperties } from "react";
import ReactSelect from "react-select";
import { getOptionLabel, getOptionValue } from "react-select/src/builtins";
import "./select.scss";
import { Styles } from "react-select/src/styles";
import Loader from "components/loader/loader";

interface Props<OptionType> {
  options: OptionType[];
  placeholder?: string;
  header?: string;
  selectedValue?: OptionType;
  error?: string;
  disabled?: boolean;
  loading?: boolean;
  getOptionLabel?: getOptionLabel<OptionType>;
  getOptionValue?: getOptionValue<OptionType>;
  onChange: (option: OptionType) => void;
  formattedLabel?: (option: OptionType) => React.ReactNode;
}

class Select<OptionType> extends React.Component<Props<OptionType>> {
  selectStyle: Partial<Styles> = {
    control: (base: CSSProperties) => ({
      ...base,
      border: "none",
      borderRadius: "0px",
      outline: "none",
      boxShadow: "none",
      height: "100%",
      "&:hover": {
        boxShadow: "none",
        cursor: "pointer"
      }
    })
  };

  getLoadingOptionLabel = (item: { value: string; label: string }) => (
    <div style={{ display: "flex" }}>
      <div>
        <Loader />
      </div>
      <div style={{ marginLeft: "10px" }}>{item ? item.label : undefined}</div>
    </div>
  );

  renderSelect = () => {
    const {
      options,
      placeholder,
      formattedLabel,
      selectedValue,
      onChange,
      getOptionLabel,
      getOptionValue,
      loading,
      disabled
    } = this.props;

    if (loading) {
      const loaderOption = { label: "Loading", value: "loading" };

      return (
        <ReactSelect
          // @ts-ignore
          options={[loaderOption]}
          // @ts-ignore
          value={loaderOption}
          isDisabled
          styles={this.selectStyle}
          formatOptionLabel={this.getLoadingOptionLabel}
        />
      );
    } else {
      return (
        <ReactSelect
          options={options}
          value={selectedValue}
          placeholder={placeholder || ""}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          styles={this.selectStyle}
          className="select-container__select"
          isDisabled={disabled}
          formatOptionLabel={formattedLabel}
          // @ts-ignore
          onChange={onChange}
          menuPortalTarget={document.querySelector("body")}
        />
      );
    }
  };

  render() {
    const { header } = this.props;
    return (
      <div className="select-component">
        <span className="select-component__header">{header}</span>
        <div className="select-container">{this.renderSelect()}</div>
      </div>
    );
  }
}

export default Select;
