import React, { useState } from "react";
import styled from "styled-components";
import { Accessibility } from "./accessibility";
import { MenuToggle } from "./menuToggle";
import { Link } from "react-router-dom";

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  z-index: 99;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 2rem;
  display: flex;
  height: 100%;
  list-style: none;
  background-color: #fff;
  width: 100%;
  flex-direction: column;
  position: fixed;
  top: 181px;
  left: 0px;
`;

const LinkItem = styled.li`
  width: 100%;
  padding: 0.3em 2em;
  color: #222;
  font-weight: 500;
  font-size: 40px;
  display: flex;
  margin-bottom: 10px;
`;

const Marginer = styled.div`
  height: 2em;
`;

const Container = styled.div`
  padding: 10em;
`;

export function MobileNavLinks(props) {
  const [isOpen, setOpen] = useState(false);

  return (
    <NavLinksContainer>
      <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
      {isOpen && (
        <LinksWrapper>
          <LinkItem>
            <Link to="/products/Informática">Ordenadores</Link>
          </LinkItem>
          <LinkItem>
            <Link to="/products/Telefonía">Telefonía</Link>
          </LinkItem>
          <LinkItem>
            <Link to="/products/Gaming">Gaming</Link>
          </LinkItem>
          <LinkItem>
            <Link to="/products/Video">Video</Link>
          </LinkItem>
          <LinkItem>
            <Link to="/products/Audio">Audio</Link>
          </LinkItem>
          <LinkItem>
            <Link to="/products/Memorabilia">Memorabilia</Link>
          </LinkItem>
          <Marginer />
          <Container>
            <Accessibility />
          </Container>
        </LinksWrapper>
      )}
    </NavLinksContainer>
  );
}
