import axios from 'axios';
import { Field } from '@formily/core';
import { isEmpty } from 'lodash';
import { REGION } from '../constants';

export const fetchOss = async (field: Field) => {
  const region = field.query(`.${REGION}`).get('value');
  if (isEmpty(region)) return;
  console.log('fetchOss', region);
  await axios.get('https://unpkg.com/china-location@2.1.0/dist/location.json');
  return [
    {
      label: region,
      value: region,
    },
    {
      label: '222',
      value: '222',
    },
  ];
};
