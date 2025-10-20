# AI Proficiency Quiz 🧠

An interactive quiz to test understanding of AI, Machine Learning, Deep Learning, LLMs, and Generative AI - designed for non-technical professionals.

## 🎯 Features

- **10 Progressive Levels**: From "AI Curious" to "Artificial Ace"
- **50 Carefully Crafted Questions**: 5 questions per level
- **Lives System**: 3 chances before game over
- **Dynamic Badge Generation**: Downloadable certificates showing achievement level
- **Personalized Learning Recommendations**: Get guidance on what to study next
- **User Feedback Collection**: Integrated with Google Sheets
- **Fully Responsive**: Works beautifully on desktop, tablet, and mobile

## 📊 The 10 Levels

1. **🤔 AI Curious** - Just heard about ChatGPT at a dinner party
2. **🌱 Prompt Padawan** - Can ask AI basic questions without confusion
3. **🎓 Algorithm Apprentice** - Knows AI isn't magic
4. **🧠 Neural Novice** - Understands AI vs smart devices
5. **📊 Data Dabbler** - Can explain ML at a cocktail party
6. **💬 LLM Literate** - Knows what tokens are (not cryptocurrency!)
7. **✨ Gen AI Guru** - Can distinguish AI types without googling
8. **🎯 Model Maestro** - Understands training, fine-tuning, hallucinations
9. **🚀 AI Strategist** - Can plan AI implementation without breaking your company
10. **🏆 Artificial Ace** - Non-technical but professionally competent

## 🚀 Quick Start

### Option 1: Deploy to Web Hosting

1. Upload all files to your web hosting:
   - `index.html`
   - `styles.css`
   - `quiz.js`
   - `badge-generator.js`
   - `questions.json`

2. Access via your domain: `https://yourdomain.com/quiz/`

### Option 2: Embed in Squarespace

See the **Squarespace Embedding Guide** section below.

### Option 3: Run Locally

```bash
# Using Python
cd AI-Proficiency-Quiz
python -m http.server 8000

# Or using Node.js
npx http-server -p 8000

# Then open: http://localhost:8000
```

## 📦 File Structure

```
AI-Proficiency-Quiz/
├── index.html              # Main HTML structure
├── styles.css              # Professional styling
├── quiz.js                 # Quiz logic and game mechanics
├── badge-generator.js      # Canvas-based badge generation
├── questions.json          # 50 questions across 10 levels
├── README.md              # This file
└── GOOGLE_SHEETS_SETUP.md # Data collection setup guide
```

## 🔧 Google Sheets Integration

To collect user responses and feedback:

1. Follow the step-by-step guide in `GOOGLE_SHEETS_SETUP.md`
2. Create a Google Sheet and Apps Script Web App
3. Update the `quiz.js` file with your Web App URL
4. Test the integration

The system collects:
- User name and email
- Level reached
- Correct/wrong answer counts
- Whether they completed all levels
- User feedback on AI challenges

## 🎨 Squarespace Embedding Guide

### Method 1: Code Block (Recommended)

1. **Prepare Your Files**
   - Upload all quiz files to a web hosting service or Squarespace's file storage
   - Note the URLs for each file

2. **In Squarespace:**
   - Edit the page where you want the quiz
   - Add a **Code Block**
   - Paste the following code:

```html
<style>
  .quiz-iframe-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    border: none;
  }
  .quiz-iframe {
    width: 100%;
    min-height: 800px;
    border: none;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  }
</style>

<div class="quiz-iframe-container">
  <iframe
    src="YOUR_QUIZ_URL_HERE"
    class="quiz-iframe"
    title="AI Proficiency Quiz"
    loading="lazy">
  </iframe>
</div>

<script>
  // Auto-resize iframe
  window.addEventListener('message', function(e) {
    if (e.data.type === 'resize') {
      document.querySelector('.quiz-iframe').style.height = e.data.height + 'px';
    }
  });
</script>
```

3. Replace `YOUR_QUIZ_URL_HERE` with your quiz URL
4. Save and publish

### Method 2: Full Page Embed

