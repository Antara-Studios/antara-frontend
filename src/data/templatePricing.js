// Single source of truth for template prices.
// 0 = free, positive number = paid (in INR)
export const TEMPLATE_PRICES = {
  1: 1200, // Royal Rajasthani
  2: 0,    // Garden Bloom
  3: 999,  // Emerald Nikah
  4: 1100, // Lotus Mandapam
  5: 0,    // Seaside Vows
  6: 0,    // Modern Minimal
  7: 900,  // Floral Romance
  8: 1000, // Golden Heritage
  9: 0,    // Sacred Union
  10: 800, // Tropical Bliss
  11: 0,   // Ivory Classic
  12: 1200,// Velvet Luxe
}

// Purchase grants access for 1 year from date of purchase
export const PURCHASE_VALIDITY_DAYS = 365

export function isPaidTemplate(templateId) {
  return (TEMPLATE_PRICES[templateId] ?? 0) > 0
}

export function getTemplatePrice(templateId) {
  return TEMPLATE_PRICES[templateId] ?? 0
}
