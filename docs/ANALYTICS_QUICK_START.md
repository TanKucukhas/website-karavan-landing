# Analytics Quick Start Guide 🚀

Lead tracking sistemi hazır! GA4'ü 5 dakikada kurun.

## ✅ Neler Tracking Ediliyor?

### Form Events (Otomatik)
- ✅ Form başlatma (ilk tıklama)
- ✅ Alan bazında focus tracking
- ✅ Validasyon hataları
- ✅ Form abandonment (terk etme)
- ✅ Başarılı submission (CONVERSION)
- ✅ API hataları

### Lead Quality (Otomatik)
Her lead otomatik olarak skorlanıyor:
- 🔥 **Hot Lead** (60+): Company var, uzun mesaj, 60s+ form süre
- 🌟 **Warm Lead** (30-59): Orta engagement
- ❄️ **Cold Lead** (0-29): Minimal engagement

### UTM Tracking (Otomatik)
Her event'e otomatik ekleniyor:
- utm_source, utm_medium, utm_campaign
- utm_term, utm_content

---

## 🎯 GA4 Setup (5 Dakika)

### 1. Conversion Events İşaretle (2 dk)

GA4 Admin → Events → Mark as conversion:

```
✓ lead_generated (ANA CONVERSION)
✓ contact_submit
✓ early_access_submit
```

### 2. Custom Dimensions Oluştur (2 dk)

GA4 Admin → Custom Definitions → Create Custom Dimension:

**Event-scoped:**
- `form_type` → Event Parameter: form_type
- `user_role` → Event Parameter: user_role
- `lead_quality` → Event Parameter: lead_quality
- `quality_score` → Event Parameter: quality_score

**User-scoped:**
- `lead_status` → User Property: lead_status
- `preferred_role` → User Property: preferred_role

### 3. İlk Funnel'ı Oluştur (1 dk)

GA4 Explore → Funnel Exploration:

```
Lead Generation Funnel:
1. page_view
2. form_start
3. form_submit_attempt
4. lead_generated (CONVERSION)
```

---

## 📊 Tracked Events

### Main Conversion Events

| Event | Ne Zaman | Value |
|-------|----------|-------|
| `lead_generated` | Her successful submission | 1 |
| `contact_submit` | Contact form success | 1 |
| `early_access_submit` | Early access form success | 1 |

### Form Lifecycle Events

| Event | Açıklama |
|-------|----------|
| `form_start` | İlk alan interaction |
| `form_field_focus` | Her alan focus |
| `form_error` | Validasyon hatası |
| `form_abandon` | Sayfa terk (submission olmadan) |
| `form_submit_attempt` | Submit butonu click |
| `form_submit_error` | API/network hatası |
| `lead_quality_assessed` | Lead quality hesaplama |

---

## 🎨 Tracked Forms

1. **Contact Form** (`form_type: 'contact'`)
   - Lead kalitesi yüksek
   - Subject, company, message tracking

2. **Hero Early Access** (`form_type: 'early_access_hero'`)
   - Ana sayfa capture
   - Role (buyer/seller) tracking

3. **CTA Banner** (`form_type: 'early_access_cta'`)
   - Mid-page conversion
   - Country tracking

4. **Challenges Section** (`form_type: 'early_access_challenges'`)
   - Content engagement
   - Buyer-focused

---

## 📈 Key Metrics Dashboard

### Günlük Monitoring

```
Total Leads Today: [lead_generated count]
├─ Contact Form: [contact_submit count]
├─ Early Access: [early_access_submit count]
└─ By Quality:
   ├─ Hot (60+): [count] - Hemen takip et! 🔥
   ├─ Warm (30-59): [count]
   └─ Cold (0-29): [count]

Conversion Rates:
├─ Overall: [form_start → lead_generated] %
├─ Contact Form: [contact form_start → submit] %
└─ Early Access: [early_access form_start → submit] %

Form Abandonment:
├─ Rate: [form_abandon / form_start] %
└─ Most Abandoned: [form_type with highest abandon rate]
```

### Haftalık Review

1. **Lead Quality Trend**
   - Hot lead yüzdesi artıyor mu?
   - Quality score ortalaması nedir?

2. **Best Performing Form**
   - En yüksek conversion rate hangisi?
   - En hızlı doldurma süresi?

