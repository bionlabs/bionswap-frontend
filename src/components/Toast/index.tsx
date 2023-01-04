import { styled } from '@mui/material';
import { ToastContainer } from 'react-toastify';

const Toast = () => {
  return (
    <StyledToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

const StyledToastContainer = styled(ToastContainer)`

`;
// .Toastify__toast {
//   background-color: ${props => (props.theme.palette as any).extra.card.background};
//   box-shadow: 0px 0px 7px 3px rgba(255, 255, 255, 0.1);
//   border-radius: 4px;

//   &.Toastify__toast--info {
//     border-left: 6px solid ${props => props.theme.palette.primary.main};
//   }

//   &.Toastify__toast--success {
//     border-left: 6px solid ${props => props.theme.palette.success.main};
//   }

//   &.Toastify__toast--warn {
//     border-left: 6px solid ${props => props.theme.palette.warning.main};
//   }

//   &.Toastify__toast--error {
//     border-left: 6px solid ${props => props.theme.palette.error.main};
//   }
// }

// .Toastify__toast-body {
//   div {
//     font-family: 'Poppins', sans-serif;
//     color: ${props => props.theme.palette.text.secondary};
//     font-weight: 400;
//     font-size: 12px;
//     line-height: 140%;
//   }
// }

export default Toast;
