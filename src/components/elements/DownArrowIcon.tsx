interface Props {
  className: string;
}
const DownArrowIcon = ({ className }: Props) => (
  <svg className={className} x="0px" y="0px" viewBox="0 0 510 510" xmlSpace="preserve">
    <polygon className="fill-current" points="0,0 255,255 510,0" />
  </svg>
);

export default DownArrowIcon;
