import { Button as ButtonAntd } from 'antd';

export const Button = ({ text,  ...props }) => {
  return <ButtonAntd {...props}>{text}</ButtonAntd>
}