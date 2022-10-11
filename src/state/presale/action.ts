import { createAction } from '@reduxjs/toolkit';
import { PreSaleState } from './reducer';

export const setPresaleForm = createAction<
  Partial<PreSaleState['dataConfig']>
>('presale/setPresaleForm');

export const clearPresaleForm = createAction('presale/clearPresaleForm');

export const setStepLaunchpad = createAction<number>('presale/setStepLaunchpad');
