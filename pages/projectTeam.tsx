import React, { useState } from "react";
import styled from "styled-components";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Background, Container, Flex, Column } from "../styles";
import ButtonWithTextForm from "../components/ButtonWithTextForm";
import { useToasts } from "react-toast-notifications";

const ProjectTeam = props => {
  const [team, setTeam] = useState(props.team);
  const { addToast } = useToasts();
  const handleJoinProjectTeam = code => {
    const res = fetch("/api/projectTeam/join/" + code)
      .then(res => {
        setTeam(res.json());
      })
      .catch(e => {
        addToast("Failed to join team: " + code, { appearance: "error" });
      });
  };

  return (
    <>
      <Head title="HackSC Odyssey - Team Setup" />
      <Navbar loggedIn activePage="team" />
      <Background>
        <Container>
          <h1>HackSC Project Team Setup</h1>
          <p>
            On this tab, you can join, create, and view your HackSC Project. To
            join an existing project, simply enter a team code given to you by a
            team mate. If you'd like to create a new project, enter a project
            name and send out your team's code to potential team mates.
          </p>
          <NoTeamFlex direction="row" tabletVertical justify="space-between">
            <Column flexBasis={48}>
              <ButtonWithTextForm
                title="Join Team"
                label="Enter your team code"
                buttonText="Join"
                onSubmit={handleJoinProjectTeam}
              />
            </Column>

            <Column flexBasis={48}>Create Team</Column>
          </NoTeamFlex>
        </Container>
      </Background>
      <Footer />
    </>
  );
};

async function getProjectTeam(req): Promise<ProjectTeam> {
  const urlRoute = req
    ? /* Serverside */ process.env.URL_BASE + "api/projectTeam/self"
    : /* Client */ "/api/projectTeam/self";
  const result = await fetch(
    urlRoute,
    req
      ? {
          headers: req.headers
        }
      : null
  );

  return result.json();
}

ProjectTeam.getInitialProps = async ({ req, query }) => {
  const projectTeam = await getProjectTeam(req);

  return {
    projectTeam
  };
};

const NoTeamFlex = styled(Flex)`
  margin-top: 48px;
`;

export default ProjectTeam;
