/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMemo } from 'react';
import styles from './styles.module.css';

interface Props extends React.HTMLProps<HTMLInputElement> {
	startContent?: JSX.Element;
	endContent?: JSX.Element;
	customlabel?: {
		text: string;
		position?: 'Top' | 'Left';
	};
	removeBeforeChange?: {
		number?: boolean;
		letterUpper?: boolean;
		letterLow?: boolean;
		specialCharacter?: boolean;
		regexForReplace?: RegExp;
	};
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Input({
	startContent,
	endContent,
	customlabel,
	removeBeforeChange,
	onChange,
	...props
}: Props) {
	function onChangeCustom(e: React.ChangeEvent<HTMLInputElement>) {
		if (!removeBeforeChange && onChange) {
			onChange(e);
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
		if (onChange) {
			onChange(temp);
		}
	}

	function verifyClassesContainer() {
		const classesToReturn = [styles.container];

		if (customlabel?.position === 'Left') {
			classesToReturn.push(styles.containerRow);
		}
		return classesToReturn.join(' ');
	}

	function verifyClassesInput() {
		const classesToReturn = [styles.input];

		if (startContent) {
			classesToReturn.push(styles.hasStartContent);
		}

		if (endContent) {
			classesToReturn.push(styles.hasEndContent);
		}

		if (props.className) {
			classesToReturn.push(props.className);
		}

		return classesToReturn.join(' ');
	}

	const buildLabel = useMemo(() => {
		if (customlabel) {
			return (
				<div>
					<label htmlFor={props.id}>{customlabel.text}</label>
				</div>
			);
		}
		return null;
	}, [customlabel]);

	const buildStartContent = useMemo(() => {
		if (startContent) {
			return <div className={styles.startContent}>{startContent}</div>;
		}
		return null;
	}, [startContent]);

	const buildEndContent = useMemo(() => {
		if (endContent) {
			return <div className={styles.endContent}>{endContent}</div>;
		}
		return null;
	}, [endContent]);

	return (
		<div className={verifyClassesContainer()}>
			{buildLabel}
			<div className={styles.subContainer}>
				<div className={`${styles.containerInput}`}>
					{buildStartContent}
					<input
						{...props}
						onChange={onChangeCustom}
						className={verifyClassesInput()}
					/>
					{buildEndContent}
				</div>
			</div>
		</div>
	);
}

export { Input };
