import { TAG, createComponent } from '../../../dist/index.esm.js';
const { Button } = TAG;

export default createComponent(({ props }) => () =>
  Button(
    {
      class: 'square',
      onClick: props.onClick,
    },
    [props.value]
  )
);
