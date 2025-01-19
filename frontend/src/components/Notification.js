import { ToastContainer, toast } from 'react-toastify';

const showNotification = (message, type = 'success') => {
  toast[type](message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true
  });
};

// Kullanımı
try {
  await deleteProject(id);
  showNotification('Project successfully deleted');
} catch (error) {
  showNotification(error.message, 'error');
} 