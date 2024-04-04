export const redirectToLoginPage = () => {
  window.location.href = `/account/login?returnUrl=${encodeURIComponent(
    window.location.pathname + window.location.search
  )}`;
};

export const redirectToMainSite = () => {
  window.location.href = `${window.location.protocol}//${window.location.hostname}/admin`;
};
