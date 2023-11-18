import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import styles from './Modal.module.css';

export default function Modal({ children, open, className = '' }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => modal.close();
  }, [open]);

  return createPortal(
    <dialog ref={dialog} className={styles[`modal ${className}`]}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
}
