import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface Props {
  handleSubmit: (value?: string) => void;
}
const Select: FunctionComponent<Props> = ({ handleSubmit }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    handleSubmit(value);
  };

  return (
    <SelectHTML
      name="select-city"
      data-testid="select"
      defaultValue="placeholder"
      onChange={handleSelect}
    >
      <option hidden value="placeholder">
        Most searched cities...
      </option>
      <option value="buenos aires" data-testid="option">
        Buenos Aires, AR
      </option>
      <option value="new york" data-testid="option">
        New York, US
      </option>
      <option value="london" data-testid="option">
        London, GB
      </option>
      <option value="paris" data-testid="option">
        Paris, FR
      </option>
      <option value="sidney" data-testid="option">
        Sidney, AU
      </option>
    </SelectHTML>
  );
};

export default Select;

const SelectHTML = styled.select`
  border-radius: 8px 0 0 8px;
  height: 40px;
  width: 87%;
`;
