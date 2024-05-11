import { SvgIcon, SvgIconProps } from '@mui/material';

export default function IconImage(props: SvgIconProps) {
  const svgProps = { ...props };
  delete svgProps.htmlColor;
  return (
    <svg
      {...svgProps}
      xmlns='http://www.w3.org/2000/svg'
      width={props.width ?? 60}
      height={props.height ?? 60}
      viewBox='0 0 46 46'
      fill='none'
    >
      <rect width='46' height='46' rx='8' fill='#F4F5F5' />
      <path
        d='M33.1111 10H12.8889C11.2957 10 10 11.2957 10 12.8889V33.1111C10 34.7043 11.2957 36 12.8889 36H33.1111C34.7043 36 36 34.7043 36 33.1111V12.8889C36 11.2957 34.7043 10 33.1111 10ZM12.8889 33.1111V12.8889H33.1111L33.114 33.1111H12.8889Z'
        fill='#D3D5D7'
      />
      <path
        d='M20.1111 25.8889L18.6667 24.4444L14.3333 30.2222H31.6667L24.4444 20.1111L20.1111 25.8889Z'
        fill='#D3D5D7'
      />
      <path
        d='M17.9444 21.5556C19.1411 21.5556 20.1111 20.5855 20.1111 19.3889C20.1111 18.1923 19.1411 17.2222 17.9444 17.2222C16.7478 17.2222 15.7778 18.1923 15.7778 19.3889C15.7778 20.5855 16.7478 21.5556 17.9444 21.5556Z'
        fill='#D3D5D7'
      />
    </svg>
  );
}
