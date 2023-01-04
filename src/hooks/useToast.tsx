import { Stack, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
  description: string | any
  title?: string
  type:string
}

const Msg = ({description, title, type}:Props) => {
  if (title){
    return (
      <Stack alignItems="start">
        <Typography fontSize={18} fontWeight="600" color='inherit'>
          {type} {title}
        </Typography>
        <Typography fontSize={14} color='inherit'>{description}</Typography>
      </Stack>
  )
  }
  
  return <Typography color='inherit' fontSize={14}>{description}</Typography>
}

export function toastError(description: string | any, title?: string) {
  toast.error(<Msg description={description} title={title} type={'Error'} />);
}

export function toastInfo(description: string | any, title?: string) {
  toast.info(<Msg description={description} title={title} type={'Info'} />);
}

export function toastSuccess(description: string | any, title?: string) {
  toast.success(<Msg description={description} title={title} type={'Success'} />);
}

export function toastWarn(description: string | any, title?: string) {
  toast.warning(<Msg description={description} title={title} type={'Warning'} />);
}
