// client/community-app/src/components/HelpRequests/HelpRequestList.jsx
import React, { useState, useEffect } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { personalizationClient } from "../../apolloClients";

export const GET_HELP_REQUESTS = gql`
  query GetHelpRequests {
    getHelpRequests {
      id
      title
      description
      category
      postedBy
      createdAt
    }
  }
`;

const GET_VOLUNTEERS = gql`
  query GetVolunteers {
    getVolunteers {
      id
      name
      type
      contact
    }
  }
`;

const MATCH_VOLUNTEERS = gql`
  mutation MatchVolunteers($requestedBy: String!, $volunteers: String!, $size: Int!) {
    matchVolunteers(requestedBy: $requestedBy, volunteers: $volunteers, size: $size)
  }
`;


  export default function HelpRequestList() {
    const { data: helpRequestsData, loading: helpRequestsLoading, error: helpRequestsError } = useQuery(GET_HELP_REQUESTS);
    const { data: volunteersData, loading: volunteersLoading, error: volunteersError } = useQuery(GET_VOLUNTEERS);
    const [matches, setMatches] = useState({});
    const [matchVolunteers] = useMutation(MATCH_VOLUNTEERS, {
      client: personalizationClient,
    });

    useEffect(() => {
      if (helpRequestsData && helpRequestsData.getHelpRequests && volunteersData && volunteersData.getVolunteers) {
        // Format volunteer data into a single string
        const formattedVolunteers = volunteersData.getVolunteers
          .map((v) => `${v.name} (${v.type}): ${v.contact}`)
          .join(". ");

          console.log("Formatted Volunteers:", formattedVolunteers);
  
        // Generate matches for each help request
        helpRequestsData.getHelpRequests.forEach(async (request) => {
          if (!matches[request.id]) {
            try {
              const { data: matchData } = await matchVolunteers({
                variables: {
                  requestedBy: `${request.title} - ${request.description}`,
                  volunteers: formattedVolunteers,
                  size: 200, // Adjust the size parameter as needed
                },
              });
              setMatches((prev) => ({
                ...prev,
                [request.id]: matchData.matchVolunteers,
              }));
            } catch (err) {
              console.error(`Error matching volunteers for request ${request.id}:`, err);
            }
          }
        });
      }
    }, [helpRequestsData, volunteersData, matchVolunteers, matches]);


    if (helpRequestsLoading || volunteersLoading) return <p>Loading help requests and volunteers...</p>;
    if (helpRequestsError || volunteersError) {
      console.error("Error in HelpRequestList:", helpRequestsError || volunteersError);
      return <p>Sorry! Something went wrong while loading data.</p>;
    }
  
    if (helpRequestsData.getHelpRequests.length === 0) {
      return <p>No help requests yet. Feel free to ask for help!</p>;
    }

  return (
    <div>
      {helpRequestsData.getHelpRequests.map(req => (
        <div key={req.id} className="card mb-3">
          <div className="card-body">
            <h5>{req.title}</h5>
            <p>{req.description}</p>
            <p><strong>Category:</strong> {req.category}</p>
            <p className="text-muted" style={{ fontSize: "0.8em" }}>
              Posted by {req.postedBy} on {new Date(parseInt(req.createdAt)).toLocaleString()}
            </p>

            {/* Matchmaking Section */}
            {matches[req.id] ? (
              <div className="alert alert-info">
                <strong>Matchmaking Suggestions:</strong><br />{matches[req.id]}
              </div>
            ) : (
              <div className="alert alert-warning">Generating match report...</div>
            )}

          </div>
        </div>
      ))}
    </div>
  );
}
