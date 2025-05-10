import React from 'react';

interface SvgIconProps {
  path: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  viewBox?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
  path,
  width = 24,
  height = 24,
  className,
  viewBox = '0 0 24 24',
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox={viewBox}
      fill='currentColor'
      className={className}
    >
      <path d={path} />
    </svg>
  );
};

export default SvgIcon;
