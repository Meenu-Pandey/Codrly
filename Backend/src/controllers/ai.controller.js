const aiService = require('../services/ai.service');

const fixCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Code and language are required'
      });
    }

    const fixedCode = await aiService.fixCode(code, language);
    
    res.json({
      success: true,
      fixedCode: fixedCode
    });
  } catch (error) {
    console.error('Fix Code Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fix code. Please try again.'
    });
  }
};

const reviewCode = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({
        success: false,
        error: 'Code and language are required'
      });
    }

    const review = await aiService.reviewCode(code, language);
    
    res.json({
      success: true,
      review: review
    });
  } catch (error) {
    console.error('Review Code Error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to review code. Please try again.'
    });
  }
};

module.exports = {
  fixCode,
  reviewCode
};
