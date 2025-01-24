// Indonesian day names
const dayNames = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];

// Indonesian month names
const monthNames = [
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

export function getDatesByDayIndonesian(year, month) {
	// Initialize result as a Map
	const dates = new Map();
	dayNames.forEach((day) => {
		dates.set(day, []);
	});

	// Helper function to create the date object
	const createDateObject = (date) => ({
		day: date.getDate(),
		month: monthNames[date.getMonth()],
		year: date.getFullYear()
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
