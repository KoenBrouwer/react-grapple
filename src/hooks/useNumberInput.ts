import useInput, {UseInput, UseInputOptions} from "./useInput";

export type UseNumberInputArgs = (number | UseInputOptions<number>) & {
    min?: number,
    max?: number,
    step?: number,
    defaultValue?: number,
};

type UseNumberInput = UseInput<number> & {
    bind: UseInput<number>["bind"] & {
        min?: number,
        max?: number,
        step?: number,
    }
};

const useNumberInput = (options: UseNumberInputArgs = {}): UseNumberInput => {
    const {min, max, step} = options;
    const numberInput = useInput<number>(options as any); // Todo: fix this any

    console.log(numberInput.bind);

    return {
        ...numberInput,
        bind: {
            ...numberInput.bind,
            min, max, step,
            type: "number"
        }
    };
}

export default useNumberInput;