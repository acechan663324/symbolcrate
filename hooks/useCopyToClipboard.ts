
import { useCallback } from 'react';

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): CopyFn {
  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      console.warn('Copy failed', error);
      return false;
    }
  }, []);

  return copy;
}
