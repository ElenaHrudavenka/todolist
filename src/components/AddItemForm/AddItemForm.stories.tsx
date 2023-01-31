import React from 'react';
import { AddItemForm } from './AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'AddItemForm Component',
  component: AddItemForm,
};
const callBack = action("Button 'add' was pressed inside the form ");

export const AddItemFormBaseExample = (props: any) => {
  // return <AddItemForm callBack={(title) => { alert(title)}} />
  return <AddItemForm callBack={callBack} />;
};
