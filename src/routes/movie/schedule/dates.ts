export function getDatesByDayIndonesian() {
	const today = new Date();
	const year = today.getFullYear();
	const month = today.getMonth(); // 0-based index

	// Indonesian day names
	const dayNames = ['minggu', 'senin', 'selasa', 'rabu', 'kamis', 'jumat', 'sabtu'];

	// Initialize result as a Map
	const dates = new Map();
	dayNames.forEach((day) => {
		dates.set(day, []);
	});

	// Format date in Indonesian style
	const formatDateIndonesian = (date) => {
		const options = { day: 'numeric', month: 'long', year: 'numeric' };
		return date.toLocaleDateString('id-ID', options);
	};

	// Get the number of days in the current month
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
			dates.get(dayNames[dayOfWeek]).push(formatDateIndonesian(date));
		}
	}

	// Add dates from the current month
	for (let day = 1; day <= daysInMonth; day++) {
		const date = new Date(year, month, day);
		const dayOfWeek = date.getDay();
		dates.get(dayNames[dayOfWeek]).push(formatDateIndonesian(date));
	}

	// Determine the trailing dates from the next month
	const lastDay = new Date(year, month, daysInMonth).getDay(); // Day of the week for the last day
	const nextMonthDays = 6 - lastDay; // Number of trailing days after the last day
	for (let i = 1; i <= nextMonthDays; i++) {
		const date = new Date(year, month + 1, i);
		const dayOfWeek = date.getDay();
		dates.get(dayNames[dayOfWeek]).push(formatDateIndonesian(date));
	}

	return dates;
}
