import { MonetizationSettings } from '@/interfaces/monetization';

const API_BASE = process.env.NEXT_PUBLIC_API_PATH || 'http://localhost:8080/api';

const defaultSettings: MonetizationSettings = {
  enabled: false,
  clientId: '',
  adsTxtContent: '',
  articleAdsEnabled: false,
  toolAdsEnabled: false,
  articleTopSlot: '',
  articleInlineSlot: '',
  articleBottomSlot: '',
  toolTopSlot: '',
  toolBottomSlot: '',
};

export async function getMonetizationSettings(): Promise<MonetizationSettings> {
  try {
    const res = await fetch(`${API_BASE}/monetization/settings`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return defaultSettings;

    const data = await res.json();
    return {
      ...defaultSettings,
      ...(data.settings || {}),
    };
  } catch {
    return defaultSettings;
  }
}
