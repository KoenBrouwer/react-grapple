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
import useToggle from "./useToggle";

const emailRegexPattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([A-Za-z]{2,}(?:\.[A-Za-z]{2,})?)$/i;

const Validators = {
    required: (value: string) => value.trim().length > 0,
    email: (value: string) => (new RegExp(emailRegexPattern)).test(value),
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
    reset: () => void,
    /** @deprecated Use reset() instead. */
    clear: () => void,
    setValue: Dispatch<SetStateAction<T>>,
    onChange: OnChangeHandler,
    isValid: boolean,
    dirty: boolean,
    ref: RefObject<HTMLInputElement>
    bind: {
        onChange: OnChangeHandler,
        defaultValue?: T,
        value?: T,
        type?: string,
        placeholder?: string,
    },
};

type ValidationFunction<T = string> = (value: T) => boolean;

export interface UseInputOptions<T = string> {
    placeholder?: string,
    defaultValue?: T,
    validate?: ValidationFunction<T>[],
    bind?: any
}

const defaultOptions: UseInputOptions = {
    validate: [() => true],
};

interface SetValueOptions {
    triggerDirty?: boolean
}

export function useInput<T = string>(options?: T | UseInputOptions<T>): UseInput<T> {
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

    const {validate, defaultValue = "", placeholder} = _options;

    const [value, _setValue] = useState<T>(defaultValue);
    const [dirty, toggleDirty] = useToggle(false);

    const setValue = useCallback((newValue: SetStateAction<T>, {triggerDirty = true}: SetValueOptions = {}) => {
        _setValue(newValue);
        if (triggerDirty) {
            toggleDirty(true);
        }
    }, [toggleDirty]);

    const onChange = useCallback((e: BaseSyntheticEvent) => {
        e.persist();
        toggleDirty(true);
        setValue(() => e.target.value);
    }, [toggleDirty, setValue]);

    const isValid = useCallback(() => {
        let isValid;
        if (!validate || validate.length === 0) {
            isValid = true;
        } else {
            isValid = validate.every(v => v(value));
        }

        return isValid;
    }, [validate, value]);

    const reset = useCallback(() => {
        setValue(defaultValue, { triggerDirty: false });
        toggleDirty(false);
    }, [defaultValue, toggleDirty, setValue]);
    const ref = createRef<HTMLInputElement>();

    return useMemo(() => ({
        defaultValue,
        value,
        clear: (...args) => {
            console.warn("react-grapple", "UseInput.clear() is deprecated. Use reset() instead.")
            reset(...args);
        },
        reset,
        setValue,
        onChange,
        isValid: isValid(),
        dirty,
        ref,

        bind: {
            placeholder,
            onChange,
            value,
            ref,
        },
    }), [defaultValue, value, reset, dirty, isValid, placeholder, ref, onChange, setValue]);
}

export default useInput;

export {
    Validators,
};
