// HubSpot API integration for form submissions
export interface HubSpotContact {
  properties: {
    firstname: string;
    lastname: string;
    company: string;
    email: string;
    role: string;
    industry: string;
    country: string;
    hs_lead_status: string;
    lifecyclestage: string;
  };
}

export interface HubSpotFormData {
  name: string;
  company: string;
  email: string;
  role: string;
  category: string;
  country: string;
  gdpr: boolean;
}

export async function submitToHubSpot(formData: HubSpotFormData): Promise<{ success: boolean; message: string }> {
  try {
    // Split name into first and last name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const contactData: HubSpotContact = {
      properties: {
        firstname: firstName,
        lastname: lastName,
        company: formData.company,
        email: formData.email,
        role: formData.role,
        industry: formData.category,
        country: formData.country,
        hs_lead_status: 'NEW',
        lifecyclestage: 'lead'
      }
    };

    // HubSpot API endpoint
    const hubspotApiUrl = 'https://api.hubapi.com/crm/v3/objects/contacts';
    
    // You'll need to set this as an environment variable
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    
    if (!hubspotApiKey) {
      throw new Error('HubSpot API key not configured');
    }

    const response = await fetch(hubspotApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${hubspotApiKey}`
      },
      body: JSON.stringify(contactData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`HubSpot API error: ${errorData.message || 'Unknown error'}`);
    }

    await response.json();
    
    return {
      success: true,
      message: 'Contact successfully added to HubSpot'
    };

  } catch (error) {
    console.error('HubSpot submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit to HubSpot'
    };
  }
}

// Alternative: Use HubSpot Forms API (easier setup)
export async function submitToHubSpotForm(formData: HubSpotFormData): Promise<{ success: boolean; message: string }> {
  try {
    // HubSpot Form submission endpoint
    const formId = process.env.HUBSPOT_FORM_ID; // Your HubSpot form ID
    const portalId = process.env.HUBSPOT_PORTAL_ID; // Your HubSpot portal ID
    
    if (!formId || !portalId) {
      throw new Error('HubSpot form configuration missing');
    }

    const formSubmissionData = {
      fields: [
        { name: 'firstname', value: formData.name.split(' ')[0] },
        { name: 'lastname', value: formData.name.split(' ').slice(1).join(' ') },
        { name: 'company', value: formData.company },
        { name: 'email', value: formData.email },
        { name: 'role', value: formData.role },
        { name: 'industry', value: formData.category },
        { name: 'country', value: formData.country }
      ],
      context: {
        hutk: '', // HubSpot tracking cookie (if available)
        pageUri: window.location.href,
        pageName: 'Karavan Landing Page'
      }
    };

    const response = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formSubmissionData)
    });

    if (!response.ok) {
      throw new Error(`Form submission failed: ${response.statusText}`);
    }

    return {
      success: true,
      message: 'Form submitted successfully'
    };

  } catch (error) {
    console.error('HubSpot form submission error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to submit form'
    };
  }
}
