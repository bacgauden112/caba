import { useState, useCallback, useEffect } from "react";

export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasRequestedOnLoad, setHasRequestedOnLoad] = useState(false);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Trình duyệt không hỗ trợ định vị");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
        setError(null);
        setLoading(false);
      },
      (err) => {
        let errorMessage = "Không thể lấy vị trí";

        switch (err.code) {
          case err.PERMISSION_DENIED:
            errorMessage =
              "Bạn đã từ chối quyền truy cập vị trí. Vui lòng nhập vị trí thủ công.";
            break;
          case err.POSITION_UNAVAILABLE:
            errorMessage = "Thông tin vị trí không khả dụng";
            break;
          case err.TIMEOUT:
            errorMessage = "Hết thời gian chờ lấy vị trí";
            break;
        }

        setError(errorMessage);
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  }, []);

  // Auto-request location on first load
  useEffect(() => {
    if (!hasRequestedOnLoad) {
      setHasRequestedOnLoad(true);
      requestLocation();
    }
  }, [requestLocation, hasRequestedOnLoad]);

  return { location, error, loading, requestLocation };
};
