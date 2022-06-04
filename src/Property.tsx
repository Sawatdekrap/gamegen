import React, { useState } from "react";
import styled from "styled-components";

import GamePropertyItf from "./GameProperty";

export interface PropertyItf {
  gameProperty: GamePropertyItf;
  onRemove: () => void;
  onEdit: () => void;
}

const PropertyContainer = styled.div`
  margin-bottom: 16px;
`;

const PropertyTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const PropertyButton = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #eee;
  color: #777;
  font-weight: bold;
  border-style: none;
  margin-left: 5px;
  margin-right: 5px;

  :hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

const Property = ({ gameProperty, onRemove, onEdit }: PropertyItf) => {
  return (
    <PropertyContainer>
      <PropertyTitle>{gameProperty.name}</PropertyTitle>
      <div>
        <PropertyButton onClick={onEdit}>?</PropertyButton>
        <PropertyButton onClick={onRemove}>X</PropertyButton>
      </div>
      <div>{gameProperty.options[0] || "---"}</div>
    </PropertyContainer>
  );
};

export default Property;
