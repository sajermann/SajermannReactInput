export function cep(value: string) {
	try {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{5})(\d)/, '$1-$2')
			.replace(/(-\d{3})\d+$/, '$1');
	} catch {
		return value;
	}
}
