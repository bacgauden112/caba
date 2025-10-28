import { Workbox } from 'workbox-window';

export function registerSW() {
  if ('serviceWorker' in navigator) {
    const wb = new Workbox('/sw.js');

    wb.addEventListener('installed', (event) => {
      if (event.isUpdate) {
        if (confirm('Có phiên bản mới! Bạn muốn cập nhật?')) {
          window.location.reload();
        }
      }
    });

    wb.register();
  }
}