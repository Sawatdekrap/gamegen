import React, { useState, KeyboardEvent } from "react";
import styled from "styled-components";

import GamePropertyItf, { createGameProperty } from "./GameProperty";
import UpdateModal from "./UpdateModal";
import Property from "./Property";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  text-align: center;
`;

const HeaderContainer = styled.div`
  flex-shrink: 0;
`;

const PropertiesContainer = styled.div`
  flex-grow: 1;
  max-width: 1280px;
  margin: auto;
`;

const FooterContainer = styled.div`
  flex-shrink: 0;
  background-color: #eee;
`;

const App = () => {
  const [properties, setProperties] = useState<GamePropertyItf[]>([]);
  const [editingProperty, setEditingProperty] = useState<
    GamePropertyItf | undefined
  >();
  const [newPropName, setNewPropName] = useState("");

  // Move to new/edit property section
  const submitIfEnterKey = (e: KeyboardEvent) => {
    e.key === "Enter" && submitNewProperty();
  };

  const submitNewProperty = () => {
    const newGameProperty = createGameProperty(newPropName);
    setProperties([...properties, newGameProperty]);
    setNewPropName("");
  };

  const updateProperty = (id: string, name: string, options: string[]) => {
    const matchingIdx = properties.findIndex((p) => p.id === id);
    if (matchingIdx === -1) return;
    properties[matchingIdx] = { id, name, options };
    setProperties(properties);
    setEditingProperty(undefined);
  };

  const removeProperty = (id: string) => {
    const propIdxToRemove = properties.findIndex((p) => p.id === id);
    if (propIdxToRemove > -1) {
      const newProperties = [...properties];
      newProperties.splice(propIdxToRemove, 1);
      setProperties(newProperties);
    }
  };

  return (
    <Container>
      {editingProperty && (
        <UpdateModal
          gameProperty={editingProperty}
          onUpdate={updateProperty}
          onCancel={() => setEditingProperty(undefined)}
        />
      )}
      <HeaderContainer>
        <h1>Game Gen Tool</h1>
      </HeaderContainer>
      <PropertiesContainer>
        {properties.map((gp) => (
          <Property
            key={gp.name}
            gameProperty={gp}
            onRemove={() => removeProperty(gp.id)}
            onEdit={() => setEditingProperty(gp)}
          />
        ))}
        <div>
          <label htmlFor="newprop">New Property Name</label>
          <input
            id="newprop"
            value={newPropName}
            onChange={(e) => setNewPropName(e.target.value)}
            onKeyDown={submitIfEnterKey}
          />
          <button onClick={submitNewProperty}>Submit</button>
        </div>
      </PropertiesContainer>
      <FooterContainer>
        <h4>Written by Matthew</h4>
        <h5>...Socials...</h5>
      </FooterContainer>
    </Container>
  );
  // Title
  // Properties (Editabe)
  // Section title
  // Choose N
  // Options
  // Add Property
  // Footer
};

export default App;
