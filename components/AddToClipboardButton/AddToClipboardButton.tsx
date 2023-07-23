'use client';
import {useEffect, useRef, useState} from 'react';
import * as Toast from '@radix-ui/react-toast';

import useCopiedColorSchemes from '@/components/CopyColorSchemeContext/useCopiedColorSchemes';
import useColorSchemes from '@/components/ColorSchemeContext/useColorSchemes';

import css from './AddToClipboardButton.module.css';
import toastCss from './RadixToast.module.css';
import {colorScheme} from '@/types';

const AddToClipboardButton = () => {
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const timerRef = useRef(0);

  useEffect(() => {
    const currentTimerRef = timerRef.current;
    return () => clearTimeout(currentTimerRef);
  }, []);

  const {
    colorSchemeState: {colorSchemes},
  } = useColorSchemes();
  const {copiedThemeNames} = useCopiedColorSchemes();

  const handleCopyToClipboard = async () => {
    setToastIsOpen(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToastIsOpen(false);
    }, 3000);

    const colorSchemesToAddToClipboard = [] as colorScheme[];
    copiedThemeNames.forEach((copiedThemeName) => {
      const colorSchemeAndMeta = colorSchemes.find(
        (scheme) => scheme.name === copiedThemeName
      );
      if (colorSchemeAndMeta) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {meta, ...validKeys} = colorSchemeAndMeta;
        colorSchemesToAddToClipboard.push(validKeys);
      }
    });
    await navigator.clipboard.writeText(
      JSON.stringify(colorSchemesToAddToClipboard, null, 2)
    );
  };

  return (
    <Toast.Provider swipeDirection="right">
      <button
        onClick={handleCopyToClipboard}
        className={css.button}
        disabled={copiedThemeNames.length === 0}
      >
        Copy to clipboard ({copiedThemeNames.length})
      </button>

      <Toast.Root
        className={toastCss.ToastRoot}
        open={toastIsOpen}
        onOpenChange={setToastIsOpen}
      >
        <Toast.Title className={toastCss.ToastTitle}>
          <h3 className={css.title}>Success</h3>
        </Toast.Title>
        <Toast.Description asChild>
          <div>
            {copiedThemeNames.length} color schemes added to your clipboard.
          </div>
        </Toast.Description>
        <Toast.Action
          className={toastCss.ToastAction}
          asChild
          altText="Close toast notification"
        >
          <button>Close</button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className={toastCss.ToastViewport} />
    </Toast.Provider>
  );
};

export default AddToClipboardButton;
