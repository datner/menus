import { animated, useSpring } from '@react-spring/web';
import { ReactNode } from 'react';

type Props = {
  show?: boolean;
  children?: ReactNode;
};

export function OrderButton(props: Props) {
  const { show, children } = props;
  const styles = useSpring({ y: show ? 0 : 300 });
  return (
    <animated.button
      className="rounded-full active:scale-110 fixed bottom-10 right-6 shadow-amber-500/50 shadow-lg w-16 h-16 from-amber-400 to-amber-700 bg-gradient-to-br text-white"
      style={styles}
    >
      {children}
    </animated.button>
  );
}
