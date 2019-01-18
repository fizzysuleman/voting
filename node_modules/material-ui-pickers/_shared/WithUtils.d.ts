import { Omit } from '@material-ui/core';
import * as React from 'react';
import { MaterialUiPickersDate } from '../typings/date';
import { Utils } from '../typings/utils';
export interface WithUtilsProps {
    utils: Utils<MaterialUiPickersDate>;
}
export declare const withUtils: () => <P extends WithUtilsProps>(Component: React.ComponentType<P>) => React.StatelessComponent<Omit<P, "utils">>;
