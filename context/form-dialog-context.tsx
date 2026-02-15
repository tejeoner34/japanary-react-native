import { DeckForm } from '@/components/ui/deck-form';
import React, { createContext, useState } from 'react';
import { Dialog } from 'tamagui';

export type CreateTarget = 'deck' | 'flashcard' | null;

type CreateDialogAPI = {
  openDeckForm: () => void;
  openFlashcardForm: () => void;
  close: () => void;
};

export const CreateFormDialogContext = createContext<CreateDialogAPI | null>(null);
export function CreateFormDialogProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [target, setTarget] = useState<CreateTarget>(null);

  const api: CreateDialogAPI = {
    openDeckForm: () => {
      setTarget('deck');
      setOpen(true);
    },
    openFlashcardForm: () => {
      setTarget('flashcard');
      setOpen(true);
    },
    close: () => {
      setOpen(false);
      setTarget(null);
    },
  };

  return (
    <CreateFormDialogContext.Provider value={api}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay bg="rgba(0,0,0,0.4)" />

          <Dialog.Content bordered elevate width="90%" maxWidth={420}>
            {target === 'deck' && <DeckForm />}
            {target === 'flashcard' && null}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </CreateFormDialogContext.Provider>
  );
}
