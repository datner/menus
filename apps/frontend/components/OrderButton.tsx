import { animated, useSpring } from '@react-spring/web';
import { ReactNode } from 'react';

type Props = {
  show?: boolean;
  onClick(): void;
  children?: ReactNode;
};

export function OrderButton(props: Props) {
  const { show, onClick, children } = props;
  const styles = useSpring({ y: show ? 0 : 300 });
  return (
    <animated.button
      onClick={onClick}
      className="fixed bottom-10 right-6 h-16 w-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-white shadow-lg shadow-amber-500/50 active:scale-110"
      style={styles}
    >
      {children}
    </animated.button>
  );
}
