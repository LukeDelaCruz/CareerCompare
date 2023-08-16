import { TrackingData } from '@/types/tracking';

export const captureTrackingData = (): TrackingData => {
  // URLs that look like: http://localhost:8080?utm_source=google&utm_medium=test&utm_campaign=Pathfinder_Pro_and_CareerEval
  const params = new URLSearchParams(window.location.search);
  const trackingData = {
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),

    userAgent: navigator.userAgent,
  };

  return trackingData;
};

export const clearURLParameters = () => {
  if (window.location.href.split('?').length > 1) {
    window.history.replaceState(
      {},
      document.title,
      window.location.href.replace(/\?.*$/, '')
    );
  }
};