1. **Create a New Blank Page** in Squarespace
2. **Add a Code Block** that covers the entire page
3. **Paste this code:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Proficiency Quiz</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: auto;
        }
        iframe {
            width: 100%;
            height: 100vh;
            border: none;
        }
    </style>
</head>
<body>
    <iframe src="YOUR_QUIZ_URL_HERE" title="AI Proficiency Quiz"></iframe>
</body>
</html>
```

4. Replace `YOUR_QUIZ_URL_HERE` with your quiz URL

### Method 3: Direct HTML Injection

If you have access to Squarespace's developer mode:

1. Upload all quiz files to your site's `/assets` folder
2. Create a new page template
3. Include the quiz files directly in the template

### Hosting Options for Quiz Files

**Option A: External Hosting (Easiest)**
- Use services like Netlify, Vercel, or GitHub Pages (free)
- Upload your quiz folder
- Get a public URL
- Embed in Squarespace

**Option B: Squarespace File Storage**
- Upload files via Settings > Advanced > Code Injection > Upload Files
- Files will be available at: `https://yoursite.squarespace.com/s/filename.ext`
- Update file paths in HTML accordingly

**Option C: Cloud Storage**
- Upload to Google Drive, Dropbox, or AWS S3
- Make files publicly accessible
- Use those URLs in your iframe

## 🎨 Customization

### Colors and Branding

Edit `styles.css` to match your brand:

```css
:root {
    --primary-color: #6366f1;      /* Main theme color */
    --primary-dark: #4f46e5;       /* Darker shade */
    --success-color: #10b981;      /* Correct answer */
    --error-color: #ef4444;        /* Wrong answer */
    /* ... more variables ... */
}
```

### Questions

Edit `questions.json` to:
- Modify existing questions
- Adjust difficulty levels
- Change explanations
- Add more questions per level

### Badge Design

Modify `badge-generator.js` to:
- Change badge colors
- Update fonts
- Modify layout
- Add your logo

## 🔒 Privacy & Data Collection

- User data is collected only with consent
- Data is stored in your personal Google Sheet (not public)
- No data is shared with third parties
- Consider adding a privacy policy link
- Ensure GDPR/CCPA compliance for your region

## 🐛 Troubleshooting

### Quiz not loading
- Check that all file paths are correct
- Verify files are uploaded and publicly accessible
- Check browser console for errors (F12 > Console)

### Questions not displaying
- Ensure `questions.json` is in the same directory as other files
- Check JSON format validity at [JSONLint](https://jsonlint.com/)
- Verify the fetch URL in `quiz.js` is correct

### Google Sheets not receiving data
- Follow `GOOGLE_SHEETS_SETUP.md` carefully
- Check Apps Script deployment permissions
- Verify Web App URL is correct in `quiz.js`
- Check for CORS issues (expected with Google Apps Script)

### Iframe sizing issues on Squarespace
- Adjust `min-height` in the CSS
- Use the auto-resize script provided
- Test on different screen sizes

## 📱 Browser Support

- ✅ Chrome (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 🎓 Educational Use

This quiz is designed for:
- Corporate training programs
- Educational institutions
- Professional development
- AI literacy workshops
- Self-assessment

Feel free to adapt for your needs!

## 📝 License

This project is provided as-is for educational and professional development purposes.

## 🤝 Support

For issues or questions:
1. Check this README and `GOOGLE_SHEETS_SETUP.md`
2. Review browser console for error messages
3. Verify all file paths and URLs
4. Test locally before deploying

## 🚀 Future Enhancements

Potential additions:
- [ ] Leaderboard functionality
- [ ] Social media sharing
- [ ] Time-based challenges
- [ ] Team competition mode
- [ ] Progress saving (local storage)
- [ ] Multi-language support
- [ ] Accessibility improvements
- [ ] Analytics dashboard

## 📊 Credits

- Questions generated using Claude AI
- Badge system built with HTML5 Canvas
- Responsive design with modern CSS
- Vanilla JavaScript (no frameworks required)

---

Made with 🧠 for non-technical professionals learning about AI

For questions or feedback, update the quiz.js feedback system to collect user input!
