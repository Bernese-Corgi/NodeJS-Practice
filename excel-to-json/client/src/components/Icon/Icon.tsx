import React, { ReactComponentElement, ReactNode } from 'react';

// const Sprite = require('./sprites.svg') as ReactNode;

export type IconShape =
  | 'arrow-rotate-left-solid'
  | 'arrow-rotate-right-solid'
  | 'backward-solid'
  | 'forward-solid'
  | 'backward-step-solid'
  | 'forward-step-solid'
  | 'play-solid'
  | 'pause-solid'
  | 'volume-xmark-solid'
  | 'volume-high-solid'
  | 'angles-down-solid'
  | 'plus-solid';

export type IconProps = {
  id?: IconShape;
  title?: string;
  shape: string;
  color?: string;
  className?: string;
  size?: { width: string | number; height: string | number };
  onClick?: () => void;
};
// const Svg = styled.svg<IconProps>`
//   ${({ color, shape, onClick, size }) => css`
//     color: ${handleColorType(color)};
//     width: ${size?.width ? size.width : '1em'};
//     height: ${size?.height ? size.height : '1em'};
//     ${theme.transition()}

//     &:hover {
//       color: ${handleHoverColorType(shape, color)};
//       cursor: ${onClick ? 'pointer' : 'initial'};
//     }

//     ${StyledIconButton}:hover & {
//       color: ${handleHoverColorType(shape, color)};
//       cursor: pointer;
//     }
//   `}
// `;

const Icon = ({
  id,
  title,
  shape,
  color,
  size,
  className,
  onClick,
  ...restProps
}: IconProps) => {
  // console.log(Sprite);

  return (
    <>
      <svg
        id={id}
        width="100%"
        height="100%"
        onClick={onClick}
        className={className}>
        <use
          id={id}
          aria-label={title}
          // xlinkHref={`${Sprite}#${shape}`}
          xlinkHref={`./sprites.svg#${shape}`}
          width="100%"
          height="100%"
        />
      </svg>
    </>
  );
};

export default Icon;
