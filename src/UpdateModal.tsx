import React, { useState } from "react";
import styled from "styled-components";

import GamePropertyItf from "./GameProperty";

interface UpdateModalItf {
  gameProperty: GamePropertyItf;
  onUpdate: (id: string, name: string, options: string[]) => void;
  onCancel: () => void;
}

const ModalBackdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  overflow-y: scroll;

  :hover {
    cursor: pointer;
  }
`;

const ModalContainer = styled.div`
  max-width: 720px;
  margin: auto;
  background-color: #eee;
  border-radius: 4px;
  margin-top: 120px;
  margin-bottom: 120px;
  padding: 20px;

  :hover {
    cursor: default;
  }
`;

const UpdateModal = ({ gameProperty, onUpdate, onCancel }: UpdateModalItf) => {
  const [name, setName] = useState(gameProperty.name);
  const [optionsText, setOptionsText] = useState(
    gameProperty.options.join("\n")
  );

  const clickUpdate = () => {
    const options = optionsText.split("\n").filter((o) => o);
    onUpdate(gameProperty.id, name, options);
  };

  return (
    <ModalBackdrop onClick={onCancel}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <div>
          <label htmlFor="editName">Name</label>
          <input
            name="editName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "100%" }}
          />
        </div>
        <div>
          <label htmlFor="editOptions">Options</label>
          <textarea
            name="editOptions"
            value={optionsText}
            rows={15}
            onChange={(e) => setOptionsText(e.target.value)}
            style={{ maxWidth: "100%", minWidth: "100%" }}
          />
        </div>
        <div>
          <button onClick={onCancel}>Cancel</button>
          <button onClick={clickUpdate}>Submit</button>
        </div>
      </ModalContainer>
    </ModalBackdrop>
  );
};

export default UpdateModal;
