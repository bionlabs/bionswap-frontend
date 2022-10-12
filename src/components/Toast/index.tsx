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
  // background-color: #0c1620;

  .Toastify__toast {
    background-color: #0c1620;
    box-shadow: 0px 0px 7px 3px rgba(255, 255, 255, 0.1);
    border-radius: 4px;

    &.Toastify__toast--info {
      border-left: 6px solid #1890ff;
    }

    &.Toastify__toast--success {
      border-left: 6px solid #2BB673;
    }

    &.Toastify__toast--warn {
      border-left: 6px solid #FBB03B;
    }

    &.Toastify__toast--error {
      border-left: 6px solid #E9113A;
    }
  }

  .Toastify__toast-body {
    div {
      font-family: 'Poppins', sans-serif;
      color: #d6dade;
      font-weight: 400;
      font-size: 12px;
      line-height: 140%;
    }
  }
`;

export default Toast;
