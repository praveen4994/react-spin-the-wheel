import * as react from 'react';
import { HTMLAttributes } from 'react';

declare const ReactSpinTheWheel: react.ForwardRefExoticComponent<ReactSpinTheWheelProps & react.RefAttributes<ReactSpinTheWheelRef>>;

type ReactSpinTheWheelProps = {
    wheelImage: string;
    onSpinEnd: () => void;
    additionalSpins?: number;
    initialImageAngle?: number;
    canvasProps?: HTMLAttributes<HTMLCanvasElement>;
};
type SpinFuncProps = {
    spinBy: "SLICE";
    totalSlices: number;
    targetSliceNumber: number;
} | {
    spinBy: "ANGLE";
    targetAngle: number;
};
type ReactSpinTheWheelRef = {
    spin: (props: SpinFuncProps) => void;
};

export { type ReactSpinTheWheelProps, type ReactSpinTheWheelRef, type SpinFuncProps, ReactSpinTheWheel as default };
