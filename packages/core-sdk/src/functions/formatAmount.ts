import numbro from 'numbro';

export function formatAmount(num: number | undefined, digits = 2) {
	if (num === 0) return '0';
	if (!num) return '-';
	if (num < 0.001) {
		return '<0.001';
	}
	return numbro(num).format({
		average: true,
		mantissa: num > 1000 ? 2 : digits,
		abbreviations: {
			million: 'M',
			billion: 'B'
		}
	});
}
