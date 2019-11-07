import React from "react";
import * as Sentry from "@sentry/browser";

import { handleLoginRedirect, getProfile } from "../lib/authenticate";

import Head from "../components/Head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { Background, Container } from "../styles";

import Step from "../components/steps/Status";

const Dashboard = ({ profile }) => {
  return (
    <>
      <Head title="HackSC Odyssey - Dashboard" />
      <Navbar loggedIn activePage="dashboard" />
      <Background>
        {profile && (
          <Container>{profile && <Step profile={profile} />}</Container>
        )}
      </Background>
      <Footer />
    </>
  );
};

Dashboard.getInitialProps = async ({ req }) => {
  const profile = await getProfile(req);

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  }

  if (typeof window !== "undefined") {
    Sentry.configureScope(function(scope) {
      scope.setExtra("profile", profile);
    });
  }

  return {
    profile
  };
};

export default Dashboard;
