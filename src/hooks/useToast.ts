import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function toastError(description: string, title?: string) {
  toast.error(description);
}

export function toastInfo(description: string, title?: string) {
  toast.info(description);
}

export function toastSuccess(description: string, title?: string) {
  toast.success(description);
}

export function toastWarn(description: string, title?: string) {
  toast.warn(description);
}
