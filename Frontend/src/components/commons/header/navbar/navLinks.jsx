import styled from "styled-components";
import { Link } from 'react-router-dom';

const NavLinksContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const LinksWrapper = styled.ul`
  margin: 0;
  padding: 0 0 0 20px;
  display: flex;
  height: 100%;
  list-style: none;
`;

const LinkItem = styled.li`
  height: 100%;
  padding: 0 1.1em;
  color: #222;
  font-weight: 500;
  font-size: 1.4rem;
  align-items: center;
  justify-content: center;
  display: flex;
  border-top: 2px solid transparent;
  transition: all 220ms ease-in-out;
  &:hover {
    border-top: 2px solid #2ecc71;
  }
`;


export function NavLinks(props) {
  return (
    <NavLinksContainer>
      <LinksWrapper>
        <LinkItem>
          <Link to="/ordenadores">Ordenadores</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/telefonia">Telefonía</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/gaming">Gaming</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/video">Video</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/audio">Audio</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/musica">Música</Link>
        </LinkItem>
        <LinkItem>
          <Link to="/memorabilia">Memorabilia</Link>
        </LinkItem>
      </LinksWrapper>
    </NavLinksContainer>
  );
}