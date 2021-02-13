import React, { FunctionComponent } from "react";
import styled from "styled-components";

export interface Props {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: (value?: string) => void;
}
const Select: FunctionComponent<Props> = ({ handleSubmit }) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    handleSubmit(value);
  };

  return (
    <SelectHTML name="select-city" onChange={handleSelect}>
      <option hidden selected>
        Most searched cities...
      </option>
      <option value="buenos aires">Buenos Aires, AR</option>
      <option value="new york">New York, US</option>
      <option value="london">London, GB</option>
      <option value="paris">Paris, FR</option>
      <option value="sidney">Sidney, AU</option>
    </SelectHTML>
  );
};

export default Select;

const SelectHTML = styled.select`
  border-radius: 8px 0 0 8px;
  height: 40px;
  width: 87%;
`;
