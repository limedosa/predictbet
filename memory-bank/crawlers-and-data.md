# Crawlers and Data

## Overview
This document outlines the functionality and integration of the data crawlers and the resulting datasets in the PredictBet system.

## Data Sources
The `scrape_ufc_stats` module is responsible for scraping and managing UFC-related data. The data is stored in the following CSV files:

### CSV Files
1. **`ufc_event_details.csv`**: Contains metadata about UFC events, including event names, URLs, dates, and locations.
2. **`ufc_fighter_details.csv`**: Stores detailed information about fighters, such as their names, nicknames, and profile URLs.
3. **`ufc_fighter_tott.csv`**: Holds "Tale of the Tape" data for fighters, including height, weight, reach, stance, and date of birth.
4. **`ufc_fight_details.csv`**: Lists fight details, including event names, bout pairings, and URLs.
5. **`ufc_fight_results.csv`**: Contains fight outcomes, such as the winner, method of victory, round, and referee details.
6. **`ufc_fight_stats.csv`**: Includes detailed fight statistics, such as significant strikes, takedowns, and control time.

## Functionality
- **Data Collection**: The module scrapes data from [ufcstats.com](http://ufcstats.com/) using Python scripts and notebooks.
- **Data Storage**: The scraped data is stored in CSV files for easy access and processing.
- **Data Updates**: The `scrape_ufc_stats_unparsed_data.py` script ensures that the data is regularly updated with the latest UFC events, fights, and fighter details.

## Integration
- **Data Visualization**: The CSV files are used to generate charts and graphs for UFC stats.
- **Search Features**: Fighter profiles and event details are searchable through the application.
- **Predictive Models**: The fight statistics serve as input for machine learning models to predict fight outcomes.

## Considerations
- **Scalability**: Ensure the system can handle an increasing volume of data as new events and fighters are added.
- **Accuracy**: Maintain the accuracy of data during scraping and integration.
- **Performance**: Optimize the data pipeline for faster processing and loading times.