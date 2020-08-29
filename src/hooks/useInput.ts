import {
    BaseSyntheticEvent,
    createRef,
    Dispatch,
    RefObject,
    SetStateAction,
    useCallback,
    useMemo,
    useState
} from "react";

const emailRegexPattern = "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,}(?:\\.[A-Za-z]{2,})?)$";

const Validators = {
    required: (value: string) => value.trim().length > 0,
    email: (value: string) => new RegExp(emailRegexPattern).test(value),
    password: (value: string) => {
        const validations = [
            new RegExp(/([a-z])+/g).test(value),
            new RegExp(/([A-Z])+/g).test(value),
            new RegExp(/([0-9])+/g).test(value),
            new RegExp(/([^0-9a-zA-Z])+/g).test(value),
            value.length >= 8,
        ];
        return validations.every(t => t);
    },
};

export type OnChangeHandler = (e: BaseSyntheticEvent) => void;
export type UseInput<T = string> = {
    defaultValue: T,
    value: T,
    clear: () => void,
    setValue: Dispatch<SetStateAction<T>>,
    onChange: OnChangeHandler,
    isValid: boolean,
    ref: RefObject<HTMLInputElement>
    bind: {
        onChange: OnChangeHandler,
        defaultValue?: T,
        value?: T,
        type?: string
    },
};

type ValidationFunction<T = string> = (value: T) => boolean;

export interface UseInputOptions<T = string> {
    defaultValue?: T,
    validate?: ValidationFunction<T>[],
    bind?: any
}

const defaultOptions: UseInputOptions = {
    validate: [() => true],
};

export function useInput<T = string>(options?: T | UseInputOptions): UseInput<T> {
    let _options;

    // Use default options if no options were given
    if (!options) {
        _options = defaultOptions;
    }
    // If options is a string, treat it as the default value
    else if (typeof options === "string") {
        _options = {
            ...defaultOptions,
            defaultValue: options,
        };
    } else {
        _options = {...options};
    }

    const {validate, defaultValue = ""} = _options;

    const [value, setValue] = useState<T>(defaultValue);
    let callback: CallableFunction | undefined = undefined;

    const onChange = (e: BaseSyntheticEvent) => {
        e.persist();
        let newValue = e.target.value;

        setValue(() => newValue);
        if (callback) {
            callback(newValue);
        }
    };

    const isValid = () => {
        let isValid;
        if (!validate || validate.length === 0) {
            isValid = true;
        } else {
            isValid = validate.every(v => v(value));
        }

        return isValid;
    };

    const clear = useCallback(() => setValue(defaultValue), []);
    const ref = createRef<HTMLInputElement>();

    return useMemo(() => ({
        defaultValue,
        value,
        clear,
        setValue,
        onChange,
        isValid: isValid(),
        ref,

        bind: {

            onChange,
            value,
            ref,
        },
    }), [defaultValue, value, clear, isValid]);
}

export default useInput;

export {
    Validators,
};