3. **UTM Campaign Winners**
   - Hangi kampanya en çok lead getiriyor?
   - Hangi kaynak en kaliteli lead'leri veriyor?

---

## 🔍 Quick Reports

### Report 1: Lead Quality Distribution

GA4 → Explore → Free Form:
- **Rows:** Lead Quality
- **Values:** Event Count (lead_generated)
- **Breakdown:** Form Type

### Report 2: Form Performance

| Metric | Formula |
|--------|---------|
| Conversion Rate | (lead_generated / form_start) × 100 |
| Abandonment Rate | (form_abandon / form_start) × 100 |
| Success Rate | (lead_generated / form_submit_attempt) × 100 |

### Report 3: UTM Source Performance

GA4 → Acquisition → Traffic Acquisition:
- Filter by conversion = lead_generated
- Group by: Session Source/Medium
- Metrics: Conversions, Conversion Rate

---

## 🚨 Recommended Alerts

GA4 Admin → Custom Alerts:

1. **Lead Drop Alert**
   - Condition: lead_generated drops 30% day-over-day
   - Notification: Email to marketing@

2. **Form Error Spike**
   - Condition: form_error increases 50%
   - Notification: Email to dev@

3. **Hot Lead Alert** (Optional)
   - Condition: lead_quality = 'hot'
   - Notification: Slack/Email to sales@

---

## 🧪 Testing Checklist

Development/Staging'de test edin:

- [ ] Form başlatma tracked
- [ ] Email validation hatası tracked
- [ ] Form terk etme tracked
- [ ] Successful submission → conversion event fires
- [ ] Lead quality hesaplanıyor
- [ ] UTM parametreleri yakalanıyor
- [ ] Console'da events görünüyor (dev mode)
- [ ] GA4 DebugView'da events görünüyor

**Test URL örneği:**
```
https://karavan.net/?utm_source=test&utm_medium=test&utm_campaign=test_campaign
```

---

## 📖 Event Parameters (Auto-included)

Her event otomatik olarak şunları içerir:

### Session Data
- `page_path` - Current page
- `page_url` - Full URL
- `page_title` - Document title
- `referrer` - Referrer URL
- `language` - Browser language
- `timestamp` - ISO timestamp

### UTM Parameters (eğer URL'de varsa)
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

### Form-specific
- `form_type` - Form tipi
- `user_role` - buyer/seller/unknown
- `event_category` - lead_generation/conversion/engagement
- `event_label` - Descriptive label

---

## 💡 Pro Tips

### Campaign URL Builder

Email kampanyası için:
```
https://karavan.net/?utm_source=newsletter&utm_medium=email&utm_campaign=q1_launch
```

LinkedIn ad için:
```
https://karavan.net/?utm_source=linkedin&utm_medium=cpc&utm_campaign=turkey_buyers
```

### Lead Prioritization

**Hot Leads (60+)** → Immediate follow-up
- Otomatik email + CRM notification
- Sales team 24 saat içinde takip

**Warm Leads (30-59)** → 48-hour follow-up
- Email nurture sequence
- Sales takip 48 saat içinde

**Cold Leads (0-29)** → Long-term nurture
- Email drip campaign
- Passive retargeting

### Form Optimization

En yüksek abandonment rate olan formda:
1. `form_field_focus` data'sına bak
2. Hangi alanlarda takılıyorlar?
3. O alanları basitleştir/kaldır

---

## 📚 Daha Fazla Bilgi

Detaylı dokümantasyon için: **[GA4_SETUP_GUIDE.md](./GA4_SETUP_GUIDE.md)**

İçindekiler:
- Custom events detayları
- Funnel analysis setup
- Advanced reporting
- Lead quality scoring logic
- Troubleshooting guide

---

## 🎉 Özet

### Şu An Aktif:
✅ 4 form tracking  
✅ 8+ event types  
✅ Otomatik lead quality scoring  
✅ UTM campaign tracking  
✅ Form abandonment tracking  
✅ Error tracking  
✅ Conversion events  

### Yapmanız Gerekenler:
1. GA4'te 3 conversion event işaretle (2 dk)
2. Custom dimensions oluştur (2 dk)
3. İlk funnel'ı setup et (1 dk)
4. Test et! 🚀

**Sorun olursa:** Console'da `📊 Analytics Event` loglarını kontrol edin

---

**Başarılar! 🎯**





