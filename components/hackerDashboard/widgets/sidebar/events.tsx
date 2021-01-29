import styled from "styled-components";

const HackathonEvents = ({ events }) => {
  return (
    <div>
      <h3>Upcoming Events</h3>
      <EventList>
        {events.map((e) => (
          <Event>
            <h3>{e.name}</h3>
            <p>{e.description}</p>
            <p>
              {new Date(e.startsAt).toLocaleTimeString()}{" "}
              {new Date(e.startsAt).toLocaleDateString()}
            </p>
            <p>
              {new Date(e.endsAt).toLocaleTimeString()}{" "}
              {new Date(e.endsAt).toLocaleDateString()}
            </p>
          </Event>
        ))}
      </EventList>
    </div>
  );
};

const EventList = styled.div`
  border-radius: 4px;
  max-height: 400px;
  overflow: scroll;
`;

const Event = styled.div`
  margin-top: 24px;

  :first-child {
    margin-top: 0;
  }

  h3 {
    font-weight: 600;
    color: ${({ theme }) => theme.colors.peach};
    padding-bottom: 4px;
  }
`;

export default HackathonEvents;
