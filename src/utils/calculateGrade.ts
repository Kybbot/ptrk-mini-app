export default function calculateGrade(value: number, max: number) {
	if (typeof value !== 'number' || typeof max !== 'number') {
		throw new Error('Both input values must be numbers');
	}

	if (max <= 0) {
		throw new Error('The maximum value must be greater than zero');
	}

	const percentage = (value / max) * 100;
	const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
	const roundedPercentage = Math.round(clampedPercentage * 100) / 100;
	const grade = (roundedPercentage / 20).toFixed(1); 
	return parseFloat(grade); 
}
