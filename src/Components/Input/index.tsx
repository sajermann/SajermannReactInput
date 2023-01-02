import { useEffect, useState } from 'react';

type PropsRealFormat = {
	value?: string;
	decimalPlace?: number;
	thousandSeparator?: string;
	decimalSeparator?: string;
};

function maskRealForInput({
	value = '',
	decimalPlace = 2,
	thousandSeparator = '.',
	decimalSeparator = ',',
}: PropsRealFormat) {
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
function maskCnpj(value: string) {
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
function maskCpf(value: string) {
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

type PropsCep = {
	currency?: undefined;
	cpf?: undefined;
	cnpj?: undefined;
	cep?: true;
};

type PropsCnpj = {
	cpf?: undefined;
	cnpj?: true;
};

type PropsCpf = {
	cpf?: true;
	cnpj?: undefined;
};

type PropsCurrency = {
	cnpj?: undefined;
	cpf?: undefined;
	currency: Pick<PropsRealFormat, 'value' | 'decimalPlace'>;
};

interface Props extends React.HTMLProps<HTMLInputElement> {
	labelProps?: React.DetailedHTMLProps<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;

	containerProps?: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;

	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

	onBeforeChange?: {
		removeNumber?: boolean;
		removeUpperCase?: boolean;
		removeLowerCase?: boolean;
		removeSpecialCharacter?: boolean;
		regexForReplace?: RegExp;
		fn?: (
			e: React.ChangeEvent<HTMLInputElement>
		) => React.ChangeEvent<HTMLInputElement>;
		applyMask?: PropsCurrency | PropsCnpj | PropsCpf | PropsCep;
	};

	debounce?: number;
}

function Input({
	labelProps,
	onBeforeChange,
	containerProps,
	onChange,
	debounce,
	...props
}: Props) {
	const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

	function onChangeCustom(e: React.ChangeEvent<HTMLInputElement>) {
		if (!onBeforeChange && onChange) {
			onChange(e);
			return;
		}

		const temp = { ...e };
		let valueTemp = temp.target.value;

		if (onBeforeChange?.removeLowerCase) {
			valueTemp = valueTemp.replace(/[a-z]/g, '');
		}

		if (onBeforeChange?.removeUpperCase) {
			valueTemp = valueTemp.replace(/[A-Z]/g, '');
		}

		if (onBeforeChange?.removeNumber) {
			valueTemp = valueTemp.replace(/[0-9]/g, '');
		}

		if (onBeforeChange?.removeSpecialCharacter) {
			valueTemp = valueTemp.replace(
				/[!@#$%^&*(),.?":{ }|<>'¨_=+[;^~´`°\]\\\-/]/g,
				''
			);
		}

		if (onBeforeChange?.regexForReplace) {
			valueTemp = valueTemp.replace(onBeforeChange?.regexForReplace, '');
		}

		if ((onBeforeChange?.applyMask as PropsCurrency).currency) {
			valueTemp = maskRealForInput({
				value: valueTemp,
				decimalPlace: (onBeforeChange?.applyMask as PropsCurrency).currency
					.decimalPlace,
			});
		}

		if (onBeforeChange?.applyMask?.cnpj) {
			valueTemp = maskCnpj(valueTemp);
		}

		if (onBeforeChange?.applyMask?.cpf) {
			valueTemp = maskCpf(valueTemp);
		}

		temp.target.value = valueTemp;

		if (onBeforeChange?.fn && onChange) {
			const newEvent = onBeforeChange?.fn(temp);
			onChange(newEvent);
			return;
		}

		if (onChange) {
			onChange(temp);
		}
	}

	async function preOnChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (!debounce) {
			onChangeCustom(e);
			return;
		}
		setEvent(e);
	}

	if (debounce) {
		useEffect(() => {
			const timer = setTimeout(() => {
				if (debounce && event) {
					onChangeCustom(event);
				}
			}, debounce);

			return () => clearTimeout(timer);
		}, [event]);
	}

	return (
		<div {...containerProps}>
			{(labelProps || props.label) && (
				<label htmlFor={props.id} {...labelProps}>
					{labelProps?.children || props.label}
				</label>
			)}

			<input {...props} onChange={preOnChange} />
		</div>
	);
}

export { Input };
