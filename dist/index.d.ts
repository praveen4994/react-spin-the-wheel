import React, { HTMLAttributes } from 'react';

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
declare const ReactSpinTheWheel: React.ForwardRefExoticComponent<ReactSpinTheWheelProps & React.RefAttributes<ReactSpinTheWheelRef>>;

export { ReactSpinTheWheel as default, ReactSpinTheWheelProps, SpinFuncProps, ReactSpinTheWheelRef};
