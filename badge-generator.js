// Badge Generator using Canvas API

function generateBadge(completedLevel, levelData) {
    const canvas = document.getElementById('badge-canvas');
    const ctx = canvas.getContext('2d');

    // Canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Background - clean gradient
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, '#0f172a');  // Dark blue
    bgGradient.addColorStop(1, '#1e293b');  // Slate
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Main content card
    const cardPadding = 40;
    const cardX = cardPadding;
    const cardY = cardPadding;
    const cardWidth = width - (cardPadding * 2);
    const cardHeight = height - (cardPadding * 2);
    const cornerRadius = 15;

    // Draw white card with rounded corners
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cardX + cornerRadius, cardY);
    ctx.lineTo(cardX + cardWidth - cornerRadius, cardY);
    ctx.arcTo(cardX + cardWidth, cardY, cardX + cardWidth, cardY + cornerRadius, cornerRadius);
    ctx.lineTo(cardX + cardWidth, cardY + cardHeight - cornerRadius);
    ctx.arcTo(cardX + cardWidth, cardY + cardHeight, cardX + cardWidth - cornerRadius, cardY + cardHeight, cornerRadius);
    ctx.lineTo(cardX + cornerRadius, cardY + cardHeight);
    ctx.arcTo(cardX, cardY + cardHeight, cardX, cardY + cardHeight - cornerRadius, cornerRadius);
    ctx.lineTo(cardX, cardY + cornerRadius);
    ctx.arcTo(cardX, cardY, cardX + cornerRadius, cardY, cornerRadius);
    ctx.closePath();
    ctx.fill();

    // Decorative top border
    const borderGradient = ctx.createLinearGradient(cardX, cardY, cardX + cardWidth, cardY);
    borderGradient.addColorStop(0, '#07DADA');
    borderGradient.addColorStop(1, '#6366f1');
    ctx.fillStyle = borderGradient;
    ctx.fillRect(cardX, cardY, cardWidth, 8);

    // Reset text rendering
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Achievement title
    ctx.fillStyle = '#64748b';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText('AI PROFICIENCY QUIZ', centerX, cardY + 50);

    // Level badge circle
    const badgeY = cardY + 110;
    const badgeRadius = 50;

    // Outer circle gradient
    const circleGradient = ctx.createLinearGradient(centerX - badgeRadius, badgeY - badgeRadius, centerX + badgeRadius, badgeY + badgeRadius);
    circleGradient.addColorStop(0, '#07DADA');
    circleGradient.addColorStop(1, '#6366f1');
    ctx.fillStyle = circleGradient;
    ctx.beginPath();
    ctx.arc(centerX, badgeY, badgeRadius, 0, Math.PI * 2);
    ctx.fill();

    // Inner circle
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, badgeY, badgeRadius - 5, 0, Math.PI * 2);
    ctx.fill();

    // Level number
    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 36px Arial, sans-serif';
    ctx.fillText(completedLevel.toString(), centerX, badgeY);

    // Level name
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.fillText(levelData.name.toUpperCase(), centerX, cardY + 200);

    // Description
    ctx.fillStyle = '#64748b';
    ctx.font = 'italic 15px Arial, sans-serif';
    ctx.fillText(`"${levelData.description}"`, centerX, cardY + 230);

    // Divider line
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(cardX + 60, cardY + 260);
    ctx.lineTo(cardX + cardWidth - 60, cardY + 260);
    ctx.stroke();

    // User name
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 24px Arial, sans-serif';
    ctx.fillText(state.user.name, centerX, cardY + 300);

    // Achievement text
    ctx.fillStyle = '#64748b';
    ctx.font = '14px Arial, sans-serif';
    ctx.fillText(`You reached Level ${completedLevel}!`, centerX, cardY + 335);

    // Date
    const date = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText(date, centerX, cardY + 370);

    // Footer branding
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '11px Arial, sans-serif';
    ctx.fillText('AI Proficiency Quiz', centerX, height - 25);
}
