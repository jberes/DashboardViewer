import { getDashboardNames } from '../services/reveal-server';
import { useEffect, useState } from 'react';

export const useGetDashboardNames = () => {
	const [DashboardNames, setDashboardNames] = useState([]);

	useEffect(() => {
		let ignore = false;
		getDashboardNames()
			.then((data) => {
				if (!ignore) {
					setDashboardNames(data);
				}
			})
		return () => {
			ignore = true;
		}
	}, []);

	return DashboardNames;
}
