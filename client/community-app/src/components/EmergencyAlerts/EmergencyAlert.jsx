import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const GET_EMERGENCY_ALERTS = gql`
  query GetEmergencyAlerts {
    getEmergencyAlerts {
      id
      message
      resolved
      createdAt
    }
  }
`;

const CREATE_EMERGENCY_ALERT = gql`
  mutation CreateEmergencyAlert($message: String!) {
    createEmergencyAlert(message: $message) {
      id
      message
      resolved
      createdAt
    }
  }
`;

const RESOLVE_EMERGENCY_ALERT = gql`
  mutation ResolveEmergencyAlert($id: ID!) {
    resolveEmergencyAlert(id: $id) {
      id
      message
      resolved
      createdAt
    }
  }
`;

const EmergencyAlertsPage = () => {
	const { loading, error, data, refetch } = useQuery(GET_EMERGENCY_ALERTS);
	const [createAlert] = useMutation(CREATE_EMERGENCY_ALERT);
	const [resolveAlert] = useMutation(RESOLVE_EMERGENCY_ALERT);
	const [newAlertMessage, setNewAlertMessage] = useState('');
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			refetch();
		}, 5000);

		return () => clearInterval(interval);
	}, [refetch]);

	const handleCreateAlert = async () => {
		if (newAlertMessage.trim()) {
			await createAlert({ variables: { message: newAlertMessage } });
			setNewAlertMessage('');
			refetch();
		}
	};

	const handleResolveAlert = async (id) => {
		await resolveAlert({ variables: { id } });
		refetch();
	};

	if (loading) return <p>⏳Loading⌛</p>;
	if (error) return <p>Error: {error.message}</p>;

	const sortedByDate = [...data.getEmergencyAlerts].sort((a, b) => {
		return new Date(a.createdAt) - new Date(b.createdAt);
	});

	const sortedAlerts = sortedByDate.reverse().sort((a, b) => {
		return (a.resolved === b.resolved) ? 0 : (a.resolved ? 1 : -1);
	});

	const unresolvedCount = sortedAlerts.filter(alert => !alert.resolved).length;

	return (
		<div className='notificationContainer'>
			<div onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
				<span style={{ marginLeft: '8px' }}> {unresolvedCount > 0 ?
					unresolvedCount == 1 ? `🚨${unresolvedCount} Ongoing Emergency🚨` : `🚨${unresolvedCount} Ongoing Emergencies🚨` :
					"🕊️No Emergencies🌞"}</span>
			</div>
			{isOpen && (
				<ul className='notificationDropdown'>
					<li className='bottom-row'>
						<input
							type="text"
							value={newAlertMessage}
							onChange={(e) => setNewAlertMessage(e.target.value)}
							placeholder="New alert message"
						/>
						<button className='resolveButton' onClick={handleCreateAlert}>Create Alert</button>
					</li>

					{sortedAlerts.map((alert) => (
						<li key={alert.id} className={alert.resolved ? 'resolved' : 'unresolved'}>
							<p>{alert.message}</p>
							<div className='bottom-row'>
								<p className='date'>Reported on {new Date(Number(alert.createdAt)).toLocaleString()}</p>
								{!alert.resolved && (
									<button className='resolveButton' onClick={() => handleResolveAlert(alert.id)}>Resolve</button>
								)}
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default EmergencyAlertsPage;
