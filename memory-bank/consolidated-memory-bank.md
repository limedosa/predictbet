# Consolidated Memory Bank

## Project Brief

### Project Name
PredictBet

### Core Purpose
PredictBet is a Next.js application designed to provide UFC fans with predictive insights, stats, sentiment analysis, and other tools to enhance their experience.

### Goals
1. Deliver a seamless user experience with modern web technologies.
2. Provide accurate and engaging data visualization tools.
3. Enable users to explore UFC fighter profiles and compare stats.
4. Integrate social feeds and sentiment analysis for community engagement.

### Scope
The project focuses on building a web application with the following features:
- Data visualization tools.
- Enhanced search capabilities.
- Sentiment analysis charts.
- Fighter profiles and comparison tools.
- Social feed integration.

### Target Audience
UFC fans and enthusiasts looking for predictive insights and tools to enhance their understanding of fights and fighters.

---

## Product Context

### Purpose
PredictBet aims to enhance the experience of UFC fans by providing predictive insights, detailed fighter statistics, and tools for analyzing fights. The platform is designed to be a one-stop solution for UFC enthusiasts seeking data-driven insights.

### Problems Solved
1. **Lack of Predictive Tools**: UFC fans often lack access to tools that provide predictive insights based on data.
2. **Fragmented Information**: Fighter stats, odds, and sentiment analysis are scattered across multiple platforms.
3. **Limited Engagement**: Fans have limited ways to engage with data visualization and community sentiment.

### How It Should Work
- Users can explore fighter profiles, compare stats, and view predictive insights.
- The platform integrates social feeds and sentiment analysis to provide a community-driven perspective.
- Data visualization tools make complex data easy to understand and interact with.

### User Experience Goals
1. **Intuitive Design**: Ensure the platform is easy to navigate and visually appealing.
2. **Engaging Features**: Provide interactive tools like comparison charts and sentiment analysis.
3. **Seamless Performance**: Optimize for fast loading times and smooth interactions.
4. **Accessibility**: Ensure the platform is accessible to a diverse audience, including those with disabilities.

---

## Active Context

### Current Focus
The current focus of the PredictBet project is to finalize the core features, including:
1. Data visualization tools for UFC stats.
2. Enhanced search capabilities for fighter profiles.
3. Sentiment analysis charts and social feed integration.

### Recent Changes
- Initial setup of the Next.js application with TypeScript and Tailwind CSS.
- Integration of Radix UI components for accessible and reusable UI elements.
- Implementation of basic routing and layout structure.

### Next Steps
1. Develop and refine the data visualization components.
2. Implement the enhanced search functionality.
3. Integrate sentiment analysis and social feed features.
4. Optimize the application for performance and accessibility.

### Active Considerations
- Ensure the platform is scalable to handle a growing user base.
- Maintain a consistent and intuitive design across all components.
- Prioritize accessibility and performance in all development efforts.

---

## System Patterns

### System Architecture
PredictBet is built using a modular architecture with the following key components:
1. **Next.js Framework**: Provides server-side rendering and static site generation for optimal performance.
2. **TypeScript**: Ensures type safety and improves code maintainability.
3. **Tailwind CSS**: Enables rapid UI development with utility-first styling.
4. **Radix UI Components**: Offers accessible and reusable UI elements.

### Key Technical Decisions
- **Framework Choice**: Next.js was chosen for its performance benefits and developer-friendly features.
- **Styling**: Tailwind CSS was selected for its flexibility and ease of use.
- **UI Components**: Radix UI components were integrated to ensure accessibility and consistency.
- **TypeScript**: Adopted to reduce runtime errors and improve developer productivity.

### Design Patterns
1. **Component-Based Design**: The application is structured around reusable and modular components.
2. **State Management**: Local state is managed using React hooks, with potential for global state management if needed.
3. **Responsive Design**: Ensures the application is accessible on various devices and screen sizes.

### Component Relationships
- **UI Components**: Located in `components/ui/`, these are reusable building blocks for the application.
- **Feature Components**: Found in `components/`, these implement specific features like data visualization and search.
- **Pages**: Defined in the `app/` directory, these represent the main routes of the application.
- **Utilities**: Utility functions and configurations are stored in the `lib/` directory.

---

## Tech Context

### Technologies Used
- **Next.js**: React framework for server-side rendering and static site generation.
- **TypeScript**: Strongly typed programming language for JavaScript.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Radix UI**: Accessible and reusable UI components.
- **PNPM**: Fast and efficient package manager.

### Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/limedosa/predictbet.git
   ```
2. Navigate to the project directory:
   ```bash
   cd predictbet
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```

### Technical Constraints
- The application must maintain high performance and accessibility standards.
- Ensure compatibility with modern browsers and devices.
- Follow best practices for responsive design and modular architecture.

### Dependencies
#### Key Dependencies
- **@radix-ui/react-accordion**: Accordion UI component.
- **@radix-ui/react-dialog**: Dialog UI component.
- **react-hook-form**: Form handling library.
- **recharts**: Data visualization library.
- **tailwindcss**: CSS framework for styling.

#### Dev Dependencies
- **TypeScript**: Type checking and development.
- **PostCSS**: CSS processing.
- **Tailwind CSS**: Styling framework.

---

## Progress

### Current Status
The PredictBet project is in active development. The foundational setup is complete, and work is ongoing to implement core features.

### What Works
- **Framework Setup**: Next.js, TypeScript, and Tailwind CSS are fully integrated.
- **UI Components**: Radix UI components are functional and styled with Tailwind CSS.
- **Routing**: Basic routing and layout structure are in place.

### What's Left to Build
1. **Data Visualization Tools**: Develop interactive charts and graphs for UFC stats.
2. **Enhanced Search**: Implement advanced search functionality for fighter profiles.
3. **Sentiment Analysis**: Integrate sentiment analysis charts and social feeds.
4. **Performance Optimization**: Ensure fast loading times and smooth interactions.

### Known Issues
- **Accessibility**: Some components need further testing to ensure full accessibility compliance.
- **Scalability**: The application architecture needs to be reviewed for handling a larger user base.
- **Styling Consistency**: Minor inconsistencies in component styling need to be addressed.

---

## Data Requirements

### Required Data
1. **Fighter Statistics**: Historical and current stats for UFC fighters, including wins, losses, and fight outcomes.
2. **Odds Data**: Betting odds for upcoming and past fights.
3. **Sentiment Analysis**: Social media sentiment data related to fighters and fights.
4. **Historical Fight Data**: Detailed records of past UFC fights, including scores and events.

### Data Sources
- UFC official API or data providers.
- Social media platforms for sentiment analysis.
- Betting platforms for odds data.

---

## Model Requirements

### Model Type
- **Predictive Model**: A machine learning model capable of analyzing historical data and generating predictions for fight outcomes.

### Features
1. **Data Preprocessing**: Clean and normalize data from various sources.
2. **Feature Engineering**: Extract meaningful features such as fighter performance trends and sentiment scores.
3. **Prediction**: Generate probabilities for fight outcomes based on input data.

### Suggested Algorithms
- **Logistic Regression**: For binary classification of fight outcomes.
- **Random Forest**: For feature importance and prediction.
- **Neural Networks**: For complex pattern recognition in large datasets.

### Model Evaluation
- Use metrics like accuracy, precision, recall, and F1-score to evaluate model performance.
