import React from "react";

import styled from "styled-components";

import HeaderLogo from "../assets/header_logo_21_transparent.png";

import { Container, Link } from "../styles";

type NavbarProps = {
  loggedIn?: boolean;
  showLive?: boolean;
  showDash?: boolean;
  showApp?: boolean;
  showMaps?: boolean;
  showAPI?: boolean;
  showResults?: boolean;
  showTeam?: boolean;
  showLogout?: boolean;
  showProjectTeam?: boolean;
  activePage?: string;
  admin?: boolean;
  volunteer?: boolean;
  sponsor?: boolean;
};

const style = background => {
  return {
    "&:hover": {
      backgroundColor: "#FF8379 !important",
      color: "white !important"
    },
    padding: "10px",
    margin: "10px",
    color: background !== "white" ? "white" : "black",
    backgroundColor: background,
    cursor: "pointer"
  };
};

const Navbar: React.FunctionComponent<NavbarProps> = ({
  loggedIn,
  showLive = true,
  showDash = true,
  showApp = true,
  showMaps = false, // * False because HackSC 2021 is virtual :( big sad
  showAPI = true,
  showResults = true,
  showTeam = true,
  showLogout = true,
  showProjectTeam = true,
  activePage,
  admin,
  volunteer,
  sponsor
}: NavbarProps) => {
  return (
    <Wrapper>
      <NavbarContainer>
        <a href={loggedIn ? "/live" : "/"}>
          <HeaderLogoImg src={HeaderLogo} />
        </a>
        <Links>
          {loggedIn ? (
            <>
              {!admin && !volunteer && !sponsor && showLive && (
                <Link
                  href="/live"
                  id="live-page"
                  style={style(activePage === "live" ? "#FF8379" : "white")}
                >
                  Live
                </Link>
              )}
              {/*!admin && !volunteer && !sponsor && showDash && (
                <Link
                  href="/dashboard"
                  style={style(
                    activePage === "dashboard" ? "#FF8379" : "white"
                  )}
                >
                  Dashboard
                </Link>
                  )*/}
              {!admin && !volunteer && !sponsor && showApp && (
                <Link
                  href="/application"
                  id="application-page"
                  style={style(
                    activePage === "application" ? "#FF8379" : "white"
                  )}
                >
                  Application
                </Link>
              )}
              {!admin && !volunteer && !sponsor && showResults && (
                <Link
                  href="/results"
                  id="results-page"
                  style={style(activePage === "results" ? "#FF8379" : "white")}
                >
                  Results
                </Link>
              )}
              {!admin && !volunteer && !sponsor && showTeam && (
                <Link
                  href="/team"
                  id="team-page"
                  style={style(activePage === "team" ? "#FF8379" : "white")}
                >
                  Team
                </Link>
              )}
              {!admin && !volunteer && !sponsor && showProjectTeam && (
                <Link
                  href="/projectTeam"
                  id="projectTeam-page"
                  style={style(
                    activePage === "projectTeam" ? "#FF8379" : "white"
                  )}
                >
                  Manage Team
                </Link>
              )}
              {!admin && !volunteer && !sponsor && showMaps && (
                <Link
                  href="/maps"
                  id="maps-page"
                  style={style(activePage === "maps" ? "#FF8379" : "white")}
                >
                  Maps
                </Link>
              )}
              {!admin && !volunteer && !sponsor && showAPI && (
                <Link
                  href="/api-directory"
                  id="api-directory-page"
                  style={style(activePage === "api" ? "#FF8379" : "white")}
                >
                  APIs
                </Link>
              )}
              {showLogout && (
                <Link
                  href="/auth/logout"
                  id="auth-logout-page"
                  style={style(activePage === "logout" ? "#FF8379" : "white")}
                >
                  Logout
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/"
                id="main-page"
                style={style(activePage === "/" ? "#FF8379" : "white")}
              >
                Home
              </Link>
              <Link
                href="/auth/login"
                id="auth-login-page"
                style={style(activePage === "login" ? "#FF8379" : "white")}
              >
                Login
              </Link>
            </>
          )}
        </Links>
      </NavbarContainer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 30px 0;
`;

const NavbarContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ theme }) =>
    theme.media.tablet`
      flex-direction: column;
    `}
`;

const HeaderLogoImg = styled.img`
  width: 220px;

  ${({ theme }) =>
    theme.media.mobile`
      width: 120px;
    `}
`;

const Links = styled.div`
  display: flex;
  justify-content: space-between;

  a {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.black};
    text-transform: uppercase;
    padding: 0 8px;
    font-size: 14px;
  }

  ${({ theme }) =>
    theme.media.tablet`
      flex-wrap: wrap;
      justify-content: center;
    `}
`;

export default Navbar;
