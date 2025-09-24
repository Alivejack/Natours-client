import toast from 'react-hot-toast';

export const notify = (type, message) => {
  switch (type) {
    case 'success':
      toast.success(message, {
        duration: 3000,
      });
      break;

    case 'error':
      toast.error(message, {
        duration: 3000,
        style: {
          background: '#f44336',
          color: '#fff',
          borderRadius: '10px',
        },
      });
      break;

    case 'loading':
      toast.loading(message, {
        style: {
          background: '#333',
          color: '#fff',
        },
      });
      break;

    case 'custom':
      toast(message, {
        icon: '❗',
        style: {
          borderRadius: '8px',
          background: '#fff',
          color: '#000',
        },
        duration: 2000,
      });
      break;

    default:
      toast(message);
      break;
  }
};
