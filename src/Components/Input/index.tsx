import { useEffect, useState } from 'react';

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

	removeBeforeChange?: {
		number?: boolean;
		letterUpper?: boolean;
		letterLow?: boolean;
		specialCharacter?: boolean;
		regexForReplace?: RegExp;
		fn?: (
			e: React.ChangeEvent<HTMLInputElement>
		) => React.ChangeEvent<HTMLInputElement>;
	};

	debounce?: number;
}

function Input({
	labelProps,
	removeBeforeChange,
	containerProps,
	onChange,
	debounce,
	...props
}: Props) {
	const [event, setEvent] = useState<React.ChangeEvent<HTMLInputElement>>();

	function onChangeCustom(e: React.ChangeEvent<HTMLInputElement>) {
		if (!removeBeforeChange && onChange) {
			onChange(e);
			return;
		}

		const temp = { ...e };
		let valueTemp = temp.target.value;
		if (removeBeforeChange?.letterLow) {
			valueTemp = valueTemp.replace(/[a-z]/g, '');
		}
		if (removeBeforeChange?.letterUpper) {
			valueTemp = valueTemp.replace(/[A-Z]/g, '');
		}
		if (removeBeforeChange?.number) {
			valueTemp = valueTemp.replace(/[0-9]/g, '');
		}
		if (removeBeforeChange?.specialCharacter) {
			valueTemp = valueTemp.replace(
				/[!@#$%^&*(),.?":{ }|<>'¨_=+[;^~´`°\]\\\-/]/g,
				''
			);
		}
		if (removeBeforeChange?.regexForReplace) {
			valueTemp = valueTemp.replace(removeBeforeChange?.regexForReplace, '');
		}

		temp.target.value = valueTemp;

		if (removeBeforeChange?.fn && onChange) {
			const newEvent = removeBeforeChange?.fn(temp);
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
			{labelProps && (
				<label htmlFor={props.id} {...labelProps}>
					{labelProps.children}
				</label>
			)}

			<input {...props} onChange={preOnChange} />
		</div>
	);
}

export { Input };
