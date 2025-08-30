// Google Analytics and Search Console configuration
// Replace these IDs with your actual Google Analytics and Search Console IDs

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'YOUR_GA_TRACKING_ID';
export const GTAG_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;

// Google Tag Manager
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'YOUR_GTM_ID';

// Additional tracking configurations
export const trackingConfig = {
  // Enable/disable tracking based on environment
  enabled: process.env.NODE_ENV === 'production',
  
  // Cookie consent (can be integrated with cookie consent tools)
  cookieConsent: true,
  
  // Additional analytics providers
  facebookPixel: process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID,
  linkedInPartnerTag: process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID,
};

// Analytics helper functions
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && trackingConfig.enabled) {
    // @ts-ignore
    window.gtag?.('config', GA_TRACKING_ID, {
      page_location: url,
    });
  }
};

export const event = ({ action, category, label, value }: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && trackingConfig.enabled) {
    // @ts-ignore
    window.gtag?.('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};