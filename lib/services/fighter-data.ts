import { CSVDataProcessor, ProcessedFighterData } from './csv-parser';

class FighterDataService {
  private csvProcessor: CSVDataProcessor;
  private isInitialized = false;
  private fighters: ProcessedFighterData[] = [];

  constructor() {
    this.csvProcessor = new CSVDataProcessor();
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await this.csvProcessor.loadFighterTOTTData();
      this.fighters = this.csvProcessor.getAllFighters();
      this.isInitialized = true;
    } catch (error) {
      console.error('Failed to initialize fighter data service:', error);
      // Fallback to empty array if data loading fails
      this.fighters = [];
      this.isInitialized = true;
    }
  }

  async getAllFighters(): Promise<ProcessedFighterData[]> {
    await this.initialize();
    return this.fighters;
  }

  async getFighterById(id: string): Promise<ProcessedFighterData | null> {
    await this.initialize();
    return this.fighters.find(fighter => fighter.id === id) || null;
  }

  async getFighterByName(name: string): Promise<ProcessedFighterData | null> {
    await this.initialize();
    return this.fighters.find(fighter => fighter.name.toLowerCase() === name.toLowerCase()) || null;
  }

  async searchFighters(query: string): Promise<ProcessedFighterData[]> {
    await this.initialize();
    const lowerQuery = query.toLowerCase();
    return this.fighters.filter(fighter =>
      fighter.name.toLowerCase().includes(lowerQuery)
    );
  }
}

export const fighterDataService = new FighterDataService();
export type { ProcessedFighterData };