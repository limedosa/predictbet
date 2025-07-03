# Data Integration and Modeling Plan for PredictBet

## 1. Data Sources

### Fighter Statistics
- **Available Datasets**:
  - Kaggle: UFC Fighters’ Statistics dataset (scraped from UFCStats.com).
  - GitHub: Comprehensive fighter stats scraped using BeautifulSoup.
  - UFCStats.com: Official stats site with detailed fight-by-fight metrics.
- **Content**:
  - Fighter records (wins, losses, draws), physical attributes (height, weight, reach, stance).
  - Aggregated performance stats (e.g., significant strikes landed, takedowns, submission attempts).
- **Access**:
  - Publicly downloadable CSVs from Kaggle and GitHub.
  - Scrapers like `scrape_ufc_stats` for daily updates.

### Historical Fight Data
- **Available Datasets**:
  - Kaggle: UFC Complete Dataset (1993–2021) with 144 variables per fight.
  - GitHub: UFC Refactored dataset with over 400 features per fight.
  - Sherdog and Tapology: Community-maintained databases with fight records.
- **Content**:
  - Fight outcomes, event metadata, detailed in-fight statistics.
- **Access**:
  - CSVs from Kaggle.
  - Scrapers/APIs for Sherdog and UFCStats.com.

### Betting Odds
- **Available Datasets**:
  - Kaggle: Historical odds datasets (2010–2020).
  - BestFightOdds: Archive of UFC odds since 2007.
  - The Odds API: Free JSON API for live and historical odds.
- **Content**:
  - Moneyline odds, implied probabilities, bookmaker consensus.
- **Access**:
  - CSVs from Kaggle.
  - Scrapers for BestFightOdds.
  - Free API access for The Odds API.

### Sentiment Analysis
- **Data Sources**:
  - Twitter: Tweets mentioning UFC events or fighters.
  - Reddit: Subreddits like r/MMA and r/UFC.
- **Content**:
  - Public sentiment, fighter popularity, event discussions.
- **Access**:
  - Tools: `snscrape` for Twitter, PRAW for Reddit.
  - Pre-trained sentiment models (e.g., HuggingFace Transformers).

---

## 2. Data Integration

### Preprocessing
- **Handling Missing Values**:
  - Replace placeholders (e.g., "--") with NaN.
  - Impute missing values (e.g., mean-impute height/reach).
- **Data Type Conversion**:
  - Convert heights (e.g., "5'11\"") to inches or cm.
  - Convert weights (e.g., "155 lbs.") to numeric values.
- **Feature Engineering**:
  - Compute derived features like win ratio, finish rate, streaks.
  - Encode categorical features (e.g., stance, weight class).
  - Create composite features (e.g., reach-to-height ratio).

### Merging Datasets
- **Keys**:
  - Use consistent fighter identifiers (e.g., unique IDs).
  - Normalize text fields (e.g., fighter names, event names).
- **Schema**:
  - Combine fighter stats, fight-level data, odds, and sentiment into a unified table.
  - Use prefixes for red/blue corner features (e.g., `red_fighter_reach`, `blue_fighter_reach`).

---

## 3. Modeling Pipeline

### Feature Engineering
- **Static Features**:
  - Fighter attributes (age, height, reach, stance).
  - Historical performance metrics (win streak, average fight length).
- **Dynamic Features**:
  - Time-series data (e.g., recent performance trends).
  - Sentiment scores and betting odds.

### Model Selection
- **Algorithms**:
  - Logistic Regression: For binary classification of fight outcomes.
  - Random Forest: For feature importance and prediction.
  - Neural Networks: For complex pattern recognition.
- **Evaluation**:
  - Metrics: Accuracy, precision, recall, F1-score.
  - Cross-validation: Time-series split to maintain chronological order.

---

## 4. Real-Time Updates

### Tools
- **Daily Updates**:
  - `scrape_ufc_stats` for fighter stats and fight outcomes.
- **Live Odds**:
  - The Odds API for real-time betting odds.
- **Upcoming Fights**:
  - `ufc-stats-crawler` for scheduled matchups.

### Integration
- Automate data refresh with scheduled scripts.
- Merge live data with historical datasets for real-time predictions.

---

## 5. Next Steps
1. Set up scrapers and APIs for data collection.
2. Preprocess and clean the datasets.
3. Design the unified schema for data integration.
4. Build and evaluate the predictive model.
5. Implement real-time updates for live predictions.

This plan provides a comprehensive roadmap for integrating UFC datasets and building a predictive analytics platform. Let me know if further details are needed.