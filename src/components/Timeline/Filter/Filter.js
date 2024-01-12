// React
import React from "react";

// Bootstrap
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ReactWordcloud from "react-wordcloud";

// Images
import { ReactComponent as ResetIcon } from "../../../images/reset.svg";

// Custom styles
import "./Filter.css";

let filtersToAdd = new Set();

const options = {
  colors: [
    "#4292c6",
    "#2171b5",
    "#0576fd",
    "#125fbb",
    "#244a78",
    "#08306b",
    "#2c2b2b",
    "#1a1a1a",
    "#000000",
  ],
  rotations: 0,
  padding: 0,
  fontSizes: [20, 60],
  fontFamily: "Raleway-Bold",
};

export default function Filter({
  label,
  wordCloudData,
  filtersCurrentlyInUse,
  setFiltersCurrentlyInUse,
  wordCloudsAreOpenObject,
  setWordCloudsAreOpenObject,
}) {
  const topicsForLabel = wordCloudData.map((data) => data.text.toLowerCase());
  const userSelectedTopicsForLabelString = [...filtersToAdd]
    .filter((topic) => topicsForLabel.includes(topic.toLowerCase()))
    .join(" or ");

  const addOrRemoveTopicFromFilter = (userSelectedTopic) => {
    if (filtersToAdd.has(userSelectedTopic)) {
      filtersToAdd.delete(userSelectedTopic);
      setFiltersCurrentlyInUse(new Set([...filtersToAdd]));
    } else {
      filtersToAdd.add(userSelectedTopic);
      setFiltersCurrentlyInUse(new Set([...filtersToAdd]));
    }
  };

  const callbacks = {
    onWordClick: (word) => addOrRemoveTopicFromFilter(word.text),
  };

  const handleClick = () => {
    const shouldOpenWordCloud = !wordCloudsAreOpenObject[label];

    // word clouds should only render on screens with a width greater than 991px...
    // ...the CSS should correspond by setting the wordcloud to display = none until > 991px
    if (shouldOpenWordCloud && window.innerWidth > 991) {
      // The following statement closes all wordclouds in shallow copy
      Object.keys(wordCloudsAreOpenObject).forEach(
        (key) => (wordCloudsAreOpenObject[key] = false)
      );
      // The next statement sets shallow copy, then opens active wordcloud
      setWordCloudsAreOpenObject({ ...wordCloudsAreOpenObject, [label]: true });
    } else {
      setWordCloudsAreOpenObject({
        ...wordCloudsAreOpenObject,
        [label]: false,
      });
    }
  };

  return (
    <>
      <InputGroup className="filter">
        <DropdownButton
          as={InputGroup.Prepend}
          variant="outline-secondary"
          title={label}
          id={`${label.toLowerCase()}FilterDropdownButton`}
          onClick={() => handleClick()}
        >
          {wordCloudData.map((data) => {
            const topic = data.text;

            return (
              <Dropdown.Item
                key={`${topic}DropdownItem`}
                eventKey={topic}
                onSelect={(topic) => addOrRemoveTopicFromFilter(topic)}
              >
                {topic}
              </Dropdown.Item>
            );
          })}
        </DropdownButton>

        <FormControl
          aria-describedby={`${label.toLowerCase()}FormGroup`}
          as="input"
          value={userSelectedTopicsForLabelString || `Filter not applied`}
          disabled
        />
      </InputGroup>
      {wordCloudsAreOpenObject[label] ? (
        <>
          {/* The div: "filterClickAwayArea" is used to mimic clickAway event such that the wordCloudCanvas closes
                        when the user clicks something other than the filters or canvas itself. */}
          <div
            className="filterClickAwayArea"
            onClick={() =>
              setWordCloudsAreOpenObject({
                ...wordCloudsAreOpenObject,
                [label]: false,
              })
            }
          />
          <div
            className="wordCloudCanvas"
            id={`${label.toLowerCase()}WordCloudCanvas`}
          >
            <ReactWordcloud
              words={wordCloudData}
              options={options}
              callbacks={callbacks}
            />
            <button
              className="reset"
              onClick={() => {
                wordCloudData.forEach((topic) => {
                  filtersToAdd.delete(topic.text);
                });

                setFiltersCurrentlyInUse(new Set([...filtersToAdd]));
              }}
            >
              {" "}
              <ResetIcon id="reset-icon" /> Reset
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
