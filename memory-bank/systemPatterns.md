# System Patterns

## System Architecture
PredictBet is built using a modular architecture with the following key components:
1. **Next.js Framework**: Provides server-side rendering and static site generation for optimal performance.
2. **TypeScript**: Ensures type safety and improves code maintainability.
3. **Tailwind CSS**: Enables rapid UI development with utility-first styling.
4. **Radix UI Components**: Offers accessible and reusable UI elements.

## Key Technical Decisions
- **Framework Choice**: Next.js was chosen for its performance benefits and developer-friendly features.
- **Styling**: Tailwind CSS was selected for its flexibility and ease of use.
- **UI Components**: Radix UI components were integrated to ensure accessibility and consistency.
- **TypeScript**: Adopted to reduce runtime errors and improve developer productivity.

## Design Patterns
1. **Component-Based Design**: The application is structured around reusable and modular components.
2. **State Management**: Local state is managed using React hooks, with potential for global state management if needed.
3. **Responsive Design**: Ensures the application is accessible on various devices and screen sizes.

## Component Relationships
- **UI Components**: Located in `components/ui/`, these are reusable building blocks for the application.
- **Feature Components**: Found in `components/`, these implement specific features like data visualization and search.
- **Pages**: Defined in the `app/` directory, these represent the main routes of the application.
- **Utilities**: Utility functions and configurations are stored in the `lib/` directory.
## Data Integration Patterns

### CSV Files in `scrape_ufc_stats`
The `scrape_ufc_stats` module generates and manages several CSV files that serve as the backbone for UFC data analysis and visualization. These files are:

1. **`ufc_event_details.csv`**: Contains metadata about UFC events, including event names, URLs, dates, and locations.
2. **`ufc_fighter_details.csv`**: Stores detailed information about fighters, such as their names, nicknames, and profile URLs.
3. **`ufc_fighter_tott.csv`**: Holds "Tale of the Tape" data for fighters, including height, weight, reach, stance, and date of birth.
4. **`ufc_fight_details.csv`**: Lists fight details, including event names, bout pairings, and URLs.
5. **`ufc_fight_results.csv`**: Contains fight outcomes, such as the winner, method of victory, round, and referee details.
6. **`ufc_fight_stats.csv`**: Includes detailed fight statistics, such as significant strikes, takedowns, and control time.

### Role in the System
- **Data Source**: These CSV files are the output of scraping scripts and serve as the primary data source for analysis and visualization.
- **Integration Points**: The data is integrated into the application through data visualization components, enhanced search features, and predictive models.
- **Update Mechanism**: The `scrape_ufc_stats_unparsed_data.py` script ensures that these files are regularly updated with the latest UFC data.

### Relationships
- **Event Data**: `ufc_event_details.csv` links to `ufc_fight_details.csv` and `ufc_fight_results.csv` through event names.
- **Fighter Data**: `ufc_fighter_details.csv` and `ufc_fighter_tott.csv` provide detailed fighter profiles, which are referenced in `ufc_fight_stats.csv`.
- **Fight Data**: `ufc_fight_details.csv`, `ufc_fight_results.csv`, and `ufc_fight_stats.csv` collectively describe the outcomes and statistics of fights.

