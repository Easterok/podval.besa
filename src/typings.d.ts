/* SystemJS module definition */
declare var module: NodeModule;

/* tslint:disable-next-line:interface-name */
interface NodeModule {
    id: string;
}

declare module '!!raw-loader!*' {
    const result: string;

    export = result;
}
