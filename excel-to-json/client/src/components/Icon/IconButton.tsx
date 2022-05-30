import React from 'react';
import Icon, { IconShape } from './Icon';

interface IconButtonProps {
  linkTo?: string;
  disabled?: boolean;
  title: string;
  id?: string;
  shape: IconShape;
  onClick: () => void;
  className?: string;
}

const IconButton = ({
  linkTo,
  title,
  disabled,
  id,
  shape,
  onClick,
  className,
  ...restProps
}: IconButtonProps) => {
  return (
    <button
      disabled={disabled}
      id={id}
      onClick={onClick}
      className={className}
      {...restProps}>
      <Icon shape={shape} />
    </button>
  );
};

export default IconButton;
