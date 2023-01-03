import { TRealFormat } from '../../Types/TRealFormat';

export function real({
	value = '',
	decimalPlace = 2,
	thousandSeparator = '.',
	decimalSeparator = ',',
}: TRealFormat) {
	try {
		const decimalsElement = 10 ** decimalPlace;
		const thousandSeparatorFormatted = `$1${thousandSeparator}`;
		let v = value.replace(/\D/g, '');
		v = `${(+v / decimalsElement).toFixed(decimalPlace)}`;
		const splits = v.split('.');
		const partOne = splits[0]
			.toString()
			.replace(/(\d)(?=(\d{3})+(?!\d))/g, thousandSeparatorFormatted);
		const final =
			typeof splits[1] === 'undefined'
				? partOne
				: partOne + decimalSeparator + splits[1];

		return `R$ ${final}`;
	} catch {
		return 'R$ 0,00';
	}
}

// Thanks https://medium.com/reactbrasil/m%C3%A1scara-de-cnpj-com-react-regex-bafb58d2285e
function cnpj(value: string) {
	try {
		return value
			.replace(/\D+/g, '')
			.replace(/(\d{2})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1/$2')
			.replace(/(\d{4})(\d)/, '$1-$2')
			.replace(/(-\d{2})\d+$/, '$1');
	} catch {
		return value;
	}
}

// Thanks https://medium.com/trainingcenter/mascara-de-cpf-com-react-javascript-a07719345c93
function cpf(value: string) {
	try {
		return value
			.replace(/\D/g, '')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})/, '$1-$2')
			.replace(/(-\d{2})\d+$/, '$1');
	} catch {
		return value;
	}
}

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

export const mask = { real, cnpj, cpf, cep };
