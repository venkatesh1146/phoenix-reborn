export const ToastConfig = {
  error: {
    duration: 5000,
    theme: {
      primary: '#000',
      secondary: 'white',
    },
    style: {
      background: '#000',
      color: '#fff',
      width: '100%',
    },
  },
  loading: {
    style: {
      background: '#000',
      color: '#fff',
      width: '100%',
    },
  },
  style: {
    borderRadius: '0',
    maxWidth: 'unset',
    padding: '8px 10px 12px 10px',
    width: '100%',
    fontFamily: 'Maven Pro',
  },
}

const desktopToastStyles: React.CSSProperties = {
  minWidth: '320px',
  maxWidth: '600px',
  minHeight: '52px',
  fontFamily: 'Maven Pro',
  borderRadius: '8px',
}

export const ToastDesktopConfig = {
  error: {
    duration: 5000,
    theme: {
      primary: '#000',
      secondary: 'white',
    },
    style: {
      ...desktopToastStyles,
      background: '#000',
      color: '#fff',
    },
  },
  loading: {
    style: {
      ...desktopToastStyles,
      background: '#000',
      color: '#fff',
    },
  },
  style: desktopToastStyles,
}

/// padding: "8px 10px 12px 10px",
