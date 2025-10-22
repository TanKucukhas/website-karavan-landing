# GA4 Lead Tracking & Analytics Dashboard Kurulumu

Bu rehber, Karavan landing page için optimize edilmiş GA4 dashboard ve raporlama kurulumunu içerir.

## İçindekiler
1. [Genel Bakış](#genel-bakış)
2. [Event Taxonomy](#event-taxonomy)
3. [Custom Dimensions](#custom-dimensions)
4. [Conversion Events Kurulumu](#conversion-events-kurulumu)
5. [Custom Reports](#custom-reports)
6. [Funnel Analysis](#funnel-analysis)
7. [Bottleneck Analizi](#bottleneck-analizi)
8. [Dashboard Önerileri](#dashboard-önerileri)

---

## Genel Bakış

### Takip Edilen Event Kategorileri

#### 🎯 Conversion Events (Ana Hedefler)
- `lead_generated` - Ana conversion event
- `contact_submit` - Contact form başarılı gönderim
- `early_access_submit` - Early access kayıt

#### 📊 Engagement Events
- `scroll_depth` - Sayfa scroll derinliği (25%, 50%, 75%, 100%)
- `time_on_page` - Sayfada geçirilen süre (15s, 30s, 60s, 120s)
- `section_view` - Section görüntüleme
- `section_engagement` - Section'da geçirilen süre
- `session_start` / `session_end` - Session başlangıç/bitiş

#### 🖱️ Interaction Events
- `cta_click` - CTA buton tıklamaları
- `nav_click` - Navigation link tıklamaları
- `social_click` - Sosyal medya link tıklamaları
- `external_link_click` - External link tıklamaları
- `map_node_click` - Harita bölge tıklamaları
- `role_change` - Buyer/Seller toggle
- `language_change` - Dil değiştirme

#### 📝 Form Funnel Events
- `form_start` → `form_field_focus` → `form_submit_attempt` → `lead_generated`
- `form_abandon` - Form terk etme
- `form_error` - Form validasyon hataları

---

## Event Taxonomy

### Core Conversion Events

#### `lead_generated`
**Ana conversion event - her lead için 1 değer**
```javascript
{
  event_name: 'lead_generated',
  value: 1,
  form_type: 'contact' | 'early_access_hero' | 'early_access_cta',
  user_role: 'buyer' | 'seller' | 'unknown',
  lead_quality: 'hot' | 'warm' | 'cold',
  quality_score: number,
  time_on_form: number,
  has_company: boolean,
  message_length: number,
  subject: string,
  // + UTM parameters
  // + session data
}
```

#### `contact_submit` / `early_access_submit`
**Spesifik form conversion events**
```javascript
{
  event_name: 'contact_submit' | 'early_access_submit',
  value: 1,
  form_type: 'contact' | 'early_access_hero' | 'early_access_cta',
  user_role: 'buyer' | 'seller' | 'unknown',
  // + form specific data
}
```

### Engagement Events

#### `scroll_depth`
**Scroll derinliği tracking**
```javascript
{
  event_name: 'scroll_depth',
  value: 25 | 50 | 75 | 100,
  depth_percentage: 25 | 50 | 75 | 100,
  page_id: 'homepage' | 'contact' | 'region-*',
  event_category: 'engagement',
  event_label: 'scroll_25%' | 'scroll_50%' | 'scroll_75%' | 'scroll_100%'
}
```

#### `time_on_page`
**Sayfada geçirilen süre tracking**
```javascript
{
  event_name: 'time_on_page',
  value: 15 | 30 | 60 | 120,
  time_seconds: 15 | 30 | 60 | 120,
  page_id: string,
  session_id: string,
  engagement_time: number,
  engagement_ratio: number,
  event_category: 'engagement',
  event_label: 'time_15s' | 'time_30s' | 'time_60s' | 'time_120s'
}
```

#### `section_view` / `section_engagement`
**Section görüntüleme ve engagement**
```javascript
{
  event_name: 'section_view' | 'section_engagement',
  section: 'hero' | 'features' | 'metrics' | 'categories' | 'regions' | 'cta' | 'contact',
  page_id: string,
  time_in_view: number, // section_engagement için
  event_category: 'engagement'
}
```

### Interaction Events

#### `cta_click`
**CTA buton tıklamaları**
```javascript
{
  event_name: 'cta_click',
  location: 'header-desktop' | 'header-mobile' | 'cta-banner-submit' | 'hero-*',
  role: 'buyer' | 'seller' | undefined,
  event_category: 'engagement',
  event_label: 'cta_header-desktop' | 'cta_cta-banner-submit'
}
```

#### `form_start` → `form_field_focus` → `form_submit_attempt` → `lead_generated`
**Form funnel tracking**
```javascript
// form_start
{
  event_name: 'form_start',
  form_type: 'contact' | 'early_access_hero' | 'early_access_cta',
  user_role: 'buyer' | 'seller' | 'unknown',
  event_category: 'lead_generation',
  event_label: 'contact_started' | 'early_access_hero_started'
}

// form_field_focus
{
  event_name: 'form_field_focus',
  form_type: 'contact' | 'early_access_hero' | 'early_access_cta',
  field_name: 'name' | 'email' | 'company' | 'message' | 'role',
  event_category: 'lead_generation'
}

// form_abandon
{
  event_name: 'form_abandon',
  form_type: 'contact' | 'early_access_hero' | 'early_access_cta',
  user_role: 'buyer' | 'seller' | 'unknown',
  filled_fields: string[], // ['name', 'email']
  filled_fields_count: number,
  event_category: 'lead_generation',
  value: number // field count
}
```

---

## Custom Dimensions

### User Properties
- `preferred_role` - buyer/seller
- `preferred_language` - tr/en/ru
- `lead_status` - converted/not_converted
- `lead_type` - contact/early_access_hero/early_access_cta
- `lead_quality` - hot/warm/cold

### Event Parameters
- `page_id` - Sayfa tanımlayıcısı
- `session_id` - Session tanımlayıcısı
- `form_type` - Form tipi
- `user_role` - Kullanıcı rolü
- `lead_quality` - Lead kalitesi
- `quality_score` - Lead kalite skoru
- `time_on_form` - Form doldurma süresi
- `engagement_time` - Aktif engagement süresi
- `engagement_ratio` - Engagement oranı

---

## Conversion Events Kurulumu

### 1. GA4 Admin → Events → Mark as conversion

#### Ana Conversion Events
- ✅ `lead_generated` (Ana conversion - 1 değer)
- ✅ `contact_submit` (Contact form conversion)
- ✅ `early_access_submit` (Early access conversion)

#### Engagement Milestones
- ✅ `scroll_depth` (25%, 50%, 75%, 100%)
- ✅ `time_on_page` (15s, 30s, 60s, 120s)
- ✅ `section_view` (Her section için)

### 2. Conversion Value Setup
```javascript
// lead_generated event için
value: 1 // Her lead = 1 conversion

// scroll_depth için
value: 25 | 50 | 75 | 100 // Scroll yüzdesi

// time_on_page için  
value: 15 | 30 | 60 | 120 // Saniye cinsinden
```

---

## Custom Reports

### 1. Lead Generation Funnel Report

**GA4 → Explore → Free Form**

**Dimensions:**
- Event name
- Form type
- User role
- Lead quality

**Metrics:**
- Event count
- Conversions
- Conversion rate

**Filters:**
- Event name: form_start, form_field_focus, form_submit_attempt, lead_generated
- Date range: Last 30 days

### 2. Engagement Analysis Report

**Dimensions:**
- Page ID
- Event name
- Section

**Metrics:**
- Event count
- Average engagement time
- Scroll depth percentage

**Filters:**
- Event name: scroll_depth, time_on_page, section_view, section_engagement

### 3. CTA Performance Report

**Dimensions:**
- CTA location
- User role
- Event name

**Metrics:**
- Event count
- Click-through rate
- Conversion rate

**Filters:**
- Event name: cta_click, lead_generated

---

## Funnel Analysis

### 1. Form Conversion Funnel

**Adım 1:** `form_start` → Form başlatma
**Adım 2:** `form_field_focus` → İlk alan doldurma
**Adım 3:** `form_submit_attempt` → Submit buton tıklama
**Adım 4:** `lead_generated` → Başarılı conversion

**GA4 Setup:**
1. Admin → Events → Create conversion event
2. Explore → Funnel exploration
3. Add steps: form_start → form_field_focus → form_submit_attempt → lead_generated
4. Add breakdown: form_type, user_role

### 2. Engagement Funnel

**Adım 1:** `session_start` → Sayfa giriş
**Adım 2:** `scroll_depth` (25%) → İlk scroll
**Adım 3:** `section_view` → Section görüntüleme
**Adım 4:** `cta_click` → CTA tıklama
**Adım 5:** `lead_generated` → Conversion

---

## Bottleneck Analizi

### 1. Form Abandonment Analysis

**Query:** Form funnel'da hangi adımda en çok kayıp var?

**GA4 Setup:**
```sql
-- Form abandon rate by step
SELECT 
  event_name,
  form_type,
  COUNT(*) as events,
  COUNT(DISTINCT user_pseudo_id) as unique_users
FROM events 
WHERE event_name IN ('form_start', 'form_field_focus', 'form_submit_attempt', 'form_abandon', 'lead_generated')
  AND form_type IS NOT NULL
GROUP BY event_name, form_type
ORDER BY form_type, events DESC
```

### 2. Scroll Depth vs Conversion

**Query:** Hangi scroll derinliğinde conversion oluyor?

**GA4 Setup:**
```sql
-- Scroll depth conversion correlation
SELECT 
  depth_percentage,
  COUNT(*) as scroll_events,
  COUNT(DISTINCT CASE WHEN event_name = 'lead_generated' THEN user_pseudo_id END) as conversions
FROM events 
WHERE event_name IN ('scroll_depth', 'lead_generated')
GROUP BY depth_percentage
ORDER BY depth_percentage
```

### 3. Section Engagement vs Conversion

**Query:** Hangi section'lar conversion'a en çok katkı sağlıyor?

**GA4 Setup:**
```sql
-- Section engagement correlation
SELECT 
  section,
  COUNT(*) as section_views,
  COUNT(DISTINCT CASE WHEN event_name = 'lead_generated' THEN user_pseudo_id END) as conversions,
  AVG(time_in_view) as avg_engagement_time
FROM events 
WHERE event_name IN ('section_view', 'section_engagement', 'lead_generated')
GROUP BY section
ORDER BY conversions DESC
```

### 4. Time on Page vs Lead Quality

**Query:** Sayfada ne kadar süre kalan kullanıcılar daha kaliteli lead'ler üretiyor?

**GA4 Setup:**
```sql
-- Time on page vs lead quality
SELECT 
  CASE 
    WHEN time_seconds < 30 THEN '0-30s'
    WHEN time_seconds < 60 THEN '30-60s'
    WHEN time_seconds < 120 THEN '60-120s'
    ELSE '120s+'
  END as time_bucket,
  lead_quality,
  COUNT(*) as leads,
  AVG(quality_score) as avg_quality_score
FROM events 
WHERE event_name = 'lead_generated'
  AND lead_quality IS NOT NULL
GROUP BY time_bucket, lead_quality
ORDER BY time_bucket, avg_quality_score DESC
```

---

## Dashboard Önerileri

### 1. Lead Generation Dashboard

**Widgets:**
- Total Leads (lead_generated count)
- Lead Quality Distribution (hot/warm/cold)
- Form Conversion Rate (form_start → lead_generated)
- Lead Sources (UTM source breakdown)
- Daily Lead Trends

### 2. Engagement Dashboard

**Widgets:**
- Scroll Depth Distribution
- Time on Page Distribution
- Section View Heatmap
- Engagement Time vs Conversion
- Bounce Rate by Page

### 3. CTA Performance Dashboard

**Widgets:**
- CTA Click-through Rates
- CTA Location Performance
- Role-based CTA Performance
- CTA to Conversion Funnel
- Mobile vs Desktop CTA Performance

### 4. Form Analytics Dashboard

**Widgets:**
- Form Abandonment Rate
- Field-level Abandonment
- Form Completion Time
- Error Rate by Field
- Form Type Performance Comparison

---

## Önemli Metrikler

### 🎯 Conversion Metrics
- **Lead Generation Rate:** `lead_generated` / `session_start`
- **Form Conversion Rate:** `lead_generated` / `form_start`
- **CTA Conversion Rate:** `lead_generated` / `cta_click`
- **Lead Quality Score:** Ortalama `quality_score`

### 📊 Engagement Metrics
- **Scroll Depth Rate:** `scroll_depth` (100%) / `session_start`
- **Section View Rate:** `section_view` / `session_start`
- **Engagement Time:** Ortalama `engagement_time`
- **Bounce Rate:** `session_end` (time < 5s) / `session_start`

### 🖱️ Interaction Metrics
- **CTA Click Rate:** `cta_click` / `session_start`
- **Navigation Click Rate:** `nav_click` / `session_start`
- **Social Click Rate:** `social_click` / `session_start`
- **Map Interaction Rate:** `map_node_click` / `session_start`

### 📝 Form Metrics
- **Form Start Rate:** `form_start` / `session_start`
- **Form Abandon Rate:** `form_abandon` / `form_start`
- **Form Error Rate:** `form_error` / `form_start`
- **Field Focus Rate:** `form_field_focus` / `form_start`

---

## Alert Kurulumu

### 1. Lead Generation Alerts
- **Daily Lead Count < 5:** Düşük lead üretimi
- **Form Abandon Rate > 70%:** Yüksek form terk etme
- **Lead Quality Score < 30:** Düşük lead kalitesi

### 2. Engagement Alerts
- **Scroll Depth (100%) < 20%:** Düşük sayfa engagement
- **Time on Page < 30s:** Yüksek bounce rate
- **Section View Rate < 50%:** Düşük content engagement

### 3. Technical Alerts
- **Form Error Rate > 10%:** Yüksek form hata oranı
- **External Link Click Rate > 5%:** Yüksek exit rate
- **Language Change Rate > 20%:** Kullanıcı dil tercihi

---

## Raporlama Önerileri

### Haftalık Raporlar
1. **Lead Generation Summary**
2. **Engagement Trends**
3. **Form Performance Analysis**
4. **CTA Performance Review**

### Aylık Raporlar
1. **Conversion Funnel Analysis**
2. **Lead Quality Trends**
3. **User Behavior Patterns**
4. **Optimization Opportunities**

### Quarterly Reports
1. **Comprehensive Analytics Review**
2. **Conversion Rate Optimization**
3. **User Experience Analysis**
4. **Lead Generation Strategy Review**

---

Bu kurulum ile Karavan landing page'iniz için kapsamlı lead tracking ve analytics sistemi hazır olacak. Tüm event'ler otomatik olarak GA4'e gönderilecek ve detaylı analiz yapabileceksiniz.
