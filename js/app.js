// ========== 全局变量 ==========
let allPredictions = [];
let filteredPredictions = [];

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', async () => {
    await loadPredictions();
    initializeTheme();
    initializeEventListeners();
    renderPredictions();
    updateStats();
});

// ========== 加载数据 ==========
async function loadPredictions() {
    try {
        const response = await fetch('data/predictions.json');
        const data = await response.json();
        allPredictions = data.predictions;
        filteredPredictions = [...allPredictions];
        
        // 设置最后更新时间
        document.getElementById('lastUpdated').textContent = `最后更新: ${new Date().toLocaleDateString('zh-CN')}`;
    } catch (error) {
        console.error('加载数据失败:', error);
        document.getElementById('predictionsContainer').innerHTML = 
            '<div class="no-results">⚠️ 数据加载失败，请刷新页面重试</div>';
    }
}

// ========== 主题切换 ==========
function initializeTheme() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ========== 事件监听 ==========
function initializeEventListeners() {
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    document.getElementById('searchInput').addEventListener('input', (e) => {
        filterAndRender();
    });
    
    document.getElementById('sentimentFilter').addEventListener('change', () => {
        filterAndRender();
    });
    
    document.getElementById('sortBy').addEventListener('change', () => {
        filterAndRender();
    });
}

// ========== 筛选和排序 ==========
function filterAndRender() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const sentimentFilter = document.getElementById('sentimentFilter').value;
    const sortBy = document.getElementById('sortBy').value;
    
    // 筛选
    filteredPredictions = allPredictions.filter(pred => {
        const matchesSearch = 
            pred.institution.toLowerCase().includes(searchTerm) ||
            pred.person.toLowerCase().includes(searchTerm) ||
            pred.content.toLowerCase().includes(searchTerm) ||
            pred.role.toLowerCase().includes(searchTerm);
        
        const matchesSentiment = 
            sentimentFilter === 'all' || pred.sentiment === sentimentFilter;
        
        return matchesSearch && matchesSentiment;
    });
    
    // 排序
    filteredPredictions.sort((a, b) => {
        switch(sortBy) {
            case 'date-desc':
                return new Date(b.date) - new Date(a.date);
            case 'date-asc':
                return new Date(a.date) - new Date(b.date);
            case 'price-desc':
                return b.targetPrice - a.targetPrice;
            case 'price-asc':
                return a.targetPrice - b.targetPrice;
            default:
                return 0;
        }
    });
    
    renderPredictions();
}

// ========== 渲染预测卡片 ==========
function renderPredictions() {
    const container = document.getElementById('predictionsContainer');
    
    if (filteredPredictions.length === 0) {
        container.innerHTML = '<div class="no-results">😔 未找到匹配的预测记录</div>';
        return;
    }
    
    container.innerHTML = filteredPredictions.map(pred => createPredictionCard(pred)).join('');
}

function createPredictionCard(pred) {
    const sentimentEmoji = {
        'bullish': '📈',
        'bearish': '📉',
        'neutral': '➡️'
    };
    
    const sentimentText = {
        'bullish': '看涨',
        'bearish': '看跌',
        'neutral': '中性'
    };
    
    const changeHtml = pred.change ? 
        `<span class="change-badge ${pred.change > 0 ? 'change-positive' : 'change-negative'}">
            ${pred.change > 0 ? '+' : ''}${pred.change}%
        </span>` : '';
    
    const longTermHtml = pred.longTermPrice ? 
        `<div class="long-term-prediction">
            <div class="price-label">长期目标</div>
            <div class="price-value">$${pred.longTermPrice.toLocaleString()}</div>
            <div class="price-date">预期时间: ${pred.longTermDate}</div>
        </div>` : '';
    
    const personHtml = pred.person ? 
        `<div class="person-info">${pred.person} ${pred.role ? `- ${pred.role}` : ''}</div>` : 
        (pred.role ? `<div class="person-info">${pred.role}</div>` : '');
    
    return `
        <div class="prediction-card" data-id="${pred.id}">
            <div class="prediction-header">
                <div class="prediction-institution">
                    <div class="institution-name">${pred.institution}</div>
                    ${personHtml}
                </div>
                <span class="sentiment-badge sentiment-${pred.sentiment}">
                    ${sentimentEmoji[pred.sentiment]} ${sentimentText[pred.sentiment]}
                </span>
            </div>
            
            <div class="prediction-price">
                <div class="price-label">目标价格</div>
                <div class="price-value">$${pred.targetPrice.toLocaleString()}</div>
                <div class="price-date">预期时间: ${pred.targetDate}</div>
                ${changeHtml}
                ${longTermHtml}
            </div>
            
            <div class="prediction-content">
                ${pred.content}
            </div>
            
            <div class="prediction-footer">
                <span class="prediction-date">📅 ${formatDate(pred.date)}</span>
                <a href="${pred.sourceUrl}" target="_blank" rel="noopener noreferrer" class="source-link">
                    查看原文 →
                </a>
            </div>
        </div>
    `;
}

// ========== 更新统计信息 ==========
function updateStats() {
    const total = allPredictions.length;
    const prices = allPredictions.map(p => p.targetPrice);
    const avgPrice = prices.reduce((sum, price) => sum + price, 0) / total;
    const highestPrice = Math.max(...prices);
    const lowestPrice = Math.min(...prices);
    
    document.getElementById('totalPredictions').textContent = total;
    document.getElementById('avgPrice').textContent = `$${Math.round(avgPrice).toLocaleString()}`;
    document.getElementById('highestPrice').textContent = `$${highestPrice.toLocaleString()}`;
    document.getElementById('lowestPrice').textContent = `$${lowestPrice.toLocaleString()}`;
}

// ========== 工具函数 ==========
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ========== 平滑滚动 ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
