import { useState } from "react";
import { Dash, AdminDashboard } from "@/components/hackerDashboard";

import {
  handleLoginRedirect,
  getProfile,
  handleVolunteerRedirect,
  handleSponsorRedirect,
  handleDashboardRedirect,
  getHackathonConstants,
  generatePosts,
  getPublicEvents,
} from "@/lib";

import { getHackathonConstants } from "../lib";

import { getAnnouncements } from "../lib/getAnnouncements";

import { generatePosts } from "../lib/referrerCode";

const Dashboard = ({ profile, houses, events, socialPosts, hackathonConstants, announcements }) => {

  const [view, setView] = useState("hacker");

  const switchRole = () => {
    if (view === "admin") {
      setView("hacker");
    } else {
      setView("admin");
    }
  };

  const getDashToRender = () => {
    if (view === "admin") {
      return (
        <AdminDashboard
          profile={profile}
          events={events}
          hackathonConstants={hackathonConstants}
        />
      );
    } else {
      return (
        <Dash
          profile={profile}
          events={events}
          hackathonConstants={hackathonConstants}
          announcements={announcements}
        />
      );
    }
  };

  return (
    <>
      {process.env.NODE_ENV === "development" ? (
        <button
          onClick={switchRole}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          Switch role
        </button>
      ) : (
        ""
      )}
      {getDashToRender()}
    </>
  );
};

export async function getServerSideProps({ req }) {
  const profile = await getProfile(req);
  //const houses = await getHouses(req);
  const announcements = await getAnnouncements(req, profile);
  const hackathonConstants = await getHackathonConstants();
  const currentEvents = await getPublicEvents(req);
  const events = currentEvents ? currentEvents["events"] : [];
  const houses = [];

  // Null profile means user is not logged in
  if (!profile) {
    handleLoginRedirect(req);
  } else if (profile.role == "admin") {
    // handleAdminRedirect(req);
  } else if (profile.role == "volunteer") {
    handleVolunteerRedirect(req);
  } else if (profile.role == "sponsor") {
    handleSponsorRedirect(req);
  }
  
  if (
    !hackathonConstants.find((constant) => constant.name === "showDash")
      ?.boolean
  ) {
    await handleDashboardRedirect(req);
  }

  let socialPosts = {};
  if (profile) {
    socialPosts = generatePosts(profile);
  }

  return {
    props: {
      houses,
      profile,
      socialPosts,
      announcements,
      events,
      hackathonConstants,

    },
  };
}

export default Dashboard;
