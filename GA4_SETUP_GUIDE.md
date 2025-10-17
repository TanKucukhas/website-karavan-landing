# Google Analytics 4 - Lead Tracking Kurulum Rehberi

Bu rehber, Karavan landing page için optimize edilmiş lead tracking ve conversion tracking kurulumunu içerir.

## İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Custom Events](#custom-events)
3. [Conversion Events Kurulumu](#conversion-events-kurulumu)
4. [Custom Dimensions Kurulumu](#custom-dimensions-kurulumu)
5. [Funnel Analysis](#funnel-analysis)
6. [UTM Tracking](#utm-tracking)
7. [Lead Quality Tracking](#lead-quality-tracking)
8. [Raporlama ve Dashboard](#raporlama-ve-dashboard)

---

## Genel Bakış

### Tracked Form Types
Sistemimiz 4 farklı lead capture noktasını takip eder:

1. **Contact Form** (`contact`) - Detaylı iletişim formu
2. **Hero Early Access** (`early_access_hero`) - Ana sayfa email capture
3. **CTA Banner** (`early_access_cta`) - Mid-page CTA formu
4. **Challenges Section** (`early_access_challenges`) - Challenge section email capture

### Event Hierarchy

```
Form Interaction Journey:
1. form_start → Kullanıcı ilk alana tıkladığında
2. form_field_focus → Her alan focus aldığında
3. form_error → Validasyon hatası olduğunda
4. form_abandon → Form doldurulmadan sayfadan ayrılındığında
5. form_submit_attempt → Submit butonu tıklandığında
6. lead_generated → Form başarıyla gönderildiğinde (CONVERSION)
7. contact_submit veya early_access_submit → Spesifik form conversion
```

---

## Custom Events

### 1. Form Lifecycle Events

#### `form_start`
**Ne zaman tetiklenir:** Kullanıcı formun herhangi bir alanına ilk kez tıkladığında

**Parameters:**
```javascript
{
  form_type: 'contact' | 'early_access_hero' | 'early_access_cta' | 'early_access_challenges',
  user_role: 'buyer' | 'seller' | 'unknown',
  event_category: 'lead_generation',
  event_label: '{form_type}_started',
  // + automatic UTM parameters
  // + automatic session data
}
```

**Kullanım:** Form engagement oranını ölçmek için

---

#### `form_field_focus`
**Ne zaman tetiklenir:** Kullanıcı bir form alanına focus ettiğinde

**Parameters:**
```javascript
{
  form_type: string,
  field_name: string,
  event_category: 'lead_generation',
}
```

**Kullanım:** Hangi alanların daha çok ilgi çektiğini anlamak

---

#### `form_error`
**Ne zaman tetiklenir:** Validasyon hatası oluştuğunda

**Parameters:**
```javascript
{
  form_type: string,
  field_name: string,
  error_message: string,
  event_category: 'lead_generation',
  event_label: '{form_type}_error',
}
```

**Kullanım:** Form optimize etmek için hangi alanların sorun çıkardığını görmek

---

#### `form_abandon`
**Ne zaman tetiklenir:** Form başlatıldı ama submit edilmeden sayfa terk edildiğinde

**Parameters:**
```javascript
{
  form_type: string,
  user_role: string,
  filled_fields: string, // comma-separated list
  filled_fields_count: number,
  event_category: 'lead_generation',
  event_label: '{form_type}_abandoned',
  value: number, // filled fields count
}
```

**Kullanım:** Form abandonment rate analizi

---

#### `form_submit_attempt`
**Ne zaman tetiklenir:** Submit butonu tıklandığında

**Parameters:**
```javascript
{
  form_type: string,
  user_role: string,
  event_category: 'lead_generation',
  event_label: '{form_type}_submit_attempt',
}
```

**Kullanım:** Submit başarı oranını ölçmek

---

#### `lead_generated` ⭐ CONVERSION EVENT
**Ne zaman tetiklenir:** Form başarıyla gönderildiğinde

**Parameters:**
```javascript
{
  form_type: string,
  user_role: string,
  event_category: 'conversion',
  event_label: '{form_type}_success',
  value: 1,
  // Additional form-specific data
  subject: string, // contact form için
  has_company: boolean, // contact form için
  message_length: number, // contact form için
  country: string, // CTA form için
  time_on_form: number, // saniye cinsinden
  lead_quality: 'hot' | 'warm' | 'cold',
  quality_score: number,
}
```

**Kullanım:** Ana conversion metriği

---

#### `contact_submit` ⭐ CONVERSION EVENT
**Ne zaman tetiklenir:** Contact formu başarıyla gönderildiğinde

**Parameters:**
```javascript
{
  form_type: 'contact',
  user_role: 'unknown',
  event_category: 'conversion',
  value: 1,
}
```

---

#### `early_access_submit` ⭐ CONVERSION EVENT
**Ne zaman tetiklenir:** Herhangi bir early access formu başarıyla gönderildiğinde

**Parameters:**
```javascript
{
  form_type: 'early_access_hero' | 'early_access_cta' | 'early_access_challenges',
  user_role: 'buyer' | 'seller',
  event_category: 'conversion',
  value: 1,
}
```

---

#### `form_submit_error`
**Ne zaman tetiklenir:** Form submission sırasında API/network hatası olduğunda

**Parameters:**
```javascript
{
  form_type: string,
  user_role: string,
  error_message: string,
  event_category: 'lead_generation',
  event_label: '{form_type}_submit_error',
}
```

---

### 2. Lead Quality Event

#### `lead_quality_assessed`
**Ne zaman tetiklenir:** Her successful form submission sonrasında otomatik

**Parameters:**
```javascript
{
  form_type: string,
  lead_quality: 'hot' | 'warm' | 'cold',
  quality_score: number, // 0-100
  event_category: 'lead_generation',
  value: number, // quality score
}
```

**Lead Quality Scoring Logic:**
- Company field dolu: +20 points
- Phone field dolu: +15 points
- Message var: +10 points
- Message 50+ karakter: +15 points
- Form'da 60+ saniye: +20 points
- 2+ sayfa ziyaret: +20 points

**Quality Tiers:**
- **Hot Lead:** 60+ points
- **Warm Lead:** 30-59 points
- **Cold Lead:** 0-29 points

---

### 3. Engagement Events

#### `role_change`
**Ne zaman tetiklenir:** Kullanıcı buyer/seller toggle'ı değiştirdiğinde

#### `language_change`
**Ne zaman tetiklenir:** Dil değiştirildiğinde

#### `cta_click`
**Ne zaman tetiklenir:** CTA butonları tıklandığında

#### `map_node_click`
**Ne zaman tetiklenir:** Harita üzerinde bir bölge tıklandığında

---

## Conversion Events Kurulumu

### Adım 1: GA4'te Conversion Events'leri İşaretle

1. GA4 Admin paneline git
2. **Events** → **Manage Custom Definitions** → **Create Custom Event**
3. Şu eventleri "Mark as conversion" olarak işaretle:

```
✓ lead_generated (ANA CONVERSION)
✓ contact_submit
✓ early_access_submit
```

### Adım 2: Conversion Goals Oluştur

GA4'te **Admin → Conversions** altında bu conversion event'leri görünür olacak.

Her conversion event için şunları yapılandır:
- **Counting Method:** Once per session (recommended) veya Every time (daha detaylı)
- **Value:** Her lead için value = 1

---

## Custom Dimensions Kurulumu

GA4'te daha iyi segmentasyon için custom dimensions oluşturun.

### Event-scoped Custom Dimensions

Admin → Custom Definitions → Create Custom Dimension

| Dimension Name | Event Parameter | Scope |
|----------------|-----------------|-------|
| Form Type | form_type | Event |
| User Role | user_role | Event |
| Lead Quality | lead_quality | Event |
| Quality Score | quality_score | Event |
| Form Field Name | field_name | Event |
| Error Message | error_message | Event |
| Time on Form | time_on_form | Event |
| Filled Fields Count | filled_fields_count | Event |

### User-scoped Custom Dimensions

| Dimension Name | User Property | Scope |
|----------------|---------------|-------|
| Lead Status | lead_status | User |
| Lead Type | lead_type | User |
| Lead Role | lead_role | User |
| Preferred Role | preferred_role | User |
| Preferred Language | preferred_language | User |

### Session-scoped Parameters (Otomatik)

Aşağıdakiler her event'e otomatik ekleniyor:
- `page_path`
- `page_url`
- `page_title`
- `referrer`
- `language`
- `timestamp`

---

## Funnel Analysis

### Lead Generation Funnel

GA4'te **Explore → Funnel Exploration** kullanarak bu funnel'ı oluşturun:

#### Contact Form Funnel
```
Step 1: page_view (contact page)
  ↓
Step 2: form_start (form_type = 'contact')
  ↓
Step 3: form_submit_attempt (form_type = 'contact')
  ↓
Step 4: contact_submit (CONVERSION)
```

#### Early Access Funnel
```
Step 1: page_view (any page)
  ↓
Step 2: form_start (form_type starts with 'early_access')
  ↓
Step 3: form_submit_attempt
  ↓
Step 4: early_access_submit (CONVERSION)
```

#### Complete Lead Journey Funnel
```
Step 1: page_view (landing page)
  ↓
Step 2: Any engagement (scroll, click, map interaction)
  ↓
Step 3: form_start (any form)
  ↓
Step 4: form_field_focus (filled at least one field)
  ↓
Step 5: form_submit_attempt
  ↓
Step 6: lead_generated (CONVERSION)
```

### Funnel Breakdown Dimensions

Her funnel için breakdown yapabileceğiniz dimensionlar:
- Form Type
- User Role (buyer vs seller)
- UTM Source / Medium / Campaign
- Device Category
- Country / City
- Language

---

## UTM Tracking

### Otomatik UTM Tracking

Sistemimiz her event'e otomatik olarak şu UTM parametrelerini ekler:
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`

### UTM Kampanya Örnekleri

#### Email Kampanyası
```
https://karavan.net/?utm_source=newsletter&utm_medium=email&utm_campaign=q1_2025_launch&utm_content=hero_cta
```

#### Social Media
```
https://karavan.net/?utm_source=linkedin&utm_medium=social&utm_campaign=thought_leadership&utm_content=trade_stats
```

#### Paid Ads
```
https://karavan.net/tr?utm_source=google&utm_medium=cpc&utm_campaign=turkey_buyers&utm_term=b2b+marketplace
```

### UTM Raporlaması

GA4'te **Reports → Acquisition → Traffic Acquisition** altında:
- **Session Source/Medium** görüntüle
- **lead_generated** conversion'ları by source/medium filtrele
- En yüksek ROI olan kanalları belirle

---

## Lead Quality Tracking

### Lead Quality Segmentation

GA4'te **Explore → Free Form** kullanarak lead quality analizi:

**Dimensions:**
- Lead Quality
- Form Type
- User Role

**Metrics:**
- Event Count (lead_generated)
- Conversion Rate
- Time on Form (average)

**Segments:**
```
Hot Leads: lead_quality = 'hot'
Warm Leads: lead_quality = 'warm'
Cold Leads: lead_quality = 'cold'
```

### Quality Score Distribution

Lead quality dağılımını görmek için:
1. **Explore → Blank** seç
2. **Technique:** Free Form
3. **Rows:** Quality Score (bucket: 0-29, 30-59, 60-100)
4. **Values:** Event Count
5. **Filters:** Event Name = lead_generated

---

## Raporlama ve Dashboard

### Önerilen Custom Reports

#### 1. Lead Generation Overview

**Metrics:**
- Total Leads (lead_generated count)
- Conversion Rate (form_start → lead_generated)
- Leads by Form Type
- Leads by User Role
- Hot/Warm/Cold Lead Distribution

**Breakdown:**
- Date
- Form Type
- User Role
- UTM Source

#### 2. Form Performance Report

**Table:**

| Form Type | Starts | Attempts | Submissions | Conversion Rate | Avg Time |
|-----------|--------|----------|-------------|-----------------|----------|
| contact | 500 | 450 | 380 | 76% | 120s |
| early_access_hero | 1200 | 1100 | 950 | 79% | 45s |
| early_access_cta | 800 | 750 | 680 | 85% | 60s |
| early_access_challenges | 600 | 550 | 500 | 83% | 40s |

#### 3. Form Abandonment Analysis

**Metrics:**
- Abandonment Count
- Abandonment Rate
- Average Filled Fields on Abandon

**Breakdown:**
- Form Type
- Most Common Abandoned Field
- Time Spent Before Abandon

#### 4. UTM Campaign Performance

**Table:**

| Campaign | Source | Medium | Leads | Lead Quality | Cost per Lead |
|----------|--------|--------|-------|--------------|---------------|
| q1_launch | newsletter | email | 245 | 65% Hot | $2.50 |
| linkedin_ads | linkedin | cpc | 180 | 45% Hot | $8.20 |
| content_marketing | organic | - | 320 | 55% Warm | $0 |

#### 5. Lead Quality Scorecard

**Metrics by Quality Tier:**
```
Hot Leads (60+):
  - Count: 450
  - Avg. Company Fill Rate: 85%
  - Avg. Message Length: 150 chars
  - Avg. Time on Form: 180s

Warm Leads (30-59):
  - Count: 620
  - Avg. Company Fill Rate: 45%
  - Avg. Message Length: 80 chars
  - Avg. Time on Form: 90s

Cold Leads (0-29):
  - Count: 280
  - Avg. Company Fill Rate: 10%
  - Avg. Message Length: 20 chars
  - Avg. Time on Form: 30s
```

### Real-time Monitoring Dashboard

GA4 **Real-time** report'unda şunları izleyin:
- Active form submissions
- Live conversion events
- Current form abandonment events
- Form errors in real-time

---

## Örnek GA4 Exploration Queries

### Query 1: Best Performing Form by Role

```
Technique: Free Form
Rows: Form Type, User Role
Values: lead_generated (Event Count)
Filters: None
Date Range: Last 30 days
```

### Query 2: Form Field That Causes Most Errors

```
Technique: Free Form
Rows: Field Name, Error Message
Values: form_error (Event Count)
Filters: Event Name = form_error
Date Range: Last 7 days
```

### Query 3: Lead Quality Trend Over Time

```
Technique: Line Chart
X-axis: Date
Lines: Lead Quality (hot, warm, cold)
Values: lead_generated (Event Count)
Date Range: Last 90 days
```

### Query 4: UTM Source Performance

```
Technique: Free Form
Rows: UTM Source, UTM Medium, UTM Campaign
Values: 
  - lead_generated (Event Count)
  - lead_quality = 'hot' (Event Count)
  - Average Quality Score
Filters: None
Date Range: Last 30 days
Sort: lead_generated DESC
```

---

## Alerts ve Monitoring

### Recommended GA4 Alerts

1. **Lead Generation Düşüşü**
   - Metric: lead_generated
   - Condition: Decreases by 30% day-over-day
   - Action: Email notification to marketing team

2. **Form Error Artışı**
   - Metric: form_error
   - Condition: Increases by 50% day-over-day
   - Action: Immediate notification to dev team

3. **Form Abandonment Spike**
   - Metric: form_abandon
   - Condition: Abandonment rate > 60%
   - Action: Email notification

4. **Hot Lead Alert**
   - Metric: lead_generated with lead_quality = 'hot'
   - Condition: Any hot lead generated
   - Action: Real-time notification to sales team

---

## Debug Mode

Development sırasında tracking'i test etmek için:

### Browser Console'da Tracking Görmek

Her event console'a loglanıyor:
```
📊 Analytics Event: form_start {form_type: 'contact', user_role: 'unknown', ...}
```

### GA4 Debug Mode

Chrome Extension kullanın:
- **Google Analytics Debugger**
- Events real-time GA4 DebugView'da görünür

### Test Checklist

✅ Form start event fires on first field interaction
✅ Field focus events track correctly
✅ Validation errors tracked
✅ Form abandon fires on page leave (without submit)
✅ Submit attempt tracked
✅ Conversion events fire on success
✅ Lead quality calculated correctly
✅ UTM parameters captured
✅ User properties set correctly

---

## Best Practices

### 1. Regular Review
- Haftalık lead quality trend review
- Aylık form performance optimization
- Çeyrek yıllık funnel analysis

### 2. A/B Testing
- Form field order changes
- CTA copy variations
- Form length experiments

Her A/B test için UTM parameter ekleyerek track edin:
```
Variant A: utm_content=short_form
Variant B: utm_content=long_form
```

### 3. Lead Follow-up
- Hot leads: 24 saat içinde takip
- Warm leads: 48 saat içinde takip
- Cold leads: Email nurture campaign'e ekle

### 4. Data-Driven Optimization
- En yüksek conversion rate'li form'u öncelikle yerleştir
- En çok hata veren alanları basitleştir
- High-abandonment forms için improvement planla

---

## Troubleshooting

### Event Tracking Çalışmıyor

1. Console'da event'leri görüyor musunuz?
   - Hayır → Kod hatası var, analytics.ts'i kontrol et
   - Evet → GA4 entegrasyonu kontrol et

2. GA4'te events görünüyor mu?
   - DebugView açık mı? (GA4 Admin → DebugView)
   - Measurement ID doğru mu? (NEXT_PUBLIC_GA_ID)

3. Conversion events işaretli mi?
   - GA4 Admin → Events → Conversions
   - lead_generated, contact_submit, early_access_submit marked?

### UTM Parameters Kayboldu

- URL'de UTM parametreleri var mı?
- Analytics.ts'de getUTMParams() fonksiyonu çalışıyor mu?
- GA4'te custom dimensions UTM parametreleri için oluşturuldu mu?

### Lead Quality Yanlış Hesaplanıyor

- leadQuality.assess() fonksiyonunu kontrol et
- Scoring logic'i iş gereksinimlerinize göre ayarlayın
- Console'da quality_score değerlerini inceleyin

---

## Özet: İlk Kurulum Adımları

### 1. GA4 Admin Setup (10 dakika)
- [ ] Conversion events'leri işaretle (lead_generated, contact_submit, early_access_submit)
- [ ] Custom dimensions oluştur (form_type, user_role, lead_quality, vb.)
- [ ] User properties tanımla (lead_status, preferred_role, vb.)

### 2. Funnel Setup (15 dakika)
- [ ] Contact Form Funnel oluştur
- [ ] Early Access Funnel oluştur
- [ ] Complete Lead Journey Funnel oluştur

### 3. Reporting (20 dakika)
- [ ] Lead Generation Overview raporu
- [ ] Form Performance raporu
- [ ] Form Abandonment Analysis raporu
- [ ] UTM Campaign Performance raporu
- [ ] Lead Quality Scorecard

### 4. Alerts (5 dakika)
- [ ] Lead generation düşüş alert
- [ ] Form error artış alert
- [ ] Hot lead notification

### 5. Test (10 dakika)
- [ ] Tüm formları test et
- [ ] Events'lerin DebugView'da göründüğünü doğrula
- [ ] Conversion tracking çalışıyor mu kontrol et

---

## İletişim

Sorularınız için:
- **Analytics**: Google Analytics 4 Help Center
- **Implementation**: Bu repo'nun maintainer'ları ile iletişime geçin
- **Custom Requirements**: Analytics expert ile konsültasyon

---

**Son Güncelleme:** 2025-10-17
**Version:** 1.0




