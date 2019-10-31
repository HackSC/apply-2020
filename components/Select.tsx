import React from "react";
import styled from "styled-components";

import ChevronGraphic from "../assets/chevron.svg";

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  options: Array<Option>;
  name: string;
};

type Ref = HTMLSelectElement;

const Select = React.forwardRef<Ref, SelectProps>((props, ref) => {
  const { options, name } = props;

  return (
    <Wrapper>
      <select ref={ref} name={name}>
        {options.map(option => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Chevron src={ChevronGraphic} />
    </Wrapper>
  );
});

const Wrapper = styled.div`
  position: relative;

  select {
    width: 100%;
  }
`;

const Chevron = styled.img`
  width: 15px;
  position: absolute;
  top: 50%;
  margin-top: -7px;
  right: 12px;
`;

export default Select;
