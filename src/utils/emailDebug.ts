// EmailJS Debug and Testing Utility
import emailjs from '@emailjs/browser';

// Configuration - update these to match your emailService.ts
const EMAILJS_CONFIG = {
  serviceId: "service_xjizkqm",
  templateId: "template_4alhysb",
  confirmationTemplateId: "template_confirmation_id", // Replace with actual ID
  publicKey: "ye3twwVcfp0jM_o2z",
};

export const debugEmailConfiguration = () => {
  console.log('🔍 EmailJS Configuration Check:');
  console.log('================================');
  console.log('Service ID:', EMAILJS_CONFIG.serviceId);
  console.log('Admin Template ID:', EMAILJS_CONFIG.templateId);
  console.log('Confirmation Template ID:', EMAILJS_CONFIG.confirmationTemplateId);
  console.log('Public Key:', EMAILJS_CONFIG.publicKey ? 'Set ✅' : 'Missing ❌');
  
  // Check if template ID looks like placeholder
  if (EMAILJS_CONFIG.confirmationTemplateId.includes('template_confirmation_id')) {
    console.warn('⚠️ WARNING: Still using placeholder template ID!');
    console.warn('Please replace "template_confirmation_id" with your actual EmailJS template ID');
  }
  
  return EMAILJS_CONFIG;
};

export const testSimpleEmail = async (testEmail: string) => {
  console.log('🧪 Testing Simple Email Send...');
  console.log('================================');
  
  try {
    // Test with minimal parameters first
    const simpleParams = {
      to_email: testEmail,
      user_name: 'Debug Test User',
      message: 'This is a simple test email from AR Rahman'
    };
    
    console.log('📤 Sending simple test email...');
    console.log('Target:', testEmail);
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.confirmationTemplateId,
      simpleParams,
      EMAILJS_CONFIG.publicKey
    );
    
    console.log('✅ Simple email test result:', response);
    return response;
    
  } catch (error: any) {
    console.error('❌ Simple email test failed:', error);
    
    // Provide specific guidance based on error
    if (error.message?.includes('404') || error.message?.includes('template')) {
      console.error('🚨 Template not found! Check your template ID in EmailJS dashboard');
    } else if (error.message?.includes('403') || error.message?.includes('unauthorized')) {
      console.error('🚨 Authorization error! Check your public key and service configuration');
    } else if (error.message?.includes('400')) {
      console.error('🚨 Bad request! Check your template parameters match EmailJS template variables');
    }
    
    throw error;
  }
};

export const verifyEmailJSConnection = async () => {
  console.log('🔌 Verifying EmailJS Connection...');
  console.log('==================================');
  
  try {
    // Test basic EmailJS connectivity
    const testResponse = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId, // Use the working admin template
      {
        to_email: 'test@example.com',
        from_name: 'Connection Test',
        subject: 'EmailJS Connection Test',
        user_name: 'Test User'
      },
      EMAILJS_CONFIG.publicKey
    );
    
    console.log('✅ EmailJS connection working:', testResponse);
    return true;
  } catch (error) {
    console.error('❌ EmailJS connection failed:', error);
    return false;
  }
};

// Template configuration checker
export const checkTemplateConfiguration = () => {
  console.log('📋 Template Configuration Checklist:');
  console.log('====================================');
  console.log('');
  console.log('In your EmailJS template, make sure you have:');
  console.log('1. "To" field set to: {{to_email}}');
  console.log('2. "Subject" field set to: {{subject}}');
  console.log('3. These variables in your template body:');
  console.log('   - {{greeting}}');
  console.log('   - {{main_message}}');
  console.log('   - {{what_happens_next}}');
  console.log('   - {{additional_info}}');
  console.log('   - {{closing}}');
  console.log('   - {{signature}}');
  console.log('   - {{company_info}}');
  console.log('');
  console.log('📧 Quick Template for Testing:');
  console.log('Subject: {{subject}}');
  console.log('Body: {{greeting}}, {{main_message}}');
  console.log('');
  console.log('🔗 Go to: https://dashboard.emailjs.com/admin/templates');
};

// Comprehensive debug function
export const runFullDiagnostic = async (testEmail: string) => {
  console.log('🚀 Running Full Email Diagnostic...');
  console.log('===================================');
  
  // Step 1: Check configuration
  debugEmailConfiguration();
  console.log('');
  
  // Step 2: Check template setup
  checkTemplateConfiguration();
  console.log('');
  
  // Step 3: Test basic connectivity
  try {
    const connectionOk = await verifyEmailJSConnection();
    if (!connectionOk) {
      console.log('❌ Stopping diagnostic - EmailJS connection failed');
      return false;
    }
  } catch (error) {
    console.log('❌ Stopping diagnostic - EmailJS connection error');
    return false;
  }
  
  console.log('');
  
  // Step 4: Test simple email
  try {
    await testSimpleEmail(testEmail);
    console.log('✅ Diagnostic complete! Check your email (including spam folder)');
    return true;
  } catch (error) {
    console.log('❌ Diagnostic failed at email send stage');
    return false;
  }
};

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).emailDebug = {
    config: debugEmailConfiguration,
    simple: testSimpleEmail,
    verify: verifyEmailJSConnection,
    template: checkTemplateConfiguration,
    full: runFullDiagnostic
  };
  
  console.log('🛠️ Email Debug Tools Available:');
  console.log('emailDebug.config() - Check configuration');
  console.log('emailDebug.simple("email@example.com") - Test simple email');
  console.log('emailDebug.verify() - Test EmailJS connection');
  console.log('emailDebug.template() - Show template checklist');
  console.log('emailDebug.full("email@example.com") - Run full diagnostic');
}