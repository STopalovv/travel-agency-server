import React from "react";

const CreateForm = ({ onSubmit, onCancel }) => {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter text here"
        value={inputValue}
        onChange={handleInputChange}
      />
      <button type="submit">Add</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CreateForm;