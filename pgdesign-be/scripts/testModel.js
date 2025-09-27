const AboutProjectModel = require('../dist/models/AboutProjectModel').default;

async function testModel() {
  try {
    console.log('🔍 Testing AboutProjectModel...');
    
    const result = await AboutProjectModel.getActiveAboutProject();
    console.log('📝 Model result:', JSON.stringify(result, null, 2));
    
  } catch (error) {
    console.error('❌ Error:', error);
  }
}

testModel();
