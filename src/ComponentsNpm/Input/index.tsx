import { forwardRef, ReactNode, useEffect, useState } from 'react';
import { TCep } from '../../Types/TCep';
import { TCnpj } from '../../Types/TCnpj';
import { TCpf } from '../../Types/TCpf';
import { TCurrency } from '../../Types/TCurrency';
import { mask } from '../../Utils/Mask';

interface ISajermannReactInput extends React.HTMLProps<HTMLInputElement> {
	labelProps?: React.DetailedHTMLProps<
		React.LabelHTMLAttributes<HTMLLabelElement>,
		HTMLLabelElement
	>;

	containerProps?: React.DetailedHTMLProps<
		React.HTMLAttributes<HTMLDivElement>,
		HTMLDivElement
	>;

	errorContainerProps?: React.DetailedHTMLProps<
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
		applyMask?: TCurrency | TCnpj | TCpf | TCep;
	};

	debounce?: number;

	errors?: string[];
	renderTop?: ReactNode;
	renderBottom?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, ISajermannReactInput>(
	(
		{
			labelProps,
			onBeforeChange,
			containerProps,
			errorContainerProps,
			onChange,
			debounce,
			errors,
			renderTop,
			renderBottom,
			...props
		},
		ref
	) => {
		const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

		async function onChangeCustom(e: React.ChangeEvent<HTMLInputElement>) {
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
				valueTemp = valueTemp.replace(/\d/g, '');
			}

			if (onBeforeChange?.removeSpecialCharacter) {
				valueTemp = valueTemp.replace(
					/[!@#$%&*(),.?":{ }|<>'¨_=+[;^~´`°\]\\\-/]/g,
					''
				);
			}

			if (onBeforeChange?.regexForReplace) {
				valueTemp = valueTemp.replace(onBeforeChange?.regexForReplace, '');
			}

			if ((onBeforeChange?.applyMask as TCurrency)?.currency) {
				valueTemp = mask.real({
					value: valueTemp,
					decimalPlace: (onBeforeChange?.applyMask as TCurrency).currency
						?.decimalPlace,
				});
			}

			if ((onBeforeChange?.applyMask as TCnpj)?.cnpj) {
				valueTemp = mask.cnpj(valueTemp);
			}

			if ((onBeforeChange?.applyMask as TCpf)?.cpf) {
				valueTemp = mask.cpf(valueTemp);
			}

			if ((onBeforeChange?.applyMask as TCep)?.cep) {
				valueTemp = mask.cep(valueTemp);
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

		useEffect(() => {
			const timer = setTimeout(() => {
				if (debounce && event) {
					onChangeCustom(event);
				}
			}, debounce);

			return () => clearTimeout(timer);
		}, [event]);

		return (
			<div {...containerProps}>
				{renderTop}
				{(labelProps || props.label) && (
					<label htmlFor={props.id} {...labelProps}>
						{labelProps?.children || props.label}
					</label>
				)}

				<input {...props} onChange={preOnChange} ref={ref} />
				{errors && (
					<div {...errorContainerProps}>
						{errors?.map(error => (
							<span key={error}>{error}</span>
						))}
					</div>
				)}
				{renderBottom}
			</div>
		);
	}
);

export { Input };
export type { ISajermannReactInput };
