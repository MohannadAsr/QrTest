import React from 'react';
import { useTranslation } from 'react-i18next';

function TextTranslation({ children }) {
  const { t } = useTranslation();
  return <>{t(children)}</>;
}

export default TextTranslation;
