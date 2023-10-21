import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
  icon: IconDefinition;
  css?: string;
}

const Icon: React.FC<IconProps> = ({ icon, css }) => {
  return (
    <FontAwesomeIcon icon={icon} className={css} />
  );
}

export default Icon;