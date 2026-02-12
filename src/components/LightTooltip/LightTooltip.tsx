import { Padding } from '@mui/icons-material';
import {
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
} from '@mui/material';

export const LightTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  )
)(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'rgb(253, 253, 253)',
    color: 'rgba(0,0,0,0.6)',
    fontSize: 14,
    border: '1px solid #ddd',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.4)',
    borderRadius: 6,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgb(255, 255, 255)',
  },
}));
