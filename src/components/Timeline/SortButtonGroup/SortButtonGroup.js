// React
import React from "react";

// Bootstrap
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

// Custom styles
import "./SortButtonGroup.css";

export default function SortButtonGroup(props) {
  const { sortOptions, optionTransmuter, sortValue, setSortValue } = props;
  const label =
    sortValue.name === "default"
      ? `Sort not applied`
      : `${optionTransmuter[sortValue.name]} (${sortValue.direction})`;
  const renderButton = (option) => {
    if (option === "default") return "";

    return (
      <DropdownButton
        key={`${optionTransmuter[option]}Dropdown`}
        as={InputGroup.Append}
        title={optionTransmuter[option]}
        id="bg-nested-dropdown"
        variant="outline-secondary"
        size={"xs"}
      >
        <Dropdown.Item
          as="button"
          value="asc"
          onClick={(event) =>
            setSortValue({ name: option, direction: event.target.value })
          }
        >
          asc
        </Dropdown.Item>
        <Dropdown.Item
          as="button"
          value="desc"
          onClick={(event) =>
            setSortValue({ name: option, direction: event.target.value })
          }
        >
          desc
        </Dropdown.Item>
      </DropdownButton>
    );
  };

  return (
    <>
      <InputGroup className="sortButtonGroup">
        <FormControl
          className="sortButtonGroupTextField"
          aria-describedby="bg-nested-dropdown"
          as="input"
          value={label}
          disabled
        />
        {sortOptions.map((option) => renderButton(option))}
      </InputGroup>
    </>
  );
}
