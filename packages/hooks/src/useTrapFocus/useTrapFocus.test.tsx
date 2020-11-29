import React, { MutableRefObject, useState, ReactNode, useRef } from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import { useTrapFocus } from '.';

const CONSTS = {
  toggleVisibility: 'Toggle visibility',
  notTrapped: {
    button: 'Button not trapped',
    input: 'Input not trapped'
  },
  isTrapped: {
    button: 'Button is trapped',
    input: 'Input is trapped',
    textarea: 'Textarea is trapped'
  }
};

const NotTrapped = () => {
  return (
    <>
      <button type="button">{CONSTS.notTrapped.button}</button>
      <input type="text" placeholder={CONSTS.notTrapped.input} />
    </>
  );
};

const IsTrapped = ({
  children,
  trapRef,
  tabIndex,
  role
}: {
  children?: ReactNode;
  trapRef?: MutableRefObject<HTMLDivElement | null>;
  tabIndex?: number;
  role?: string;
}) => {
  return (
    <div ref={trapRef} tabIndex={tabIndex} role={role}>
      <button type="button">{CONSTS.isTrapped.button}</button>
      <input type="text" placeholder={CONSTS.isTrapped.input} />
      {children}
    </div>
  );
};

describe('useTrapFocus()', () => {
  it('Tab more than the amount of tabbable nodes', () => {
    const TrapFocusComponent = () => {
      const trapRef = useTrapFocus();

      return (
        <>
          <NotTrapped />
          <IsTrapped trapRef={trapRef} />
        </>
      );
    };
    const { getByText } = render(<TrapFocusComponent />);

    for (let step = 0; step < 3; step += 1) {
      userEvent.tab();
    }

    expect(document.activeElement).toBe(getByText(CONSTS.isTrapped.button));
  });

  it('Include container within collection of tabbable nodes', () => {
    const TrapFocusComponent = () => {
      const trapRef = useTrapFocus({
        includeContainer: true
      });

      return (
        <>
          <NotTrapped />
          <IsTrapped trapRef={trapRef} tabIndex={0} role="banner" />
        </>
      );
    };
    const { getByRole } = render(<TrapFocusComponent />);

    userEvent.tab();
    expect(document.activeElement).toBe(getByRole('banner'));
  });

  it('Return focus to previous focused element', () => {
    const TrapFocusComponent = () => {
      const trapRef = useTrapFocus({
        returnFocus: true,
        includeContainer: true
      });

      return (
        <>
          <NotTrapped />
          <IsTrapped trapRef={trapRef} tabIndex={0} />
        </>
      );
    };

    const WrapComponent = () => {
      const [visible, setVisible] = useState(false);

      return (
        <>
          <button
            type="button"
            onKeyDown={({ key, keyCode }) => {
              if (key === 'Enter' || keyCode === 13) {
                setVisible(!visible);
              }
            }}
          >
            {CONSTS.toggleVisibility}
          </button>
          {visible ? <TrapFocusComponent /> : null}
        </>
      );
    };
    const { getByText } = render(<WrapComponent />);

    for (let step = 0; step < 3; step += 1) {
      userEvent.tab();
    }

    for (let step = 0; step < 2; step += 1) {
      userEvent.type(getByText(CONSTS.toggleVisibility), '{enter}');
    }

    expect(document.activeElement).toBe(getByText(CONSTS.toggleVisibility));
  });

  it('Trap conditionally rendered nodes', () => {
    const TrapFocusComponent = () => {
      const [visible, setVisible] = useState(false);
      const trapRef = useTrapFocus({
        updateNodes: true
      });

      return (
        <>
          <NotTrapped />
          <button type="button" onClick={() => setVisible(!visible)}>
            {CONSTS.toggleVisibility}
          </button>
          <IsTrapped trapRef={trapRef} tabIndex={0}>
            <>
              {visible ? (
                <textarea placeholder={CONSTS.isTrapped.textarea} />
              ) : null}
            </>
          </IsTrapped>
        </>
      );
    };
    const { getByText, getByPlaceholderText } = render(<TrapFocusComponent />);

    userEvent.click(getByText(CONSTS.toggleVisibility));

    act(() => {
      for (let step = 0; step < 3; step += 1) {
        userEvent.tab();
      }
    });

    expect(document.activeElement).toBe(
      getByPlaceholderText(CONSTS.isTrapped.textarea)
    );
  });

  it('Inital focus container', () => {
    const TrapFocusComponent = () => {
      const trapRef = useTrapFocus({
        includeContainer: true,
        initialFocus: 'container'
      });

      return (
        <>
          <NotTrapped />
          <IsTrapped trapRef={trapRef} tabIndex={0} role="banner" />
        </>
      );
    };
    const { getByRole } = render(<TrapFocusComponent />);

    expect(document.activeElement).toBe(getByRole('banner'));
  });

  it('Inital focus element', () => {
    const TrapFocusComponent = () => {
      const initialFocusRef = useRef(null);
      const trapRef = useTrapFocus({
        initialFocus: initialFocusRef.current
      });

      return (
        <>
          <NotTrapped />
          <IsTrapped trapRef={trapRef}>
            <textarea
              ref={initialFocusRef}
              placeholder={CONSTS.isTrapped.textarea}
            />
          </IsTrapped>
        </>
      );
    };
    const { getByPlaceholderText } = render(<TrapFocusComponent />);

    expect(document.activeElement).toBe(
      getByPlaceholderText(CONSTS.isTrapped.textarea)
    );
  });
});
