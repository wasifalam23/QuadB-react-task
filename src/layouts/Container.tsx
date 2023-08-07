import { PropsWithChildren } from 'react';

interface Props {}

const Container: React.FC<PropsWithChildren<Props>> = (props) => {
  return <div className={`max-w-7xl mx-auto px-6`}>{props.children}</div>;
};

export default Container;
