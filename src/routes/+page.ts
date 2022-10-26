import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const response = await fetch('/api/calendar', {
		method: 'GET'
		// body: JSON.stringify({
		// }),
		// headers: { 'content-type': 'application/json' }
	});
	const res = await response.json();
	console.log(res);

	return {
		calendarData: {
			title: `Title for ${'Hello'} goes here`
		}
	};
};
