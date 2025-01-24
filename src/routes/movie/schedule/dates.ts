// Indonesian day names
const dayNames = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];

// Indonesian month names
export const monthNames = [
	'Januari',
	'Februari',
	'Maret',
	'April',
	'Mei',
	'Juni',
	'Juli',
	'Agustus',
	'September',
	'Oktober',
	'November',
	'Desember'
];

export const getCurrentDate = () => {
	const dateInJakarta = new Date().toLocaleString('id-ID', {
		timeZone: 'Asia/Jakarta',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	});

	console.log(dateInJakarta);

	const [day, month, year] = dateInJakarta.split('/');

	return {
		date: parseInt(day, 10),
		month: parseInt(month, 10), // Capitalize the first letter
		year: parseInt(year, 10)
	};
};

const getFormattedDateInJakarta = (date) => {
	const options = { timeZone: 'Asia/Jakarta', year: 'numeric', month: '2-digit', day: '2-digit' };
	const dateInJakarta = date.toLocaleDateString('en-CA', options); // 'en-CA' gives ISO format YYYY-MM-DD

	return dateInJakarta;
};

export function getDatesByDayIndonesian(year, month) {
	// Indonesian day names
	const dayNames = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];

	// Helper function to create the date object
	const createDateObject = (date) => {
		const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if needed
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Add leading zero, month is 0-based
		const year = date.getFullYear();
		const fullDate = `${year}-${month}-${day}`; // Format: YYYY-MM-DD

		return {
			day: parseInt(day),
			month: parseInt(month),
			year,
			fullDate
		};
	};

	// Initialize result as a Map
	const dates = new Map();
	dayNames.forEach((day) => {
		dates.set(day, []);
	});

	// Get the number of days in the given month
	const daysInMonth = new Date(year, month + 1, 0).getDate();

	// Determine the first day of the month
	const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday, ..., 6 = Saturday

	// Determine the trailing dates from the previous month
	const prevMonthDays = firstDay; // Number of trailing days before the 1st
	if (prevMonthDays > 0) {
		const prevMonthLastDay = new Date(year, month, 0).getDate(); // Last day of the previous month
		for (let i = prevMonthDays; i > 0; i--) {
			const date = new Date(year, month - 1, prevMonthLastDay - i + 1);
			const dayOfWeek = date.getDay();
			dates.get(dayNames[dayOfWeek]).push(createDateObject(date));
		}
	}

	// Add dates from the current month
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);
		const dayOfWeek = date.getDay();
		dates.get(dayNames[dayOfWeek]).push(createDateObject(date));
	}

	// Determine the trailing dates from the next month
	const lastDay = new Date(year, month, daysInMonth).getDay(); // Day of the week for the last day
	const nextMonthDays = 6 - lastDay; // Number of trailing days after the last day
	for (let i = 1; i <= nextMonthDays; i++) {
		const date = new Date(year, month + 1, i);
		const dayOfWeek = date.getDay();
		dates.get(dayNames[dayOfWeek]).push(createDateObject(date));
	}

	return dates;
}
