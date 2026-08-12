/* ── useManagedSection: live-data hook for every section component ── */

import { useState, useEffect, useCallback, useRef } from 'react';
import { getSection, STORAGE_KEY } from './dataManager';
import defaultData from '../data/forgewellData.json';

/**
 * Custom hook that provides live-updating section data.
 *
 * - Reads merged data (defaults + localStorage) on mount.
 * - Listens for live-preview events → updates state instantly (before save).
 * - Listens for section-saved events → re-reads from storage.
 * - Listens for revert-preview events → restores last saved state.
 * - Listens for native `storage` event → cross-tab sync.
 *
 * @param {string} sectionKey - the key in forgewellData.json / localStorage
 * @returns {[object, object]} [currentData, savedData]
 */
export default function useManagedSection(sectionKey) {
  const fallback = defaultData[sectionKey] || {};

  const getSaved = useCallback(() => {
    return getSection(sectionKey, fallback);
  }, [sectionKey, fallback]);

  const [data, setData] = useState(() => getSaved());
  const [savedData, setSavedData] = useState(() => getSaved());
  const savedRef = useRef(savedData);

  // Keep ref in sync
  useEffect(() => {
    savedRef.current = savedData;
  }, [savedData]);

  useEffect(() => {
    // Live preview: section updates instantly as user types in customizer
    const onPreview = (e) => {
      setData(e.detail);
    };

    // Revert: close without save → snap back to last saved state
    const onRevert = () => {
      setData(savedRef.current);
    };

    // Save: persist completed → refresh both data and savedData from storage
    const onSaved = (e) => {
      if (e.detail?.key === sectionKey) {
        const fresh = getSaved();
        setData(fresh);
        setSavedData(fresh);
        savedRef.current = fresh;
      }
    };

    // Cross-tab sync via native storage event
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) {
        const fresh = getSaved();
        setData(fresh);
        setSavedData(fresh);
        savedRef.current = fresh;
      }
    };

    window.addEventListener(`live-preview-${sectionKey}`, onPreview);
    window.addEventListener(`revert-preview-${sectionKey}`, onRevert);
    window.addEventListener('section-saved', onSaved);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener(`live-preview-${sectionKey}`, onPreview);
      window.removeEventListener(`revert-preview-${sectionKey}`, onRevert);
      window.removeEventListener('section-saved', onSaved);
      window.removeEventListener('storage', onStorage);
    };
  }, [sectionKey, getSaved]);

  return [data, savedData];
}
